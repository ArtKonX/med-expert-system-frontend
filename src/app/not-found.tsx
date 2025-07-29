import NotFoundPage from "@/pages-components/NotFoundPage/NotFoundPage"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Ошибка 404',
  description: 'Несуществующая страница',
};

const NotFound = () => {

    return (
        <NotFoundPage />
    )
}

export default NotFound