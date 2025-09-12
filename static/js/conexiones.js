document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const modal = document.getElementById("image-modal");
  const buttons = document.querySelectorAll(".btn-dispositivo");
  const modalContent = modal.querySelector('.modal-content');

  // Handle clicks on all ".btn-dispositivo" buttons on the main page
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      const imagePath = this.getAttribute('data-image');

      if (imagePath) {
        modalContent.innerHTML = '<span class="close-button">&times;</span><img id="modal-image" src="" alt="Imagen ampliada" style="width:100%">';
        document.getElementById('modal-image').src = imagePath;

        if (this.id === 'btn-dispositivo-1') {
          const swButton = document.createElement('button');
          swButton.textContent = 'SW';
          swButton.className = 'btn-dispositivo';
          swButton.style.position = 'absolute';
          swButton.style.top = '10%';
          swButton.style.left = '10%';
          swButton.id = 'modal-sw-btn';
          modalContent.appendChild(swButton);

          const tablaButton = document.createElement('button');
          tablaButton.textContent = 'Mostrar Tabla';
          tablaButton.className = 'btn-dispositivo';
          tablaButton.style.position = 'absolute';
          tablaButton.style.top = '10%';
          tablaButton.style.left = '40%';
          tablaButton.id = 'modal-tabla-btn';
          modalContent.appendChild(tablaButton);
        }
        modal.style.display = "block";
      }
    });
  });

  // Handle clicks inside the modal using event delegation
  modalContent.addEventListener('click', function(event) {
    // Close button
    if (event.target.classList.contains('close-button')) {
      modal.style.display = "none";
    }
    // "Mostrar Tabla" button
    if (event.target.id === 'modal-tabla-btn') {
      modalContent.innerHTML = '<span class="close-button">&times;</span>';
      createAndDisplayTable();
    }
  });

  // Close the modal by clicking outside of the modal content
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Function to create and display the table
  function createAndDisplayTable() {
    let existingTable = document.getElementById('dynamic-table');
    if (existingTable) {
      existingTable.remove(); // Remove existing table if any
    }

    const table = document.createElement('table');
    table.id = 'dynamic-table';
    table.style.width = '80%';
    table.style.margin = '20px auto';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#f9f9f9';
    table.style.color = '#333';
    table.style.border = '1px solid #ddd';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Table Headers
    const headers = ['ID', 'Nombre', 'Estado', 'Ubicación'];
    const headerRow = document.createElement('tr');
    headers.forEach(headerText => {
      const th = document.createElement('th');
      th.textContent = headerText;
      th.style.padding = '8px';
      th.style.border = '1px solid #ddd';
      th.style.backgroundColor = '#4CAF50';
      th.style.color = 'white';
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);

    // Sample Data
    const data = [
      ['1', 'SW01', 'FE/01', 'PP/01'],
      ['2', 'SW01', 'FE/02', 'PP/01'],
      ['3', 'SW01', 'FE/03', 'Sala 1']
    ];

    data.forEach(rowData => {
      const row = document.createElement('tr');
      rowData.forEach(cellData => {
        const td = document.createElement('td');
        td.textContent = cellData;
        td.style.padding = '8px';
        td.style.border = '1px solid #ddd';
        td.style.textAlign = 'left';
        row.appendChild(td);
      });
      tbody.appendChild(row);
    });

    table.appendChild(thead);
    table.appendChild(tbody);

    // Append the table to the modal content
    if (modalContent) {
        modalContent.appendChild(table);
    }
  }
});