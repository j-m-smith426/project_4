import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import MainStack from './src/Navigation/MainStack';
import rootSaga from './src/Redux/Actions/Sagas';
import { Reducer } from './src/Redux/Reducer';


const sagaMiddleware = createSagaMiddleware();

const store = createStore(Reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <MainStack/>
      </PaperProvider>
    </Provider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
