import { BigInt } from "@graphprotocol/graph-ts";
import { EXP_Purchased as EXP_PurchasedEvent } from "../generated/PasselExplorer/PasselExplorer";
import { EXP_Purchased, NftData } from "../generated/schema";

export function handleEXP_Purchased(event: EXP_PurchasedEvent): void {
  let entity = new EXP_Purchased(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nftID = event.params.nftID;
  entity.amount = event.params.amount;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let tokenEntity = NftData.load(event.params.nftID.toString());
  if (tokenEntity == null) {
    tokenEntity = new NftData(event.params.nftID.toString());
    tokenEntity.tokenID = event.params.nftID;
  }

  if (tokenEntity.exp == null) {
    tokenEntity.exp = BigInt.fromU64(0);
  }

  tokenEntity.exp = tokenEntity.exp.plus(event.params.amount);
  tokenEntity.save();

  entity.save();
}
