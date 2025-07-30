'use client'

import React from 'react';

import FinedSymptoms from "@/components/FinedSymptoms/FinedSymptoms";
import InfoDiseaseForm from "@/components/InfoDiseaseForm/InfoDiseaseForm";
import SelectedSymptoms from "@/components/SelectedSymptoms/SelectedSymptoms";
import SymptomsForm from "@/components/SymptomsForm/SymptomsForm";
import Loader from "@/components/ui/Loader/Loader";
import useDebounce from "@/hooks/useDebounce";
import { useDiagnoseMutation } from "@/redux/services/diagnoseApi";
import { useGetAllSymptomsQuery, useGetSymptomsQuery } from "@/redux/services/symptomsApi";
import Link from "next/link";
import { v4 as uuidv4 } from 'uuid';
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "@/hooks/useTypedSelector";
import { selectSymptomsState } from "@/selectors/selectors";
import { addSymptom, removeSymptom, resetSymptoms } from "@/redux/slices/symptomsSlice";
import { useSaveResultMutation } from "@/redux/services/resultsApi";
import { useRouter } from "next/navigation";
import dataLoading from '../../data/data-loading.json';

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

const HomePage = () => {
    const [selectedSymptoms, setSelectedSymptoms] = useState<string[] | null>(null);
    const [viewOneSymptom, setViewOneSymptom] = useState('')
    const [symptomQuery, setSymptomQuery] = useState('');
    const [opacityPlaceholder, setOpacityPlaceholder] = useState(0);
    const symptom = useDebounce(symptomQuery, 400)
    const [indxSymptom, setIndxSymptom] = useState(0);
    const [isSave, setIsSave] = useState(false);
    const [disease, setDisease] = useState<DiseaseData | null>(null);
    const dispatch = useDispatch();
    const [saveResult, { data: saveResultData, isLoading: isSaveDataLoading, error: saveDataError }] = useSaveResultMutation();
    const symptoms = useSelector(selectSymptomsState);
    const router = useRouter();

    const { data: getAllSymptomsData,
        isLoading: isGetAllSymptomsLoading,
        isError: isGetAllSymptomsError } = useGetAllSymptomsQuery({});

    const { data: getSymptomsData,
        isLoading: isGetSymptomsLoading,
        isError: isGetSymptomsError } = useGetSymptomsQuery({ q: symptom, dubbleList: symptoms.symptoms });

    const [diagnose, { data: diagnoseData,
        isLoading: isDiagnoseLoading,
        isError: isDiagnoseError }] = useDiagnoseMutation()

    useEffect(() => {

        const resetSymptms = () => {
            dispatch(resetSymptoms())
        }

        return resetSymptms()
    }, [])

    useEffect(() => {
        const viewSymptom = () => {

            setIndxSymptom(prev => (getAllSymptomsData?.data.length - 1 > prev) ? prev + 1 : 0)
        };

        const intervalId = setInterval(viewSymptom, 4000)

        return () => {
            clearInterval(intervalId);
        };

    }, [getAllSymptomsData?.data.length]);

    useEffect(() => {
        if (getAllSymptomsData?.data.length) {
            setOpacityPlaceholder(100)

            setViewOneSymptom(getAllSymptomsData?.data[indxSymptom]?.name)

            setTimeout(() => { setOpacityPlaceholder(0) }, 3500)
        }

        return () => setOpacityPlaceholder(0)
    }, [indxSymptom, setIndxSymptom])

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        setSymptomQuery(value.charAt(0).toUpperCase() + value.slice(1))
    }

    const onRemoveSymptom = (indx: number) => {
        if (selectedSymptoms) {
            dispatch(removeSymptom({ indx }))
            setSelectedSymptoms(selectedSymptoms.filter((_, indxSymp) => indx !== indxSymp))
        }
    }

    const onSubmitDiagnose = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            diagnose({ symptoms: selectedSymptoms })
            dispatch(resetSymptoms())

        } catch (e) {
            console.error('Ошибка получения диагноза ', e)
        }
    }

    useEffect(() => {
        if (diagnoseData?.data) {
            setDisease({ id: uuidv4(), ...diagnoseData?.data })
        }
    }, [diagnoseData])

    useEffect(() => {
        if (disease && isSave) {
            try {
                const objResult = {
                    symptoms: String(selectedSymptoms),
                    diagnose: disease.mainDisease.disease.name,
                    description: disease.mainDisease.disease.description,
                    probability: disease.mainDisease.probability,
                    date: new Date()
                }
                saveResult(objResult)
            } catch (e) {
                console.log(e)
            }
        }
    }, [disease, isSave])

    useEffect(() => {
        if (saveResultData?.success) {
            console.log('Успешное сохранение диагноза');
            setSelectedSymptoms(null)
            setSymptomQuery('')
            setDisease(null)
            setIsSave(false);
            router.push('/diagnoses')
        }
    }, [saveResultData])

    const onClose = () => {
        setSelectedSymptoms(null)
        setSymptomQuery('')
        setDisease(null)
    }

    const onSelectSymptom = (symptom: string) => {
        if (selectedSymptoms) {
            setSelectedSymptoms([...selectedSymptoms, symptom]);
        } else {
            setSelectedSymptoms([symptom])
        }
        dispatch(addSymptom({ symptom }))
        setSymptomQuery('')
    }

    const onSave = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setIsSave(true)
    }

    return (
        <div className="h-full w-full flex flex-col items-center
        justify-center p-2 max-sm:p-0">
            {(isGetAllSymptomsLoading || isGetSymptomsLoading ||
                isDiagnoseLoading || isGetAllSymptomsError ||
                isGetSymptomsError || isDiagnoseError || isSaveDataLoading || saveDataError)
                && (<Loader dataLoading={dataLoading} />)}
            <div className="absolute top-0 right-0 mx-4 my-6">
                <Link className="bg-blue-100 py-3 px-4 ml-2 font-bold text-lg
                dark:bg-blue-900 dark:text-white
                rounded-xl disabled:opacity-65 disabled:cursor-auto
                cursor-pointer hover:opacity-65 duration-500 transition-opacity"
                    href='/diagnoses'>Хранилище</Link>
            </div>
            <div className={`max-w-[70%] w-full max-sm:max-w-[90%]`}>
                {disease && (
                    <div className='bg-black/50 fixed w-full
                     h-full top-0 left-0 flex items-center justify-center z-50'>
                        <InfoDiseaseForm disease={disease} onClose={onClose} onSave={onSave} />
                    </div>
                )}
                <div className={`${(selectedSymptoms?.length || symptomQuery) &&
                    'bg-black/50 absolute w-full h-full top-0 left-0'}`} />
                {selectedSymptoms &&
                    (<div>
                        <SelectedSymptoms selectedSymptoms={selectedSymptoms}
                            onRemoveSymptom={onRemoveSymptom} />
                    </div>)
                }
                <SymptomsForm opacityPlaceholder={opacityPlaceholder}
                    onSubmitDiagnose={onSubmitDiagnose}
                    onChangeSymptom={onChange} symptomPlaceholder={viewOneSymptom}
                    isDiagnoseDisabled={!selectedSymptoms?.length} symptom={symptomQuery} />
                {symptomQuery && getSymptomsData.data.length > 0 && (
                    <div className="relative">
                        <div className="absolute max-w-full w-full">
                            <FinedSymptoms findedSymptoms={getSymptomsData.data} onSelect={onSelectSymptom} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default HomePage