import { Address, BigInt, BigDecimal } from "@graphprotocol/graph-ts"

export const oracleAddress = Address.fromString('0xB85fEe06B1b6a84c5Df0A0e15aEe9810b086EDBB')
export const masterChefAddress = Address.fromString('0xb4b14aa0dfa22cb3549de81e2657c6c026014090')
export const ADDRESS_ZERO = Address.fromString('0x0000000000000000000000000000000000000000')

export const poolIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 16]

export const PRECISION = BigDecimal.fromString("1000000")
export const DEPOSIT_PRECISION = BigDecimal.fromString("10000")

export const BIG_INT_ONE = BigInt.fromI32(1)
export const BIG_INT_ZERO = BigInt.fromI32(0)