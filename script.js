document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[data-section]");
  const sections = document.querySelectorAll(".seccion");

  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("data-section");
      
      sections.forEach(sec => {
        if (sec.id === target) {
          sec.classList.remove("oculto");
        } else {
          sec.classList.add("oculto");
        }
      });
    });
  });
});
