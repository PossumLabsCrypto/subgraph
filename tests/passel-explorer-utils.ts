import { newMockEvent } from "matchstick-as"
import { ethereum, BigInt } from "@graphprotocol/graph-ts"
import { EXP_Purchased } from "../generated/PasselExplorer/PasselExplorer"

export function createEXP_PurchasedEvent(
  nftID: BigInt,
  amount: BigInt
): EXP_Purchased {
  let expPurchasedEvent = changetype<EXP_Purchased>(newMockEvent())

  expPurchasedEvent.parameters = new Array()

  expPurchasedEvent.parameters.push(
    new ethereum.EventParam("nftID", ethereum.Value.fromUnsignedBigInt(nftID))
  )
  expPurchasedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )

  return expPurchasedEvent
}
