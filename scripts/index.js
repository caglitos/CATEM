document.addEventListener("DOMContentLoaded", () => {
  const accordionHeaders = document.querySelectorAll(".accordion-header");

  accordionHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const currentItem = header.parentElement;
      const isActive = currentItem.classList.contains("active");

      // Cerramos todos
      document.querySelectorAll(".accordion-item").forEach((item) => {
        item.classList.remove("active");
      });

      // Si no estaba activo, lo abrimos
      if (!isActive) {
        currentItem.classList.add("active");
      }
    });
  });
});
