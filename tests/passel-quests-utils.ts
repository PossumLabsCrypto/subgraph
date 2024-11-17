import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { QuestCompleted } from "../generated/PasselQuests/PasselQuests"

export function createQuestCompletedEvent(
  nftID: BigInt,
  questID: BigInt,
  score: BigInt
): QuestCompleted {
  let questCompletedEvent = changetype<QuestCompleted>(newMockEvent())

  questCompletedEvent.parameters = new Array()

  questCompletedEvent.parameters.push(
    new ethereum.EventParam("nftID", ethereum.Value.fromUnsignedBigInt(nftID))
  )
  questCompletedEvent.parameters.push(
    new ethereum.EventParam(
      "questID",
      ethereum.Value.fromUnsignedBigInt(questID)
    )
  )
  questCompletedEvent.parameters.push(
    new ethereum.EventParam("score", ethereum.Value.fromUnsignedBigInt(score))
  )

  return questCompletedEvent
}
