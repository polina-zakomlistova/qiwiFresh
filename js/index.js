import { fetchValutes, getValutes, getValutesData } from './dataModule.js';
import { createOption } from './displayModule.js';
import { addSelectValuteEvent } from './eventModule.js';
import './eventModule.js';

async function initApp() {
    await fetchValutes();
    const valutes = getValutes();
    const dataValutes = getValutesData();

    for (const [key, value] of Object.entries(valutes)) {
        const valuteData = {
            id: value.ID,
            name: value.Name,
            charCode: value.CharCode,
            value: value.Value,
            date: dataValutes.Date,
            previousValue: value.Previous,
            previousDate: dataValutes.PreviousDate,
        };

        createOption(valuteData);
        addSelectValuteEvent();
    }
}

initApp();
