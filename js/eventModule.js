import { formatDate } from './utilsModule.js';
import { getValuteFromId, getValutesData } from './dataModule.js';

function addSelectValuteEvent() {
    const valutesSelect = document.getElementById('valutesSelect');
    const descriptionValutes = document.getElementById('descriptionValutes');
    const valuteTitle = document.getElementById('valuteTitle');
    const valuteData = document.getElementById('valuteData');
    const previousValuteData = document.getElementById('previousValuteData');

    valutesSelect.addEventListener('change', function (event) {
        const selectedValuteId = event.target.value;
        const valutesData = getValutesData();

        const selectedValuteData = getValuteFromId(selectedValuteId);
        if (selectedValuteData) {
            valuteTitle.textContent = `${selectedValuteData.ID} - ${selectedValuteData.Name}(${selectedValuteData.CharCode})`;

            valuteData.textContent = `${formatDate(valutesData.Date)} - ${
                selectedValuteData.Value
            }`;

            previousValuteData.textContent = `${formatDate(
                valutesData.PreviousDate
            )} - ${selectedValuteData.Previous}`;

            descriptionValutes.style.display = 'block';
        } else {
            descriptionValutes.style.display = 'none';
        }
    });
}

export { addSelectValuteEvent };
