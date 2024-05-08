import { IsEnum } from 'class-validator';

export enum quizVotes {
  Dislike = 'Не поддерживаю',
  Like = 'Поддерживаю',
  Whatever = 'Нейтрально',
}

export class sendVoteModel {
  @IsEnum(quizVotes)
  inputVote: quizVotes;
}
