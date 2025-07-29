import React from 'react';

interface FinedSymptomButtonProps {
    onAction: (symptom: string) => void,
    symptom: string
}

const FinedSymptomButton = (
    { onAction, symptom }: FinedSymptomButtonProps) => {

    return (
        <button className="py-3 px-5 cursor-pointer hover:opacity-60 duration-300
                                transition-opacity w-full h-full text-start"
            onClick={() => onAction(symptom)}>
            {symptom}
        </button>
    )
}

export default FinedSymptomButton