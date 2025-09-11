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
});