
document.addEventListener('DOMContentLoaded', function() {
  const btnToggle = document.getElementById('btn-toggle');
  const rackContainer = document.getElementById('rack-container');

  // Modal elements
  const modal = document.getElementById("image-modal");
  const btnOpenModal = document.getElementById("open-modal-btn");
  const spanClose = document.getElementsByClassName("close-button")[0];

  // Toggle rack visibility
  btnToggle.addEventListener('click', () => {
    rackContainer.classList.toggle('oculto');
    btnToggle.textContent = rackContainer.classList.contains('oculto') ? 'Ver Esquema' : 'Ocultar Esquema';
  });

  // Open the modal
  btnOpenModal.onclick = function() {
    modal.style.display = "block";
  }

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
});
