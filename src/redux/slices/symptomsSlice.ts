import { buildCreateSlice, asyncThunkCreator } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

interface SymptomsInitialState {
    symptoms: string[]
}

const initialState = {
    symptoms: []
} as SymptomsInitialState

const createSliceWithThunk = buildCreateSlice({
    creators: { asyncThunk: asyncThunkCreator },
});

const SymptomsSlice = createSliceWithThunk({
    name: "symptomsState",
    initialState,
    selectors: {
        symptomsState: (state) => state,
    },
    reducers: (create) => ({
        addSymptom: create.reducer((state, action:
            { payload: { symptom: string } }) => {

            const { symptom } = action.payload;

            state.symptoms.push(symptom);

        }),
        removeSymptom: create.reducer((state, action:
            { payload: { indx: number } }) => {

            const { indx } = action.payload;

            state.symptoms = state.symptoms.filter((_, indxSymptom) => indxSymptom !== indx)
        }),
        resetSymptoms: create.reducer((state) => {

            state.symptoms = [];
        })
    }),
});

export default SymptomsSlice.reducer;

const persistConfig = {
    key: 'symptomsState',
    storage,
    whitelist: ['symptoms'],
};

const persistedReducer = persistReducer(persistConfig, SymptomsSlice.reducer);

export const { addSymptom, removeSymptom, resetSymptoms } = SymptomsSlice.actions;
export const reducer = persistedReducer;