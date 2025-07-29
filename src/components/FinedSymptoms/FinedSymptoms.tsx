import FinedSymptomButton from "./FinedSymptomButton/FinedSymptomButton"

interface FinedSymptom {
    name: string
}

interface FinedSymptomsProps {
    findedSymptoms: FinedSymptom[],
    onSelect: (symptom: string) => void
}

const FinedSymptoms = (
    { findedSymptoms, onSelect }: FinedSymptomsProps) => {

    return (
        <ul className=" bg-blue-100 dark:bg-blue-900/50 dark:text-white mt-3 w-full rounded-xl">
            {findedSymptoms.map((symptom, indx) => (
                <li key={indx} className="font-bold not-last:border-b-1 border-blue-100">
                    <FinedSymptomButton symptom={symptom.name}
                        onAction={onSelect} />
                </li>
            ))}
        </ul>
    )
}

export default FinedSymptoms