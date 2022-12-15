import { configureStore } from "@reduxjs/toolkit";
import patientReducer from "./reducers/patientReducer";
import userReducer from "./reducers/userReducer";

const store = configureStore({
  reducer: {
    patient: patientReducer,
    user: userReducer,
  },
});
export default store;
