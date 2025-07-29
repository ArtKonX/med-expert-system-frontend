'use client'

import Loader from "@/components/ui/Loader/Loader"
import { useGetResultsQuery, useRemoveResultMutation } from "@/redux/services/resultsApi"
import Link from "next/link"
import { useEffect } from "react"
import dataLoading from '../../data/data-loading.json';
import CustomLink from "@/components/ui/CustomLink/CustomLink"
import getUpdateDate from "@/utils/getUpdateDate"

const DiagnosesPage = () => {

    const { data: resultsData, isLoading: isResultsLoading, error: resultsError, refetch } = useGetResultsQuery({});
    const [removeResult, { data: removeData, isLoading: isRemoveLoading, error: removeError }] = useRemoveResultMutation();

    const onRemove = (id: number) => {
        removeResult({ id })
    }

    useEffect(() => {
        if (removeData?.success) {
            refetch()
        }
    }, [removeData])

    useEffect(() => {
        refetch()
    }, [])

    return (
        <div className="w-full h-full py-5 px-8 ">
            <CustomLink text="Назад" href='/' />
            <h1 className="text-center text-3xl font-bold text-blue-700 dark:text-white mt-7">
                Результаты экспериз:
            </h1>
            {isResultsLoading || isRemoveLoading || resultsError || removeError ?
                (<Loader dataLoading={dataLoading} />) : null}
            {resultsData?.length ? (
                <div className="max-sm:max-w-full
                max-sm:overflow-scroll pb-4">
                    <table className="mt-[90px] w-full border-collapse
                border border-gray-300">
                        <thead className="bg-blue-100 dark:bg-blue-900 dark:text-white">
                            <tr className="text-left">
                                <th className="p-4 border">Дата</th>
                                <th className="p-4 border">Диагноз</th>
                                <th className="p-4 border">Примечание</th>
                                <th className="p-4 border">Вероятность (в %)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {resultsData.map(result => (
                                <tr key={result.id} className="dark:text-white hover:opacity-60
                                transition-opacity duration-500">
                                    <td className="p-4 border text-center">
                                        {getUpdateDate(result.created_at)}
                                    </td>
                                    <td className="p-4 border text-center">
                                        {result.diagnose}
                                    </td>
                                    <td className="p-4 border text-center">
                                        {result.description}
                                    </td>
                                    <td className="p-4 border text-center">
                                        {(result.probability * 100).toFixed(1)}
                                    </td>
                                    <td className="p-4 border">
                                        <div className="flex justify-around">
                                            <button
                                                className="bg-red-500/60 font-bold cursor-pointer
                                        hover:opacity-65 duration-500 transition-opacity
                                        p-2"
                                                onClick={() => onRemove(result.id)}
                                            >
                                                Удалить
                                            </button>
                                            <Link href={`/diagnose/${result.id}`}
                                                className="bg-blue-100 font-bold cursor-pointer
                                        hover:opacity-65 duration-500 transition-opacity
                                        p-2 dark:bg-blue-900 dark:text-white"
                                            >
                                                Побробнее
                                            </Link>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <h3 className="text-2xl text-center font-bold text-blue-500 mt-[150px]">
                    Нет результатов!
                </h3>
            )}
        </div>
    )
}

export default DiagnosesPage