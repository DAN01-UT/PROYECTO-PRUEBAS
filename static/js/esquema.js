document.addEventListener('DOMContentLoaded', function() {
  const btnToggle = document.getElementById('btn-toggle');
  const rackContainer = document.getElementById('rack-container');

  // Modal elements
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");
  const lateralButtons = document.querySelectorAll(".btn-lateral"); // Select all lateral buttons
  const spanClose = document.getElementsByClassName("close-button")[0];

  // Toggle rack visibility
  btnToggle.addEventListener('click', () => {
    rackContainer.classList.toggle('oculto');
    btnToggle.textContent = rackContainer.classList.contains('oculto') ? 'Ver Esquema' : 'Ocultar Esquema';
  });

  // Open the modal for all lateral buttons
  lateralButtons.forEach(button => {
    button.onclick = function() {
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

  // Close the modal by clicking outside of it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  // --- Código para hacer los botones arrastrables individualmente ---
  const buttons = document.querySelectorAll('.btn-lateral');

  // 1. Crear el display para las coordenadas
  const coordsDisplay = document.createElement('div');
  coordsDisplay.id = 'coords-display';
  coordsDisplay.innerHTML = 'Arrastra cada botón a su lugar.<br>Copia el ID y las coordenadas de cada uno.';
  coordsDisplay.style.position = 'fixed';
  coordsDisplay.style.top = '10px';
  coordsDisplay.style.right = '10px';
  coordsDisplay.style.backgroundColor = 'rgba(0,0,0,0.8)';
  coordsDisplay.style.color = 'white';
  coordsDisplay.style.padding = '15px';
  coordsDisplay.style.borderRadius = '8px';
  coordsDisplay.style.fontFamily = 'monospace';
  coordsDisplay.style.fontSize = '12px';
  coordsDisplay.style.zIndex = '1002';
  coordsDisplay.style.textAlign = 'center';
  document.body.appendChild(coordsDisplay);

  const coordsId = document.createElement('p');
  coordsId.style.fontWeight = 'bold';
  coordsId.style.fontSize = '14px';
  coordsId.style.margin = '0 0 5px 0';
  coordsDisplay.appendChild(coordsId);

  const coordsValues = document.createElement('p');
  coordsValues.style.margin = '0';
  coordsValues.style.fontSize = '14px';
  coordsDisplay.appendChild(coordsValues);

  function updateCoordsDisplay(id, top, left) {
    coordsId.textContent = id;
    coordsValues.textContent = `top: ${top}px; left: ${left}px;`;
  }

  let activeDrag = null;
  let offsetX, offsetY;

  buttons.forEach((button, index) => {
    // Posición inicial escalonada para que no se solapen
    // button.style.top = `${20 + index * 65}px`;
    // button.style.left = `20px`;
    button.style.cursor = 'move';

    button.addEventListener('mousedown', (e) => {
      // Prevenir el click normal del botón al arrastrar
      e.preventDefault();
      activeDrag = button;
      
      const rect = button.getBoundingClientRect();
      const parentRect = rackContainer.getBoundingClientRect();

      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      // Mostrar coordenadas al hacer click
      updateCoordsDisplay(button.id, Math.round(button.offsetTop), Math.round(button.offsetLeft));
    });
  });

  document.addEventListener('mousemove', (e) => {
    if (!activeDrag) return;
    e.preventDefault();

    const parentRect = rackContainer.getBoundingClientRect();
    let newLeft = e.clientX - parentRect.left - offsetX;
    let newTop = e.clientY - parentRect.top - offsetY;

    // Límites del contenedor
    if (newLeft < 0) newLeft = 0;
    if (newTop < 0) newTop = 0;
    if (newLeft + activeDrag.offsetWidth > rackContainer.offsetWidth) {
      newLeft = rackContainer.offsetWidth - activeDrag.offsetWidth;
    }
    if (newTop + activeDrag.offsetHeight > rackContainer.offsetHeight) {
      newTop = rackContainer.offsetHeight - activeDrag.offsetHeight;
    }

    activeDrag.style.left = `${newLeft}px`;
    activeDrag.style.top = `${newTop}px`;

    updateCoordsDisplay(activeDrag.id, Math.round(newTop), Math.round(newLeft));
  });

  document.addEventListener('mouseup', () => {
    if (activeDrag) {
      const finalTop = Math.round(activeDrag.offsetTop);
      const finalLeft = Math.round(activeDrag.offsetLeft);
      console.log(`'#'${activeDrag.id}: { top: '${finalTop}px', left: '${finalLeft}px' },`);
    }
    activeDrag = null;
  });

  // --- Fin del código para arrastrar ---
});