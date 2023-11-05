let contadorTemporizadores = 0;
const temporizadores = {};

function agregarFila() {
    var tabla = document.getElementById("info");
    var fila = tabla.insertRow(-1);

    var celda1 = fila.insertCell(0);
    var celda2 = fila.insertCell(1);
    var celda3 = fila.insertCell(2);
    var celda4 = fila.insertCell(3);
    const celda5 = fila.insertCell(4);
    const id = `temporizador-${contadorTemporizadores}`;

    celda1.innerHTML = document.getElementById("Nombre").value;
    celda2.innerHTML = document.getElementById("Cantidad").value;
    celda3.innerHTML = document.getElementById("Total").value;
    celda4.innerHTML = document.getElementById("Burbuja").value;
    celda5.innerHTML = `<div id="${id}">30:00</div>`;
    temporizadores[id] = { tiempo: 30 * 60 };
    iniciarTemporizador(id);
    contadorTemporizadores++;
}

function iniciarTemporizador(id) {
    const tiempoActual = document.getElementById(id);
    let tiempo = temporizadores[id].tiempo;

    const intervalId = setInterval(() => {
        if (tiempo <= 0) {
            clearInterval(intervalId); // Detener el temporizador cuando llegue a 0
            tiempoActual.innerHTML = 'terminó';
        } else {
            const minutes = Math.floor(tiempo / 60);
            let segundos = tiempo % 60;
            segundos = segundos < 10 ? `0${segundos}` : segundos; // Formatear segundos
            tiempoActual.innerHTML = `${minutes}:${segundos}`;
            tiempo--;
            temporizadores[id].tiempo = tiempo;
        }
    }, 1000);
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("guardar").addEventListener("click", function htmlTableToExcel() {
    // Obtener los datos del formulario
    const tabla = document.getElementById("info");
    const data = [];
    for (let i = 1; i < tabla.rows.length; i++) {
      const row = tabla.rows[i];
      const rowData = [];
      for (let j = 0; j < row.cells.length; j++) {
        rowData.push(row.cells[j].textContent);
      }
      data.push(rowData);
    }
    
    const ws = XLSX.utils.aoa_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Datos");
    
    // Generar un archivo Blob con el libro de Excel
    const blob = XLSX.write(wb, { bookType: "xlsx", type: "blob" });
    
    // Usar FileSaver.js para guardar el archivo
    saveAs(blob, "datos.xlsx");
  });
});