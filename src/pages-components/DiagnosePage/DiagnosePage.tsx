'use client'

import React from 'react';

import InfoDisease from "@/components/InfoDiseaseForm/InfoDisease/InfoDisease";
import Loader from "@/components/ui/Loader/Loader";
import { useGetResultQuery } from "@/redux/services/resultsApi";

import dataLoading from '../../data/data-loading.json';
import CustomLink from "@/components/ui/CustomLink/CustomLink";
import NotFoundPage from '../NotFoundPage/NotFoundPage';

const DiagnosePage = (
    { id }: { id: string }) => {

    const { data: resultData, isLoading: isResultLoading, error: resultError } = useGetResultQuery({ id });

    if (isResultLoading || resultError) return (<Loader dataLoading={dataLoading} />)

    if (id === 'null') return <NotFoundPage />

    return (
        <div className="w-full h-full py-5 px-8">
            <CustomLink text="Назад" href='/diagnoses' />
            <h1 className="text-center text-3xl font-bold text-blue-700 dark:text-white my-7">
                Результаты эксперизы:
            </h1>
            {!resultData ?
                (<h3 className="text-2xl text-center font-bold text-blue-500 mt-[150px]">Результат не найден!</h3>) :
                (<div className="bg-blue-50 dark:bg-blue-900/40 p-8 py-5 rounded-2xl text-center">
                    <InfoDisease disease={resultData} />
                </div>)
            }
        </div>
    )
}

export default DiagnosePage