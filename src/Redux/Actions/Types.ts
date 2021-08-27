import { VGame } from "../../models/Videogame";

export enum UpdateReducer {
  LIST,
  SINGLE,
}

export interface UpdateReducerAction {
  type: UpdateReducer;
  payload: {
    VGames: VGame[];
    VGame: VGame;
  };
}
