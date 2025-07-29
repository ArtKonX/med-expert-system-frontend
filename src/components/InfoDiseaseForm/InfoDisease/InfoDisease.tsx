'use client'

import React from 'react';

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

const InfoDisease = (
    { disease }: { disease: DiseaseData }) => {

    return (
        <>
            <h1 className="text-center text-2xl font-bold mb-7 max-sm:text-xl">Анализ завершен:</h1>
            <h2 className="text-center text-xl font-bold mb-7 max-sm:text-md">Диагноз:</h2>
            <span className="text-center block font-bold text-xl mb-7 max-sm:text-md">{disease?.mainDisease?.disease.name}</span>
            <span className="block text-lg font-bold mb-5">Описание: {disease?.mainDisease?.disease.description}</span>
            <span className="block text-lg mb-5 font-bold">Категория: {disease?.mainDisease?.disease.category}</span>
            <div className="block text-lg mb-5 font-bold">
                <span className="mr-3">Опасность: {disease?.mainDisease?.disease.risk_level > 2 ? 'Высокая' : disease?.mainDisease?.disease.risk_level === 2 ? "Средняя" : "Низкая"}</span>
                <span>Вероятность: {(disease?.mainDisease?.probability * 100).toFixed(1)}%</span>
            </div>
            <h3 className="text-center text-xl font-bold my-3">Жалобы:</h3>
            <ul className="flex flex-col font-bold">
                {disease?.selectedSymptoms.includes(',') ? disease?.selectedSymptoms.split(',')?.map((symptoms, indx) => (<li className="not-last:mr-2 text-lg" key={indx}>
                    {symptoms}
                </li>)) : (<li className="not-last:mr-2 text-lg" key={0}>
                    {disease?.selectedSymptoms}
                </li>)}
            </ul>
            {disease?.similarDiseases?.length ? (
                <>
                    <h3 className="text-center text-xl font-bold my-3">Другие возможные диагнозы:</h3>
                    <ul>
                        {disease?.similarDiseases?.map(disease => (
                            <li key={disease.id} className="text-md">
                                {disease.disease.name}
                                <span className="ml-3">Вероятность: {(disease?.probability * 100).toFixed(2)}%</span>
                            </li>
                        ))}
                    </ul>
                </>
            ) : null}
        </>
    )
}

export default InfoDisease