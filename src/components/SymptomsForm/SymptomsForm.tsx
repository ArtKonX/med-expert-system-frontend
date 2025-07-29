'use client'

import { ChangeEvent, FormEvent } from "react";
import CustomButton from "../ui/CustomButton/CustomButton";
import CustomInput from "../ui/CustomInput/CustomInput";

interface SymptomsForm {
    opacityPlaceholder: number,
    onSubmitDiagnose: (e: FormEvent<HTMLFormElement>) => void,
    onChangeSymptom: (e: ChangeEvent<HTMLInputElement>) => void,
    symptomPlaceholder: string,
    isDiagnoseDisabled: boolean,
    symptom: string
}

const SymptomsForm = (
    { opacityPlaceholder, onSubmitDiagnose,
        onChangeSymptom, symptomPlaceholder,
        isDiagnoseDisabled, symptom }: SymptomsForm) => {

    return (
        <form className="w-full relative flex" onSubmit={onSubmitDiagnose}>
            <CustomInput opacityPlaceholder={opacityPlaceholder}
                symptomPlaceholder={symptomPlaceholder} onChange={onChangeSymptom}
                symptom={symptom} />
            <CustomButton text='Диагноз'
                type="submit" disabled={isDiagnoseDisabled} />
        </form>
    );
}

export default SymptomsForm