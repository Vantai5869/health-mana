import { configureStore } from "@reduxjs/toolkit";
import loginReducer from "../redux/slice/Authen/login";
import branchReducer from "../redux/slice/Branch/BranchSlice";
import serviceGroupReducer from "../redux/slice/ServiceGroup/ServiceGroupSlice";
import serviceReducer from "../redux/slice/Service/ServiceSlice";
export const store = configureStore({
  reducer: {
    loginReducer,
    branchReducer,
    serviceGroupReducer,
    serviceReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
