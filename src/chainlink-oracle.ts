import { Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts"
import { NewRound } from "../generated/ChainlinkOracle/ChainlinkOracle"
import { Oracle as OracleContract } from "../generated/ChainlinkOracle/Oracle"
import { Pool } from "../generated/schema"
import { fetchMasterchef, fetchPool, fetchMasterchefContract } from "./master-chef"

const oracleAddress = Address.fromString('0xB85fEe06B1b6a84c5Df0A0e15aEe9810b086EDBB')

const poolIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16]


const PRECISION = BigDecimal.fromString("1000000")
const DEPOSIT_PRECISION = BigDecimal.fromString("10000")


export function fetchOracleContract(): OracleContract {
  return OracleContract.bind(oracleAddress)
}

export function updateMasterChefPool(poolId: BigInt, timestamp: BigInt): Pool {
  let pool = fetchPool(poolId)
  const mc = fetchMasterchefContract()
  const poolInfo = mc.poolInfo(poolId)
  const oracleContract = fetchOracleContract()

  if(pool.priceUSD.equals(BigDecimal.zero())) {
    const lp = oracleContract.try_getLpRateUSD(poolInfo.getLpToken())
    if(lp.reverted) {
      pool.lp = false
    }
    else {
      pool.lp = true
    }
  }
  if(pool.lp) {
    pool.priceUSD = oracleContract.getLpRateUSD(poolInfo.getLpToken()).toBigDecimal().div(PRECISION)
  }
  else {
    pool.priceUSD = oracleContract.getRateUSD(poolInfo.getLpToken()).toBigDecimal().div(PRECISION)
  }
  pool.tvl = pool.priceUSD.times(pool.totalDeposited)

  const allocPoints = poolInfo.getAllocPoint()
  if(!allocPoints.equals(pool.allocationPoint)) {
    let masterchef = fetchMasterchef()
    masterchef.totalAllocationPoints = masterchef.totalAllocationPoints.plus(allocPoints.minus(pool.allocationPoint))
    masterchef.save()
    pool.allocationPoint = allocPoints
  }
  pool.allocationPoint = poolInfo.getAllocPoint()
  pool.depositFee = BigInt.fromI32(poolInfo.getDepositFeeBP()).toBigDecimal().div(DEPOSIT_PRECISION)
  pool.timestamp = timestamp
  pool.save()
  updatePoolAPY(poolId)
  return pool as Pool
}

export function updatePoolAPY(poolId: BigInt): void {
  const BLOCKS_PER_YEAR = BigInt.fromI32(15017142).toBigDecimal()
  const cob = fetchPool(BigInt.fromI32(15))

  let pool = fetchPool(poolId)
  const masterchef = fetchMasterchef()
  if(!pool.allocationPoint.equals(BigInt.zero()) && !masterchef.totalAllocationPoints.equals(BigInt.zero())) {
    const cobPerBlock = masterchef.cobPerBlock.times(pool.allocationPoint.toBigDecimal()).div(masterchef.totalAllocationPoints.toBigDecimal())
    const cobPerYear = cobPerBlock.times(BLOCKS_PER_YEAR)
    const cobYearUSD = cobPerYear.times(cob.priceUSD)
    if(!pool.tvl.equals(BigDecimal.zero())) {
      pool.apy = cobYearUSD.div(pool.tvl).times(BigInt.fromI32(100).toBigDecimal())
    }
    else {
      pool.apy = BigDecimal.zero()
    }
  }
  else {
    pool.apy = BigDecimal.zero()
  }
  pool.save()
}

export function updateAllMasterChefPools(timestamp: BigInt): void {
  let mc = fetchMasterchef()
  mc.tvl = BigDecimal.zero()
  for(let i = 0; i < poolIds.length; i++) {
    const pool = updateMasterChefPool(BigInt.fromI32(poolIds[i]), timestamp)
    mc.tvl = mc.tvl.plus(pool.tvl)
  }
  mc.save()
}



export function handleNewRound(event: NewRound): void {
  updateAllMasterChefPools(event.block.timestamp)
}
