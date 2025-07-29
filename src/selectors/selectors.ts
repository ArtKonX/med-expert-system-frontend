import { RootState } from "@/redux/store";
import { createSelector } from 'reselect';

export const selectSymptomsState = createSelector(
    (state: RootState) => state.symptomsState,

    (symptomsState) => ({
        ...symptomsState
    })
);