const URL = 'https://www.cbr-xml-daily.ru/daily_json.js';
let data = null;

async function fetchValutes() {
    try {
        const response = await fetch(URL);

        if (!response.ok) {
            throw new Error(
                `Network response was not ok. Status: ${response.status} - ${response.statusText}`
            );
        }

        data = await response.json();
    } catch (error) {
        console.error('Error while fetching data:', error);
        throw error;
    }
}

function getValutes() {
    return data ? data.Valute : {};
}

function getValutesData() {
    return data ? data : {};
}

function getValuteFromId(id) {
    const valutes = getValutes();
    return Object.values(valutes).find((valute) => valute.ID == id) || {};
}

export { fetchValutes, getValutes, getValutesData, getValuteFromId };
