import { VGame } from "../models/Videogame";

export interface IAppState {
  VGames: VGame[];
  VGame: VGame;
}

export const InitaialState: IAppState = {
  VGame: {
    gameNAME: "",
    ID: 0,
    gameSYSTEM: [],
    GENRA: "",
    Multiplayer: false,
  },
  VGames: [],
};
