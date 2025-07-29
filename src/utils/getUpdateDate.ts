const getUpdateDate = (date: Date) => {

    const mins = new Date(date).getMinutes();
    const hours = new Date(date).getHours();

    const day = new Date(date).getDate();
    const month = new Date(date).getMonth() + 1;
    const year = new Date(date).getFullYear();

    const correctMins = mins < 10 ? `0${mins}` : mins;
    const correctHours = hours < 10 ? `0${hours}` : hours;

    const correctDay = day < 10 ? `0${day}` : day;
    const correctMonth = month < 10 ? `0${month}` : month;

    return `${correctMins} мин. ${correctHours} ч. ${correctDay}.${correctMonth}.${year}`
}

export default getUpdateDate