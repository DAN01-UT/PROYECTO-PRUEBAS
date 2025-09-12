document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const modal = document.getElementById("image-modal");
  const buttons = document.querySelectorAll(".btn-dispositivo");
  const modalContent = modal.querySelector('.modal-content');
  let currentImagePath = '';
  let isDispositivo1 = false;

  function showImageAndButtons() {
    modalContent.innerHTML = `<span class="close-button">&times;</span><img id="modal-image" src="${currentImagePath}" alt="Imagen ampliada" style="width:100%">`;

    if (isDispositivo1) {
      const swButton = document.createElement('button');
      swButton.textContent = 'SW - 01';
      swButton.className = 'btn-dispositivo';
      swButton.style.position = 'absolute';
      swButton.style.top = '25%';
      swButton.style.left = '5%';
      swButton.id = 'modal-sw-btn';
      modalContent.appendChild(swButton);

      const tablaButton = document.createElement('button');
      tablaButton.textContent = 'COnexiones Existentes';
      tablaButton.className = 'btn-dispositivo';
      tablaButton.style.position = 'absolute';
      tablaButton.style.top = '55%';
      tablaButton.style.left = '5%';
      tablaButton.id = 'modal-tabla-btn';
      modalContent.appendChild(tablaButton);
    }
  }

  // Handle clicks on all ".btn-dispositivo" buttons on the main page
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      const imagePath = this.getAttribute('data-image');
      if (imagePath) {
        currentImagePath = imagePath;
        isDispositivo1 = this.id === 'btn-dispositivo-1';
        showImageAndButtons();
        modal.style.display = "block";
      }
    });
  });

  // Handle clicks inside the modal using event delegation
  modalContent.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('close-button')) {
      modal.style.display = "none";
    } else if (target.id === 'modal-tabla-btn') {
      modalContent.innerHTML = '<span class="back-button">&larr; Regresar</span>';
      createAndDisplayTable();
    } else if (target.id === 'modal-sw-btn') {
      const modalImage = document.getElementById('modal-image');
      const newImagePath = '/static/img/SW-HKVS.jpg';
      if (modalImage) {
        modalImage.src = newImagePath;
        currentImagePath = newImagePath;
      }
    } else if (target.classList.contains('back-button')) {
      showImageAndButtons();
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
      existingTable.parentElement.remove(); // Remove the wrapper
    }

    const table = document.createElement('table');
    table.id = 'dynamic-table';
    table.style.borderCollapse = 'collapse';
    table.style.backgroundColor = '#f9f9f9';
    table.style.color = '#333';
    table.style.border = '1px solid #ddd';

    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');

    // Table Headers
    const headers = ['ID', 'NOMBRE', 'SWITCH', 'PATCH PANEL'];
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
        const tableWrapper = document.createElement('div');
        tableWrapper.className = 'table-responsive-wrapper';
        tableWrapper.appendChild(table);
        modalContent.appendChild(tableWrapper);
    }
  }
});