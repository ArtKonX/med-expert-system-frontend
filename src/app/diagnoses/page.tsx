import React from 'react';

import DiagnosesPage from "@/pages-components/DiagnosesPage/DiagnosesPage"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Результаты',
  description: 'Результаты исследований',
};

const Diagnoses = () => {

    return (
        <DiagnosesPage />
    )
}

export default Diagnoses