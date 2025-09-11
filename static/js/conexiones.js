document.addEventListener('DOMContentLoaded', function() {
  // Modal elements
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const buttons = document.querySelectorAll(".btn-dispositivo");
  const spanClose = document.getElementsByClassName("close-button")[0];

  // Open the modal for all buttons
  buttons.forEach(button => {
    button.onclick = function(event) {
      event.stopPropagation(); // Prevent click from bubbling to window
      const imagePath = this.getAttribute('data-image');
      if (imagePath) {
        modalImage.src = imagePath;
        modal.style.display = "block";
      }
    }
  });

  // Close the modal with the close button
  spanClose.onclick = function() {
    modal.style.display = "none";
  }

  // Close the modal by clicking outside of the modal content
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // Add a new button when the modal image loads
  modalImage.onload = function() {
    const newButton = document.createElement('button');
    newButton.textContent = 'SW-01'; // Placeholder text
    newButton.classList.add('btn-dispositivo'); // Apply existing button style
    newButton.style.position = 'absolute';
    newButton.style.top = '77px'; // Initial position, user can adjust
    newButton.style.left = '20px'; // Initial position, user can adjust
    newButton.style.zIndex = '10'; // Ensure it's above the image

    // Append the new button to the modal content
    // Ensure modal-content has position: relative; in CSS for absolute positioning to work correctly
    const modalContent = modal.querySelector('.modal-content');
    if (modalContent) {
      modalContent.appendChild(newButton);

      // Add a new button to show the table
      const showTableButton = document.createElement('button');
      showTableButton.textContent = 'Mostrar Tabla';
      showTableButton.classList.add('btn-dispositivo'); // Reuse existing style
      showTableButton.style.position = 'absolute';
      showTableButton.style.top = '77px'; // Position below the SW-01 button
      showTableButton.style.left = '20px';
      showTableButton.style.zIndex = '10';
      showTableButton.id = 'show-table-button'; // Add an ID for easy targeting
      modalContent.appendChild(showTableButton);

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
          ['1', 'Dispositivo A', 'Activo', 'Sala 1'],
          ['2', 'Dispositivo B', 'Inactivo', 'Sala 2'],
          ['3', 'Dispositivo C', 'Activo', 'Sala 1']
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
        modalContent.appendChild(table);
      }

      // Attach click event to the new button
      showTableButton.onclick = createAndDisplayTable;
    }
  };
});