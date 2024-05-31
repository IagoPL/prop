<<<<<<< HEAD
document.getElementById('loadCsvButton').addEventListener('click', function() {
=======
const requiredHeaders = [
    'Folder Name', 'Quantity', 'Trade Quantity', 'Card Name', 
    'Set Code', 'Set Name', 'Card Number', 'Condition', 
    'Printing', 'Language', 'Price Bought', 'Date Bought', 
    'LOW', 'MID', 'MARKET'
];

let csvData = [];
let filteredCards = [];

document.getElementById('csvFileInput').addEventListener('change', function() {
>>>>>>> 0050425fdea9744915b51b9adb072ca95b55510e
    const input = document.getElementById('csvFileInput').files[0];
    if (input) {
        Papa.parse(input, {
            header: true,
<<<<<<< HEAD
            complete: function(results) {
                displayCsvData(results.data);
                showConfirmationMessage();
=======
            skipEmptyLines: true,
            complete: function(results) {
                console.log("CSV Data:", results.data); // Debugging: log CSV data
                console.log("CSV Headers:", results.meta.fields); // Debugging: log CSV headers
                console.log("CSV Errors:", results.errors); // Debugging: log CSV errors
                
                // Remove the 'sep=,' line if present
                if (results.meta.fields[0] && results.meta.fields[0].includes('sep=')) {
                    results.meta.fields.shift();
                }
                if (results.errors.length === 0 && validateCsvHeaders(results.meta.fields)) {
                    csvData = results.data; // Store the CSV data
                    displayCsvData(csvData);
                    populateFilterOptions(csvData);
                    showConfirmationMessage();
                } else {
                    showErrorMessage();
                }
            },
            error: function() {
                showErrorMessage();
>>>>>>> 0050425fdea9744915b51b9adb072ca95b55510e
            }
        });
    } else {
        alert("Por favor, selecciona un archivo CSV.");
    }
});

<<<<<<< HEAD
=======
document.getElementById('toggleViewButton').addEventListener('click', function() {
    const csvTableContainer = document.getElementById('csvTableContainer');
    const cardGrid = document.getElementById('cardGrid');
    const button = document.getElementById('toggleViewButton');
    
    if (csvTableContainer.style.display === 'none') {
        csvTableContainer.style.display = 'block';
        cardGrid.style.display = 'none';
        button.textContent = 'Mostrar cartas';
    } else {
        fetchMagicCardsFromCsv();
        csvTableContainer.style.display = 'none';
        cardGrid.style.display = 'block';
        button.textContent = 'Mostrar datos CSV';
    }
});

document.getElementById('smallGridButton').addEventListener('click', function() {
    document.getElementById('cardGridContainer').classList.remove('grid-medium', 'grid-large', 'grid-extra-large');
    document.getElementById('cardGridContainer').classList.add('grid-small');
});

document.getElementById('mediumGridButton').addEventListener('click', function() {
    document.getElementById('cardGridContainer').classList.remove('grid-small', 'grid-large', 'grid-extra-large');
    document.getElementById('cardGridContainer').classList.add('grid-medium');
});

document.getElementById('largeGridButton').addEventListener('click', function() {
    document.getElementById('cardGridContainer').classList.remove('grid-small', 'grid-medium', 'grid-extra-large');
    document.getElementById('cardGridContainer').classList.add('grid-large');
});

document.getElementById('extraLargeGridButton').addEventListener('click', function() {
    document.getElementById('cardGridContainer').classList.remove('grid-small', 'grid-medium', 'grid-large');
    document.getElementById('cardGridContainer').classList.add('grid-extra-large');
});

document.getElementById('applyFiltersButton').addEventListener('click', function() {
    applyFilters();
});

function validateCsvHeaders(headers) {
    const isValid = requiredHeaders.every(header => headers.includes(header));
    if (!isValid) {
        alert("El archivo CSV tiene un formato incorrecto.");
    }
    return isValid;
}

>>>>>>> 0050425fdea9744915b51b9adb072ca95b55510e
function displayCsvData(data) {
    const headers = Object.keys(data[0]);
    const csvHeader = document.getElementById('csvHeader');
    const csvBody = document.getElementById('csvBody');

    // Limpiar la tabla antes de añadir nuevos datos
    csvHeader.innerHTML = '';
    csvBody.innerHTML = '';

    // Añadir los encabezados a la tabla
    headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        csvHeader.appendChild(th);
    });

    // Añadir las filas de datos a la tabla
    data.forEach(row => {
        const tr = document.createElement('tr');
        headers.forEach(header => {
            const td = document.createElement('td');
            td.textContent = row[header];
            tr.appendChild(td);
        });
        csvBody.appendChild(tr);
    });
}

function showConfirmationMessage() {
    const confirmationMessage = document.getElementById('confirmationMessage');
    confirmationMessage.style.display = 'block';
    setTimeout(() => {
        confirmationMessage.style.display = 'none';
    }, 3000);
}
<<<<<<< HEAD
=======

function showErrorMessage() {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.style.display = 'block';
}

function fetchMagicCardsFromCsv() {
    const fetchPromises = csvData.map(row => {
        const name = row['Card Name'];
        const setCode = row['Set Code'];
        const quantity = row['Quantity'];
        return fetch(`https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(name)}&set=${setCode}`)
            .then(response => response.json())
            .then(data => {
                if (data.cards.length > 0) {
                    const card = data.cards[0];
                    return { 
                        name, 
                        setCode, 
                        quantity, 
                        imageUrl: card.imageUrl, 
                        color: card.colors ? card.colors.join(', ') : 'Colorless', 
                        type: card.type ? card.type : 'Unknown' 
                    };
                } else {
                    return { 
                        name, 
                        setCode, 
                        quantity, 
                        imageUrl: 'placeholder.png', 
                        color: 'Unknown', 
                        type: 'Unknown' 
                    };
                }
            });
    });

    Promise.all(fetchPromises).then(results => {
        filteredCards = results;
        displayCardGrid(results);
    }).catch(() => {
        showErrorMessage();
    });
}

function displayCardGrid(cards) {
    const cardGridContainer = document.getElementById('cardGridContainer');
    cardGridContainer.innerHTML = '';

    cards.forEach(card => {
        const cardItem = document.createElement('div');
        cardItem.classList.add('col-12', 'col-sm-6', 'col-md-4', 'col-lg-3', 'card-grid-item');

        const cardElement = document.createElement('div');
        cardElement.classList.add('card');

        const cardImage = document.createElement('img');
        cardImage.classList.add('card-img-top');
        cardImage.src = card.imageUrl;
        cardImage.alt = card.name;
        cardImage.style.cursor = 'pointer';
        cardImage.onerror = function() {
            cardImage.src = 'placeholder.png';
        };
        cardImage.onclick = function() {
            showFullScreenImage(card.imageUrl);
        };

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = `${card.name} (${card.quantity})`;

        cardBody.appendChild(cardTitle);
        cardElement.appendChild(cardImage);
        cardElement.appendChild(cardBody);
        cardItem.appendChild(cardElement);
        cardGridContainer.appendChild(cardItem);
    });

    document.getElementById('csvTableContainer').style.display = 'none';
    document.getElementById('cardGrid').classList.remove('d-none');
}

function populateFilterOptions(data) {
    const setFilter = document.getElementById('setFilter');
    const typeFilter = document.getElementById('typeFilter');

    const sets = [...new Set(data.map(row => row['Set Name']))];
    const types = [...new Set(data.map(row => row['Card Type']))];

    sets.forEach(set => {
        const option = document.createElement('option');
        option.value = set;
        option.textContent = set;
        setFilter.appendChild(option);
    });

    types.forEach(type => {
        const option = document.createElement('option');
        option.value = type;
        option.textContent = type;
        typeFilter.appendChild(option);
    });
}

function applyFilters() {
    const nameFilter = document.getElementById('nameFilter').value.toLowerCase();
    const setFilter = document.getElementById('setFilter').value;
    const colorFilter = document.getElementById('colorFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;

    const filtered = filteredCards.filter(card => {
        return (!nameFilter || card.name.toLowerCase().includes(nameFilter)) &&
               (!setFilter || card.setCode === setFilter) &&
               (!colorFilter || (card.color && card.color.includes(colorFilter))) &&
               (!typeFilter || (card.type && card.type.includes(typeFilter)));
    });

    displayCardGrid(filtered);
}

function showFullScreenImage(imageUrl) {
    const modal = document.getElementById('fullScreenModal');
    const fullScreenImage = document.getElementById('fullScreenImage');
    fullScreenImage.src = imageUrl;
    $(modal).modal('show');
}

document.getElementById('fullScreenModal').addEventListener('click', function() {
    $(this).modal('hide');
});

>>>>>>> 0050425fdea9744915b51b9adb072ca95b55510e
