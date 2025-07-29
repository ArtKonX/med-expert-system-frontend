import SelectedSymptomRemoveButton from "./SelectedSymptomButton/SelectedSymptomButton"
import styles from './SelectedSymptoms.module.scss';

interface SelectedSymptomsProps {
    selectedSymptoms: string[],
    onRemoveSymptom: (indx: number) => void
}

const SelectedSymptoms = (
    { selectedSymptoms, onRemoveSymptom }: SelectedSymptomsProps) => {

    return (
        <ul className={`${styles['list-selected-symptoms']} max-sm:text-[14px] max-w-[calc(100%)] max-h-[140px]
        w-full flex overflow-x-auto pb-5 mb-1 pt-3`}>
            {selectedSymptoms.map((symptom, indx) => (
                <li key={indx} className="not-last:mr-3 mr-1.5 px-8 py-3 bg-blue-50 box-border
                dark:bg-blue-900 dark:text-white flex
                rounded-xl font-bold relative w-full">
                    <span className="flex items-center whitespace-nowrap">
                        {symptom}
                    </span>
                    <SelectedSymptomRemoveButton indx={indx} text='x' onRemoveSymptom={onRemoveSymptom} />
                </li>
            ))}
        </ul>
    )
}

export default SelectedSymptoms