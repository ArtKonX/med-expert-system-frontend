import HomePage from "@/pages-components/HomePage/HomePage"
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Главная',
  description: 'Медицинская экспертная система для получения диагноза по жалобам.',
};

const Home = () => {

    return (
        <HomePage />
    )
}

export default Home