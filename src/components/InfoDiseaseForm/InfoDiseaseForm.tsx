import { FormEvent } from "react"
import CustomButton from "../ui/CustomButton/CustomButton"
import InfoDisease from "./InfoDisease/InfoDisease"

interface DiseaseData {
    mainDisease: {
        disease: {
            name: string,
            description: string,
            category: string,
            risk_level: number
        },
        probability: number,
    },
    selectedSymptoms: string,
    similarDiseases: {
        id: number,
        disease: {
            name: string
        },
        probability: number
    }[]
}

interface InfoDiseaseFormProps {
    disease: DiseaseData,
    onClose: () => void,
    onSave: (e: FormEvent<HTMLFormElement>) => void
}

const InfoDiseaseForm = (
    { disease, onClose, onSave }: InfoDiseaseFormProps) => {

    return (
        <form className="bg-blue-50 max-h-[80%] overflow-auto p-8 py-5 rounded-2xl dark:bg-blue-900
        max-sm:max-h-[100%] max-sm:w-full max-sm:rounded-none
        max-sm:overflow-scroll" onSubmit={onSave}>
            <InfoDisease disease={disease} />
            <div className="flex justify-between mt-8">
                <CustomButton text='Сохранить' type='submit' disabled={!disease} />
                <CustomButton text='Отмена' type="button" onAction={onClose} />
            </div>
        </form>
    )
}

export default InfoDiseaseForm