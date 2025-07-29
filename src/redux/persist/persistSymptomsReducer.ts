import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

import SymptomsSlice from '../slices/symptomsSlice';

const symptomsConfig = {
    key: 'symptomsState',
    storage,
}

export const persistSymptomsReducer =
    persistReducer(symptomsConfig, SymptomsSlice);