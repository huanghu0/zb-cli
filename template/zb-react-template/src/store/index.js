import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from "redux-persist";
import { combineReducers } from 'redux';
import storage from "redux-persist/lib/storage";
import permissionSlice from './permission/permissionSlice';
import loginSlice from './login/loginSlice';
const reducers = combineReducers({
  permission: permissionSlice,
  login: loginSlice
})
const persistConfig = {
    key: "root", // 储存的标识名
    storage, // 储存方式
    whitelist: ["login"], //白名单 模块参与缓存
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultNormalizer) => getDefaultNormalizer({
      serializableCheck: false
    })
})
store.subscribe(() => console.log(store.getState(),'store'))
const persistor = persistStore(store);
export { store, persistor };