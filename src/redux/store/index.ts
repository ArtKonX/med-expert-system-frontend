import { configureStore } from '@reduxjs/toolkit';
import diagnoseApi from '../services/diagnoseApi';
import symptomsApi from '../services/symptomsApi';
import resultsApi from '../services/resultsApi';
import { persistSymptomsReducer } from '../persist/persistSymptomsReducer';
import { persistStore } from 'redux-persist';

export const store = configureStore({
    reducer: {
        diagnoseApi: diagnoseApi.reducer,
        symptomsApi: symptomsApi.reducer,
        resultsApi: resultsApi.reducer,
        symptomsState: persistSymptomsReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(diagnoseApi.middleware, symptomsApi.middleware, resultsApi.middleware),
});

export const persistor =  persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;