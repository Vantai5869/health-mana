import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slice/Authen/login";
import branchReducer from "../redux/slice/Branch/BranchSlice";
import serviceGroupReducer from "../redux/slice/ServiceGroup/ServiceGroupSlice";
export const store = configureStore({
  reducer: {
    loginReducer,
    branchReducer,
    serviceGroupReducer
  },
});

export type RootState = ReturnType<typeof store.getState>; // A global type to access reducers types
export type AppDispatch = typeof store.dispatch; // Type to access dispatch
