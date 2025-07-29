import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import NEXT_BACKEND_URL from '@/environment/environment';

interface ResultData {
    id: number,
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
    data: ResultData[]
}

const resultsApi = createApi({
    reducerPath: 'resultsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: NEXT_BACKEND_URL
    }),
    endpoints: (builder) => ({
        getResults: builder.query({
            query: () => ({
                url: '/results',
                method: 'GET'
            }),
            transformResponse: (response: ResultsData) => response.data
        }),
        saveResult: builder.mutation({
            query: (data) => ({
                url: '/save-result',
                method: 'POST',
                body: data
            })
        }),
        getResult: builder.query({
            query: ({ id }: { id: string }) => ({
                url: `/result?id=${id}`,
                method: 'GET'
            }),
            transformResponse: (response: {data: ResultData}) => response.data
        }),
        removeResult: builder.mutation({
            query: (data) => ({
                url: '/remove-result',
                method: 'DELETE',
                body: data
            })
        })
    })
});

export const { useGetResultsQuery, useSaveResultMutation, useGetResultQuery, useRemoveResultMutation } = resultsApi;
export default resultsApi;