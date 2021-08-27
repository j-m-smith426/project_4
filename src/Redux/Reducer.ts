import { UpdateReducer, UpdateReducerAction } from "./Actions/Types";
import { IAppState, InitaialState } from "./Store";

export const Reducer = (
  state: IAppState = InitaialState,
  action: UpdateReducerAction
): IAppState => {
  const newState = { ...state };
  switch (action.type) {
    case UpdateReducer.LIST:
      newState.VGames = action.payload.VGames;
      return newState;
    case UpdateReducer.SINGLE:
      newState.VGame = action.payload.VGame;
      return newState;
    default:
      return newState;
  }
};
