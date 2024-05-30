document.getElementById('loadCsvButton').addEventListener('click', function() {
    const input = document.getElementById('csvFileInput').files[0];
    if (input) {
        Papa.parse(input, {
            header: true,
            complete: function(results) {
                displayCsvData(results.data);
                showConfirmationMessage();
            }
        });
    } else {
        alert("Por favor, selecciona un archivo CSV.");
    }
});

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
