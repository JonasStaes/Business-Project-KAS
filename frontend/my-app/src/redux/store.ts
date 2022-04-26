import { combineReducers, configureStore } from "@reduxjs/toolkit"
import thunkMiddleware from 'redux-thunk'
import errorReducer from "./features/errors/errorSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { baseApi } from "./features/api/baseApi";
import authReducer from "./features/auth/authSlice";
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [baseApi.reducerPath]
}

const persistedReducer = persistReducer(persistConfig, authReducer)

const combinedReducer = combineReducers({
  error: errorReducer,
  auth: persistedReducer,
  [baseApi.reducerPath]: baseApi.reducer
});

export const store = configureStore({
  reducer: combinedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    }
  })
    .concat(thunkMiddleware)
    .concat(baseApi.middleware),
});

export type GlobalState = ReturnType<typeof store.getState>;
export type StoreDispatch = typeof store.dispatch;
setupListeners(store.dispatch);