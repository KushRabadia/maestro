// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper(() => store);

export default store;