import React from 'react';

import DiagnosePage from "@/pages-components/DiagnosePage/DiagnosePage";
import { Metadata } from "next";

interface DiagnoseParams {
    id: string
}

export const metadata: Metadata = {
    title: 'Результат исследования',
    description: 'Созраненный результат исследования',
};

export const revalidate = 0;

export const dynamicParams = false

const Diagnose = async (
    { params }: { params: Promise<DiagnoseParams> }) => {

    const { id } = await params;

    return (
        <DiagnosePage id={id} />
    )
}

export default Diagnose