import { BigInt, Bytes } from "@graphprotocol/graph-ts";
import {
  PasselListingUpdated as PasselListingUpdatedEvent,
  PasselPurchased as PasselPurchasedEvent,
} from "../generated/PasselMarket/PasselMarket";
import {
  NftData,
  PasselListingUpdated,
  PasselPurchased,
} from "../generated/schema";

export function handlePasselListingUpdated(
  event: PasselListingUpdatedEvent
): void {
  let entity = new PasselListingUpdated(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.owner = event.params.owner;
  entity.tokenID = event.params.tokenID;
  entity.price = event.params.price;
  entity.isListed = event.params.isListed;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let tokenEntity = NftData.load(event.params.tokenID.toString());
  if (tokenEntity == null) {
    tokenEntity = new NftData(event.params.tokenID.toString());
    tokenEntity.tokenID = event.params.tokenID;
  }


  if (!event.params.isListed) {
    tokenEntity.isListed = false;
    tokenEntity.ownerInMarket = null;
    tokenEntity.price = null;
  } else {
    tokenEntity.isListed = event.params.isListed;
    tokenEntity.ownerInMarket = event.params.owner;
    tokenEntity.price = event.params.price;
  }

  tokenEntity.save();

  entity.save();
}

export function handlePasselPurchased(event: PasselPurchasedEvent): void {
  let entity = new PasselPurchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.newOwner = event.params.newOwner;
  entity.tokenID = event.params.tokenID;
  entity.price = event.params.price;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let tokenEntity = NftData.load(event.params.tokenID.toString());
  if (tokenEntity == null) {
    tokenEntity = new NftData(event.params.tokenID.toString());
    tokenEntity.tokenID = event.params.tokenID;
  }

  tokenEntity.isListed = false;
  tokenEntity.ownerInMarket = null;
  tokenEntity.price = null;

  tokenEntity.save();

  entity.save();
}
