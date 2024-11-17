import { BigInt } from "@graphprotocol/graph-ts";
import { QuestCompleted as QuestCompletedEvent } from "../generated/PasselQuests/PasselQuests";
import { NftData, QuestCompleted, QuestCompletion } from "../generated/schema";

export function handleQuestCompleted(event: QuestCompletedEvent): void {
  let entity = new QuestCompleted(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  entity.nftID = event.params.nftID;
  entity.questID = event.params.questID;
  entity.score = event.params.score;

  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;

  let tokenEntity = NftData.load(event.params.nftID.toString());
  if (tokenEntity == null) {
    tokenEntity = new NftData(event.params.nftID.toString());
    tokenEntity.tokenID = event.params.nftID;
    tokenEntity.exp = BigInt.fromU64(0);
    tokenEntity.explorationScore = BigInt.fromU64(0);
  }

  const newScore = tokenEntity.explorationScore.plus(event.params.score);

  if (newScore > BigInt.fromU64(10)) {
    tokenEntity.explorationScore = BigInt.fromU64(10);
  } else {
    tokenEntity.explorationScore = newScore;
  }

  let questID = `${event.params.nftID.toString()}-${event.params.questID.toString()}`;
  let questCompletion = QuestCompletion.load(questID);

  if (!questCompletion) {
    questCompletion = new QuestCompletion(questID);
    questCompletion.nft = tokenEntity.id; // Link to the NftData entity
    questCompletion.questID = event.params.questID;
  }

  questCompletion.completed = true;
  questCompletion.save();

  tokenEntity.save();
  entity.save();
}
