import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { PasselListingUpdated } from "../generated/schema"
import { PasselListingUpdated as PasselListingUpdatedEvent } from "../generated/PasselMarket/PasselMarket"
import { handlePasselListingUpdated } from "../src/passel-market"
import { createPasselListingUpdatedEvent } from "./passel-market-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let owner = Address.fromString("0x0000000000000000000000000000000000000001")
    let tokenID = BigInt.fromI32(234)
    let price = BigInt.fromI32(234)
    let isListed = "boolean Not implemented"
    let newPasselListingUpdatedEvent = createPasselListingUpdatedEvent(
      owner,
      tokenID,
      price,
      isListed
    )
    handlePasselListingUpdated(newPasselListingUpdatedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("PasselListingUpdated created and stored", () => {
    assert.entityCount("PasselListingUpdated", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "PasselListingUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "owner",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "PasselListingUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "tokenID",
      "234"
    )
    assert.fieldEquals(
      "PasselListingUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "price",
      "234"
    )
    assert.fieldEquals(
      "PasselListingUpdated",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "isListed",
      "boolean Not implemented"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
