import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { EXP_Purchased } from "../generated/schema"
import { EXP_Purchased as EXP_PurchasedEvent } from "../generated/PasselExplorer/PasselExplorer"
import { handleEXP_Purchased } from "../src/passel-explorer"
import { createEXP_PurchasedEvent } from "./passel-explorer-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let nftID = BigInt.fromI32(234)
    let amount = BigInt.fromI32(234)
    let newEXP_PurchasedEvent = createEXP_PurchasedEvent(nftID, amount)
    handleEXP_Purchased(newEXP_PurchasedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("EXP_Purchased created and stored", () => {
    assert.entityCount("EXP_Purchased", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "EXP_Purchased",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftID",
      "234"
    )
    assert.fieldEquals(
      "EXP_Purchased",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amount",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
