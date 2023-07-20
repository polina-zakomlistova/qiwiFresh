let url = 'https://www.cbr-xml-daily.ru/daily_json.js';

const valutesSelect = document.getElementById('valutesSelect');
const descriptionValutes = document.getElementById('descriptionValutes');

const getValutes = async () => {
    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(
                `Network response was not ok. Status: ${response.status} - ${response.statusText}`
            );
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error while fetching data:', error);
        throw error;
    }
};

// Функция для форматирования чисел с ведущим нулем
const formatNumberWithLeadingZero = (number) => {
    return number.toString().padStart(2, '0');
};

// Функция для форматирования даты в указанный формат
const formatDate = (dateStr) => {
    date = new Date(dateStr);
    const day = formatNumberWithLeadingZero(date.getDate());
    const month = formatNumberWithLeadingZero(date.getMonth() + 1);
    const year = date.getFullYear();
    const hours = formatNumberWithLeadingZero(date.getHours());
    const minutes = formatNumberWithLeadingZero(date.getMinutes());
    const seconds = formatNumberWithLeadingZero(date.getSeconds());

    return `${day}/${month}/${year}, ${hours}:${minutes}:${seconds}`;
};

const addDescriptionValutes = (valute) => {
    const descriptionValutes = document.getElementById('descriptionValutes');

    const blockDescription = document.createElement('div');
    const titleDescription = document.createElement('h2');
    const dataDescription = document.createElement('p');
    const previousDataDescription = document.createElement('p');

    const titleText = document.createTextNode(
        `${valute.id} - ${valute.name}(${valute.charCode})`
    );

    const data = `${formatDate(valute.date)} - ${valute.value}`;
    const dataPrevious = `${formatDate(valute.previousDate)} - ${
        valute.previousValue
    }`;

    const dataText = document.createTextNode(data);
    const previousDataText = document.createTextNode(dataPrevious);

    titleDescription.appendChild(titleText);
    dataDescription.appendChild(dataText);
    previousDataDescription.appendChild(previousDataText);

    blockDescription.id = valute.id;
    blockDescription.style.display = 'none';
    blockDescription.appendChild(titleDescription);
    blockDescription.appendChild(dataDescription);
    blockDescription.appendChild(previousDataDescription);

    descriptionValutes.appendChild(blockDescription);
};

const displayOption = async () => {
    const options = await getValutes();
    const valutes = options.Valute;

    for (const [key, value] of Object.entries(valutes)) {
        const newOption = document.createElement('option');

        const valuteData = {
            id: value.ID,
            name: value.Name,
            charCode: value.CharCode,
            value: value.Value,
            date: options.Date,
            previousValue: value.Previous,
            previousDate: options.PreviousDate,
        };

        const text = `${valuteData.id} - ${valuteData.name}`;
        newOption.value = valuteData.id;
        newOption.text = text;
        valutesSelect.appendChild(newOption);

        addDescriptionValutes(valuteData);

        valutesSelect.addEventListener('change', (event) => {
            const selectedValuteId = event.target.value;
            const descriptionValutesList = document.querySelectorAll(
                '#descriptionValutes > div'
            );
            const descriptionValutes =
                document.getElementById('descriptionValutes');

            descriptionValutes.style.display = 'block';
            descriptionValutesList.forEach((valuteItem) => {
                if (valuteItem.id === selectedValuteId) {
                    valuteItem.style.display = 'block';
                } else {
                    valuteItem.style.display = 'none';
                }
            });
        });
    }
};

displayOption();
