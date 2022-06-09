import { Address, BigDecimal, BigInt, dataSource, ethereum } from "@graphprotocol/graph-ts"
import { ChainlinkOracle, NewRound } from "../generated/ChainlinkOracle/ChainlinkOracle"
import { Oracle as OracleContract } from "../generated/ChainlinkOracle/Oracle"
import { ERC20 } from "../generated/ChainlinkOracle/ERC20"
import { 
    MasterChef as MasterChefContract,
    Deposit,
    EmergencyWithdraw,
    UpdateEmissionRate,
    Withdraw
} from "../generated/Masterchef/MasterChef"
import { Masterchef, Pool, User, PoolUser } from "../generated/schema"

const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')
const BIG_INT_ONE = BigInt.fromI32(1)
const BIG_INT_ZERO = BigInt.fromI32(0)

const oracleAddress = Address.fromString('0xB85fEe06B1b6a84c5Df0A0e15aEe9810b086EDBB')
const oracleContract = OracleContract.bind(oracleAddress)
const masterChefAddress = Address.fromString('0xb4b14aa0dfa22cb3549de81e2657c6c026014090')
const DEPOSIT_PRECISION = BigDecimal.fromString("10000")

export function fetchMasterchefContract(): MasterChefContract {
    return MasterChefContract.bind(masterChefAddress)
}




export function fetchMasterchef(): Masterchef {
    let masterChef = Masterchef.load(dataSource.address().toHex())

    if (masterChef === null) {
        masterChef = new Masterchef(dataSource.address().toHex())
        masterChef.poolCount = BIG_INT_ZERO
        masterChef.tvl = BigDecimal.zero()
        masterChef.cobPerBlock = BigDecimal.zero()
        masterChef.totalAllocationPoints = BIG_INT_ZERO
        masterChef.userCount = BIG_INT_ZERO
        masterChef.save()
    }

    return masterChef as Masterchef
}


export function fetchPool(poolId: BigInt): Pool {
    let pool = Pool.load(poolId.toString())
    if(pool === null) {
        const poolInfo = fetchMasterchefContract().poolInfo(poolId)
        pool = new Pool(poolId.toString())
        pool.token = poolInfo.getLpToken()

        const token = ERC20.bind(Address.fromBytes(pool.token))

        pool.name = token.name()
        pool.symbol = token.symbol()
        pool.priceUSD = BigDecimal.zero()
        pool.tvl = BigDecimal.zero()
        pool.totalDeposited = BigDecimal.zero()
        pool.allocationPoint = poolInfo.getAllocPoint()
        pool.apy = BigDecimal.zero()
        pool.depositFee = BigInt.fromI32(poolInfo.getDepositFeeBP()).toBigDecimal().div(DEPOSIT_PRECISION)
        pool.userCount = BIG_INT_ZERO
        pool.decimals = BigInt.fromI32(token.decimals())
        pool.lp = false
        pool.timestamp = BIG_INT_ZERO
        pool.save()

        let masterChef = fetchMasterchef()
        masterChef.poolCount = masterChef.poolCount.plus(BIG_INT_ONE)
        masterChef.totalAllocationPoints = masterChef.totalAllocationPoints.plus(pool.allocationPoint)
        masterChef.save()
    }
    return pool as Pool
}


export function fetchUser(address: Address, poolId: BigInt): PoolUser {
    let u = User.load(address.toHexString())
    if(u === null) {
        u = new User(address.toHexString())
        u.added = true
        u.save()

        let mc = fetchMasterchef()
        mc.userCount = mc.userCount.plus(BIG_INT_ONE)
    }
    const id = poolId.toString().concat("-").concat(address.toHexString())
    let user = PoolUser.load(id)
    if(user === null) {
        user = new PoolUser(id)
        let pool = fetchPool(poolId)

        user.pool = pool.id
        user.user = address
        user.depositAmount = BigDecimal.zero()
        user.save()

        pool.userCount = pool.userCount.plus(BIG_INT_ONE)
        pool.save()
    }

    return user as PoolUser
}






export function handleDeposit(event: Deposit): void {
    const masterchef = fetchMasterchefContract()
  
    let pool = fetchPool(event.params.pid)
    let user = fetchUser(event.params.user, event.params.pid)
  
    const feeBP = masterchef.poolInfo(event.params.pid).getDepositFeeBP()
    const fee = event.params.amount.times(BigInt.fromI32(feeBP)).div(BigInt.fromI32(10000))
    const precision = BigInt.fromI32(10).pow(u8(pool.decimals.toU32())).toBigDecimal()
    let deposit = event.params.amount.minus(fee).toBigDecimal()
    deposit = deposit.div(precision)
    user.depositAmount = user.depositAmount.plus(deposit)
    user.save()
  
    pool.totalDeposited = pool.totalDeposited.plus(deposit)
    pool.save()
}
  
// ----------------------------------------------------------------------

export function handleEmergencyWithdraw(event: EmergencyWithdraw): void {
    let pool = fetchPool(event.params.pid)
    let user = fetchUser(event.params.user, event.params.pid)

    const precision = BigInt.fromI32(10).pow(u8(pool.decimals.toU32())).toBigDecimal()
    const withdraw = event.params.amount.toBigDecimal().div(precision)

    pool.totalDeposited = pool.totalDeposited.minus(withdraw)
    pool.save()

    user.depositAmount = BigDecimal.zero()
    user.save()
}

// ----------------------------------------------------------------------

export function handleWithdraw(event: Withdraw): void {
    let pool = fetchPool(event.params.pid)
    let user = fetchUser(event.params.user, event.params.pid)

    const precision = BigInt.fromI32(10).pow(u8(pool.decimals.toU32())).toBigDecimal()
    const withdraw = event.params.amount.toBigDecimal().div(precision)

    pool.totalDeposited = pool.totalDeposited.minus(withdraw)
    pool.save()

    user.depositAmount = user.depositAmount.minus(withdraw)
    user.save()
}

// ----------------------------------------------------------------------

export function handleUpdateEmissionRate(event: UpdateEmissionRate): void {
    let masterchef = fetchMasterchef()
    const precision = BigInt.fromI32(10).pow(18).toBigDecimal()
    masterchef.cobPerBlock = event.params.goosePerBlock.toBigDecimal().div(precision)
    masterchef.save()
}
