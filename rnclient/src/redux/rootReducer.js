import {PersistorKeys} from '@constants/strings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import application from '@redux/slices/applicationSlice';
import counter from '@redux/slices/counterSlice';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';

// Persist application related redux data
const applicationPersistedReducer = persistReducer(
  {key: PersistorKeys.application, storage: AsyncStorage},
  application,
);

const rootReducer = combineReducers({
  counter,
  application: applicationPersistedReducer,
});

export {rootReducer};
