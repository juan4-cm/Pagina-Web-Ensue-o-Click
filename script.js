document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("a[data-section]");
  const sections = document.querySelectorAll(".seccion");
  const cartCount = document.getElementById("cart-count");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  let cart = [];

  // Navegación entre secciones
  links.forEach(link => {
    link.addEventListener("click", e => {
      e.preventDefault();
      const target = link.getAttribute("data-section");
      sections.forEach(sec => {
        sec.classList.toggle("oculto", sec.id !== target);
      });
    });
  });

  // Añadir al carrito
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.id;
      const nombre = button.dataset.nombre;
      const precio = parseInt(button.dataset.precio);

      const existing = cart.find(item => item.id === id);
      if (existing) {
        existing.cantidad++;
      } else {
        cart.push({ id, nombre, precio, cantidad: 1 });
      }
      actualizarCarrito();
    });
  });

  // Actualizar carrito
  function actualizarCarrito() {
    cartItemsContainer.innerHTML = "";
    let total = 0;
    cart.forEach(item => {
      total += item.precio * item.cantidad;
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <span>${item.nombre} (x${item.cantidad}) - $${item.precio * item.cantidad}</span>
        <div>
          <button onclick="cambiarCantidad('${item.id}', -1)">➖</button>
          <button onclick="cambiarCantidad('${item.id}', 1)">➕</button>
          <button onclick="eliminarDelCarrito('${item.id}')">❌</button>
        </div>
      `;
      cartItemsContainer.appendChild(div);
    });
    cartCount.textContent = cart.reduce((acc, item) => acc + item.cantidad, 0);
    cartTotal.textContent = total;
  }

  // Exponer funciones al global
  window.cambiarCantidad = (id, delta) => {
    const item = cart.find(p => p.id === id);
    if (item) {
      item.cantidad += delta;
      if (item.cantidad <= 0) {
        cart = cart.filter(p => p.id !== id);
      }
      actualizarCarrito();
    }
  };

  window.eliminarDelCarrito = (id) => {
    cart = cart.filter(p => p.id !== id);
    actualizarCarrito();
  };
});
