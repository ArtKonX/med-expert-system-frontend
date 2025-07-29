import { ChangeEvent } from "react"

import React from 'react';

interface CustomInput {
    opacityPlaceholder: number,
    symptomPlaceholder: string,
    onChange: (e: ChangeEvent<HTMLInputElement>) => void,
    symptom: string
}

const CustomInput = (
    { opacityPlaceholder, symptomPlaceholder, onChange, symptom }:
        CustomInput) => {

    return (
        <input className={`max-w-[calc(100%)] w-full bg-blue-100 dark:bg-blue-900/70 dark:text-white h-13 py-3 px-5
  dark:placeholder-white focus:outline-0 rounded-xl flex
  placeholder:opacity-${String(opacityPlaceholder)}
  placeholder:transition-all placeholder:duration-500
  placeholder:ease-in-out
  focus:placeholder:opacity-0`} type="text"
            placeholder={symptomPlaceholder}
            onChange={onChange} value={symptom} />
    )
}

export default CustomInput