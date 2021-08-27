import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "../../Axios/AxiosConfig";
import { UpdateReducer, UpdateReducerAction } from "./Types";

function* addVGame(action: any) {
  yield call(axios.post, "/add", action.payload);
  yield call(getAllGames);
}

function* updateVGame(action: any) {
  yield call(axios.put, "/update", action.payload);
  yield getAllGames();
}

function* deleteVGame(action: any) {
  console.log(action.payload);
  yield call(axios.delete, "/delete/" + action.payload.gameName);
  yield getAllGames();
}

function* getAllGames() {
  try {
    const games = yield call(axios.get, "/");
    yield put({ type: UpdateReducer.LIST, payload: { VGames: games.data } });
  } catch (err) {
    console.log(err);
  }
}

function* getAGame(action: any) {
  const game = yield call(axios.get, "/getOne/" + action.payload.gameName);
  yield put({ type: UpdateReducer.SINGLE, payload: { VGame: game.data } });
}

function* retrieveGame() {
  yield takeEvery("RETRIEVE_GAME", getAGame);
}

function* deleteGame() {
  yield takeEvery("DELETE_GAME", deleteVGame);
}

function* updateGames() {
  yield takeEvery("UPDATE_LIST", getAllGames);
}

function* addGame() {
  yield takeEvery("ADD_GAME", addVGame);
}

function* updateGame() {
  yield takeEvery("UPDATE_GAME", updateVGame);
}

export default function* rootSaga() {
  yield all([
    updateGame(),
    addGame(),
    updateGames(),
    retrieveGame(),
    deleteGame(),
  ]);
}
