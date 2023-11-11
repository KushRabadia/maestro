import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import userReducer from './reducers/userReducer';
import { User } from '@/types';

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export type RootState = {
  user: { user: User | null };
};
export type AppDispatch = typeof store.dispatch;
export const wrapper = createWrapper(() => store);

export default store;