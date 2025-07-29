import React from 'react';

import DiagnosePage from "@/pages-components/DiagnosePage/DiagnosePage";
import { Metadata } from "next";

import NEXT_BACKEND_URL from '@/environment/environment';

interface DiagnoseParams {
    id: string
}

interface ResultData {
    id: string,
    created_at: Date,
    description: string,
    diagnose: string,
    probability: number,
    symptoms: string,
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

interface ResultsData {
    success: boolean,
    data: ResultData[]
}

export const metadata: Metadata = {
    title: 'Результат исследования',
    description: 'Созраненный результат исследования',
};

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ id: string }[]> {

    try {
        const response = await fetch(`${NEXT_BACKEND_URL}/results`);

        const results = await response.json() as ResultsData;

        if (results.success && results.data.length) {
            return results.data.map((result) => ({
                id: result.id.toString()
            }));
        }

        return [{
            id: 'null'
        }];
    } catch (err) {
        console.error('Ошибка при получения результатов исследований:', err);
        return [{
            id: 'null'
        }];
    }
}

const Diagnose = async (
    { params }: { params: Promise<DiagnoseParams> }) => {

    const { id } = await params;

    return (
        <DiagnosePage id={id} />
    )
}

export default Diagnose