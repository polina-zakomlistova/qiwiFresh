const valutesSelect = document.getElementById('valutesSelect');

function createOption(valuteData) {
    const newOption = document.createElement('option');
    newOption.value = valuteData.id;
    newOption.text = `${valuteData.id} - ${valuteData.name}`;
    valutesSelect.appendChild(newOption);
}

export { createOption };
