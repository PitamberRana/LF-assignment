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
    editPatient(state, action) {
      const id = action.payload.id;
      const filterState = state.filter((x) => x.id !== id);
      const newState = [...filterState, action.payload];
      return newState;
    },
    deletePatient(state, action) {
      const id = action.payload.id;
      return state.filter((x) => x.id !== id);
    },
  },
});

export const { setPatient, addPatient, editPatient, deletePatient } =
  patientSlice.actions;
export default patientSlice.reducer;

export const getPatient = () => {
  return async (dispatch) => {
    const patient = await patientService.getAll();
    dispatch(setPatient(patient));
  };
};

export const addNewPatient = (patient) => {
  return async (dispatch) => {
    const newPatient = await patientService.create(patient);
    dispatch(addPatient(newPatient));
  };
};

export const updatePatient = (id, patient) => {
  return async (dispatch) => {
    const updatedPatient = await patientService.update(id, patient);
    dispatch(editPatient(updatedPatient));
  };
};

export const removePatient = (id) => {
  return async (dispatch) => {
    const deletedPatient = await patientService.remove(id);
    dispatch(deletePatient(deletedPatient));
  };
};
