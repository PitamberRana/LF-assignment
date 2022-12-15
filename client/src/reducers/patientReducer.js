import patientService from "../services/patient";
const { createSlice } = require("@reduxjs/toolkit");

const patientSlice = createSlice({
  name: "patient",
  initialState: null,
  reducers: {
    addPatient(state, action) {
      state.push(action.payload);
    },
    setPatient(state, action) {
      return action.payload;
    },
  },
});

export const { setPatient } = patientSlice.actions;
export default patientSlice.reducer;

export const getPatient = () => {
  return async (dispatch) => {
    const patient = await patientService.getAll();
    dispatch(setPatient(patient));
  };
};

// export const addNewPatient = (patient) => {
//   return async (dispatch) => {
//     const newPatient = await patientService.create(patient);
//     console.log("hello", newPatient);
// dispatch(addPatient(newPatient));
//   };
// };
