'use client'

import CustomLink from "@/components/ui/CustomLink/CustomLink"

const NotFoundPage = () => {

    return (
        <div className="h-full w-full flex flex-col items-center justify-center">
            <h2 className="font-bold text-3xl mb-10">Страница не существует!</h2>
            <p className="font-bold text-xl mb-10">Запрашиваемый ресурс не доступен</p>
            <CustomLink text="Вернуться на главную" href='/' />
        </div>
    )
}

export default NotFoundPage