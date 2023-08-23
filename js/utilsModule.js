// Функция для форматирования чисел с ведущим нулем
const formatNumberWithLeadingZero = (number) => {
    return number.toString().padStart(2, '0');
};

// Функция для форматирования даты в указанный формат DD/MM/YYYY, HH:MM:SS
const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const day = formatNumberWithLeadingZero(date.getDate());
    const month = formatNumberWithLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = formatNumberWithLeadingZero(date.getHours());
    const minutes = formatNumberWithLeadingZero(date.getMinutes());
    const seconds = formatNumberWithLeadingZero(date.getSeconds());

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

export { formatDate };
