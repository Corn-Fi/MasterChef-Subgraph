// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Masterchef extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Masterchef entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Masterchef must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Masterchef", id.toString(), this);
    }
  }

  static load(id: string): Masterchef | null {
    return changetype<Masterchef | null>(store.get("Masterchef", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get poolCount(): BigInt {
    let value = this.get("poolCount");
    return value!.toBigInt();
  }

  set poolCount(value: BigInt) {
    this.set("poolCount", Value.fromBigInt(value));
  }

  get cobPerBlock(): BigDecimal {
    let value = this.get("cobPerBlock");
    return value!.toBigDecimal();
  }

  set cobPerBlock(value: BigDecimal) {
    this.set("cobPerBlock", Value.fromBigDecimal(value));
  }

  get userCount(): BigInt {
    let value = this.get("userCount");
    return value!.toBigInt();
  }

  set userCount(value: BigInt) {
    this.set("userCount", Value.fromBigInt(value));
  }

  get tvl(): BigDecimal {
    let value = this.get("tvl");
    return value!.toBigDecimal();
  }

  set tvl(value: BigDecimal) {
    this.set("tvl", Value.fromBigDecimal(value));
  }

  get totalAllocationPoints(): BigInt {
    let value = this.get("totalAllocationPoints");
    return value!.toBigInt();
  }

  set totalAllocationPoints(value: BigInt) {
    this.set("totalAllocationPoints", Value.fromBigInt(value));
  }
}

export class Pool extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save Pool entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type Pool must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("Pool", id.toString(), this);
    }
  }

  static load(id: string): Pool | null {
    return changetype<Pool | null>(store.get("Pool", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get token(): Bytes {
    let value = this.get("token");
    return value!.toBytes();
  }

  set token(value: Bytes) {
    this.set("token", Value.fromBytes(value));
  }

  get name(): string {
    let value = this.get("name");
    return value!.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get symbol(): string {
    let value = this.get("symbol");
    return value!.toString();
  }

  set symbol(value: string) {
    this.set("symbol", Value.fromString(value));
  }

  get decimals(): BigInt {
    let value = this.get("decimals");
    return value!.toBigInt();
  }

  set decimals(value: BigInt) {
    this.set("decimals", Value.fromBigInt(value));
  }

  get lp(): boolean {
    let value = this.get("lp");
    return value!.toBoolean();
  }

  set lp(value: boolean) {
    this.set("lp", Value.fromBoolean(value));
  }

  get userCount(): BigInt {
    let value = this.get("userCount");
    return value!.toBigInt();
  }

  set userCount(value: BigInt) {
    this.set("userCount", Value.fromBigInt(value));
  }

  get totalDeposited(): BigDecimal {
    let value = this.get("totalDeposited");
    return value!.toBigDecimal();
  }

  set totalDeposited(value: BigDecimal) {
    this.set("totalDeposited", Value.fromBigDecimal(value));
  }

  get priceUSD(): BigDecimal {
    let value = this.get("priceUSD");
    return value!.toBigDecimal();
  }

  set priceUSD(value: BigDecimal) {
    this.set("priceUSD", Value.fromBigDecimal(value));
  }

  get tvl(): BigDecimal {
    let value = this.get("tvl");
    return value!.toBigDecimal();
  }

  set tvl(value: BigDecimal) {
    this.set("tvl", Value.fromBigDecimal(value));
  }

  get allocationPoint(): BigInt {
    let value = this.get("allocationPoint");
    return value!.toBigInt();
  }

  set allocationPoint(value: BigInt) {
    this.set("allocationPoint", Value.fromBigInt(value));
  }

  get apy(): BigDecimal {
    let value = this.get("apy");
    return value!.toBigDecimal();
  }

  set apy(value: BigDecimal) {
    this.set("apy", Value.fromBigDecimal(value));
  }

  get depositFee(): BigDecimal {
    let value = this.get("depositFee");
    return value!.toBigDecimal();
  }

  set depositFee(value: BigDecimal) {
    this.set("depositFee", Value.fromBigDecimal(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value!.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class PoolUser extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save PoolUser entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type PoolUser must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("PoolUser", id.toString(), this);
    }
  }

  static load(id: string): PoolUser | null {
    return changetype<PoolUser | null>(store.get("PoolUser", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get pool(): string {
    let value = this.get("pool");
    return value!.toString();
  }

  set pool(value: string) {
    this.set("pool", Value.fromString(value));
  }

  get user(): Bytes {
    let value = this.get("user");
    return value!.toBytes();
  }

  set user(value: Bytes) {
    this.set("user", Value.fromBytes(value));
  }

  get depositAmount(): BigDecimal {
    let value = this.get("depositAmount");
    return value!.toBigDecimal();
  }

  set depositAmount(value: BigDecimal) {
    this.set("depositAmount", Value.fromBigDecimal(value));
  }
}

export class User extends Entity {
  constructor(id: string) {
    super();
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id != null, "Cannot save User entity without an ID");
    if (id) {
      assert(
        id.kind == ValueKind.STRING,
        `Entities of type User must have an ID of type String but the id '${id.displayData()}' is of type ${id.displayKind()}`
      );
      store.set("User", id.toString(), this);
    }
  }

  static load(id: string): User | null {
    return changetype<User | null>(store.get("User", id));
  }

  get id(): string {
    let value = this.get("id");
    return value!.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get added(): boolean {
    let value = this.get("added");
    return value!.toBoolean();
  }

  set added(value: boolean) {
    this.set("added", Value.fromBoolean(value));
  }

  get poolUser(): Array<string> | null {
    let value = this.get("poolUser");
    if (!value || value.kind == ValueKind.NULL) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set poolUser(value: Array<string> | null) {
    if (!value) {
      this.unset("poolUser");
    } else {
      this.set("poolUser", Value.fromStringArray(<Array<string>>value));
    }
  }
}
