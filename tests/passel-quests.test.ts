import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { BigInt } from "@graphprotocol/graph-ts"
import { QuestCompleted } from "../generated/schema"
import { QuestCompleted as QuestCompletedEvent } from "../generated/PasselQuests/PasselQuests"
import { handleQuestCompleted } from "../src/passel-quests"
import { createQuestCompletedEvent } from "./passel-quests-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let nftID = BigInt.fromI32(234)
    let questID = BigInt.fromI32(234)
    let score = BigInt.fromI32(234)
    let newQuestCompletedEvent = createQuestCompletedEvent(
      nftID,
      questID,
      score
    )
    handleQuestCompleted(newQuestCompletedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("QuestCompleted created and stored", () => {
    assert.entityCount("QuestCompleted", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "QuestCompleted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "nftID",
      "234"
    )
    assert.fieldEquals(
      "QuestCompleted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "questID",
      "234"
    )
    assert.fieldEquals(
      "QuestCompleted",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "score",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
