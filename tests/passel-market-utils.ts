import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  PasselListingUpdated,
  PasselPurchased
} from "../generated/PasselMarket/PasselMarket"

export function createPasselListingUpdatedEvent(
  owner: Address,
  tokenID: BigInt,
  price: BigInt,
  isListed: boolean
): PasselListingUpdated {
  let passelListingUpdatedEvent = changetype<PasselListingUpdated>(
    newMockEvent()
  )

  passelListingUpdatedEvent.parameters = new Array()

  passelListingUpdatedEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  passelListingUpdatedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  passelListingUpdatedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )
  passelListingUpdatedEvent.parameters.push(
    new ethereum.EventParam("isListed", ethereum.Value.fromBoolean(isListed))
  )

  return passelListingUpdatedEvent
}

export function createPasselPurchasedEvent(
  newOwner: Address,
  tokenID: BigInt,
  price: BigInt
): PasselPurchased {
  let passelPurchasedEvent = changetype<PasselPurchased>(newMockEvent())

  passelPurchasedEvent.parameters = new Array()

  passelPurchasedEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )
  passelPurchasedEvent.parameters.push(
    new ethereum.EventParam(
      "tokenID",
      ethereum.Value.fromUnsignedBigInt(tokenID)
    )
  )
  passelPurchasedEvent.parameters.push(
    new ethereum.EventParam("price", ethereum.Value.fromUnsignedBigInt(price))
  )

  return passelPurchasedEvent
}
