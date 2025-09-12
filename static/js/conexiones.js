document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const imageModal = document.getElementById("image-modal"); // Renamed for clarity
  const tableModal = document.getElementById("table-modal"); // New table modal
  const buttons = document.querySelectorAll(".btn-dispositivo");
  const imageModalContent = imageModal.querySelector('.modal-content'); // Renamed for clarity
  const tableModalContent = tableModal.querySelector('.modal-content'); // New table modal content
  const tableContainer = document.getElementById("table-container"); // New table container
  const closeImageModalButton = imageModal.querySelector('.close-button'); // Get close button for image modal
  const closeTableModalButton = document.getElementById("close-table-modal"); // Get close button for table modal

  let currentImagePath = '';
  let isDispositivo1 = false;
  let previousModalState = { imagePath: '', isDispositivo1: false }; // To store state before showing SW-HKVS image

  function showImageAndButtons() {
    imageModalContent.innerHTML = `<span class="close-button">&times;</span><img id="modal-image" src="${currentImagePath}" alt="Imagen ampliada" style="width:100%">`;

    if (isDispositivo1) {
      const swButton = document.createElement('button');
      swButton.textContent = 'SW - 01';
      swButton.className = 'btn-dispositivo';
      swButton.style.position = 'absolute';
      swButton.style.top = '25%';
      swButton.style.left = '5%';
      swButton.id = 'modal-sw-btn';
      imageModalContent.appendChild(swButton);

      const tablaButton = document.createElement('button');
      tablaButton.textContent = 'Conexiones Existentes'; // Corrected text
      tablaButton.className = 'btn-dispositivo';
      tablaButton.style.position = 'absolute';
      tablaButton.style.top = '55%';
      tablaButton.style.left = '5%';
      tablaButton.id = 'modal-tabla-btn';
      imageModalContent.appendChild(tablaButton);
    }
  }

  // Handle clicks on all ".btn-dispositivo" buttons on the main page
  buttons.forEach(button => {
    button.addEventListener('click', function(event) {
      event.stopPropagation();
      const imagePath = this.getAttribute('data-image');
      if (imagePath) {
        previousModalState.imagePath = currentImagePath; // Store current state
        previousModalState.isDispositivo1 = isDispositivo1; // Store current state

        currentImagePath = imagePath;
        isDispositivo1 = this.id === 'btn-dispositivo-1';
        showImageAndButtons();
        imageModal.style.display = "block"; // Show image modal
      }
    });
  });

  // Handle clicks inside the image modal using event delegation
  imageModalContent.addEventListener('click', function(event) {
    const target = event.target;

    if (target.classList.contains('close-button')) {
      imageModal.style.display = "none";
    } else if (target.id === 'modal-tabla-btn') {
      imageModal.style.display = "none"; // Hide image modal
      tableModal.style.display = "block"; // Show table modal
      createAndDisplayTable(); // Populate table modal
    } else if (target.id === 'modal-sw-btn') {
      // Store current state before showing SW-HKVS image
      previousModalState.imagePath = currentImagePath;
      previousModalState.isDispositivo1 = isDispositivo1;

      imageModalContent.innerHTML = `
        <span class="close-button">&times;</span>
        <div class="image-display-wrapper">
            <img id="modal-image" src="/static/img/SW-HKVS.jpg" alt="Switch HKVS">
            <button id="back-from-sw-btn" class="btn-regresar">&larr; Regresar</button>
        </div>
      `;
      // Add event listener for the new back button
      document.getElementById('back-from-sw-btn').addEventListener('click', function() {
        currentImagePath = previousModalState.imagePath; // Restore previous image
        isDispositivo1 = previousModalState.isDispositivo1; // Restore previous button state
        showImageAndButtons();
      });

    }
  });

  // Handle clicks inside the table modal
  closeTableModalButton.addEventListener('click', function() {
    tableModal.style.display = "none"; // Close table modal
    imageModal.style.display = "block"; // Show image modal again
  });

  // Close the modal by clicking outside of the modal content
  window.onclick = function(event) {
    if (event.target == imageModal) {
      imageModal.style.display = "none";
    } else if (event.target == tableModal) {
      tableModal.style.display = "none";
      imageModal.style.display = "block"; // Show image modal again
    }
  }

  // Function to create and display the table
  function createAndDisplayTable() {
    // Clear previous content in tableContainer
    tableContainer.innerHTML = '';

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
      th.style.backgroundColor = 'var(--truper-azul)'; // Using Truper blue
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

    // Append the table to the tableContainer
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-responsive-wrapper';
    tableContainer.appendChild(tableWrapper);
    tableWrapper.appendChild(table); // Append table to wrapper

    // Create and append the back button after the table
    const backButton = document.createElement('span');
    backButton.className = 'btn-regresar'; // Use the existing class
    backButton.innerHTML = '&larr; Regresar';
    tableContainer.appendChild(backButton); // Append to tableContainer

    // Add event listener for the back button in the table modal
    backButton.addEventListener('click', function() {
      tableModal.style.display = "none"; // Close table modal
      imageModal.style.display = "block"; // Show image modal again
    });
  }
});