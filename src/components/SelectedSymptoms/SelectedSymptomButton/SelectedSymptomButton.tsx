interface SelectedSymptomRemoveButtonProps {
    indx: number,
    text: string,
    onRemoveSymptom: (indx: number) => void
}

const SelectedSymptomRemoveButton = (
    { indx, text, onRemoveSymptom }: SelectedSymptomRemoveButtonProps) => {

    return (
        <button onClick={() => onRemoveSymptom(indx)}
            className="text-2xl text-black cursor-pointer
                absolute -right-[5.5px] h-[22px] w-[22px]
                pb-[3px] pl-[1px] -top-[11px] flex items-center
                justify-center rounded-2xl bg-white border-1 border-black">
            {text}
        </button>
    )
}

export default SelectedSymptomRemoveButton