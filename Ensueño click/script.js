// Elementos principales
const links = document.querySelectorAll("nav a, .btn");
const secciones = document.querySelectorAll(".seccion");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

// Carrito de compras
let carrito = [];

// Navegación entre secciones
links.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const sectionId = link.getAttribute("data-section");
    if (sectionId) {
      secciones.forEach(sec => sec.classList.add("oculto"));
      document.getElementById(sectionId).classList.remove("oculto");
    }
  });
});

// Agregar producto al carrito
document.querySelectorAll(".add-to-cart").forEach(btn => {
  btn.addEventListener("click", () => {
    const id = btn.dataset.id;
    const nombre = btn.dataset.nombre;
    const precio = parseInt(btn.dataset.precio);

    const productoExistente = carrito.find(item => item.id === id);

    if (productoExistente) {
      productoExistente.cantidad++;
    } else {
      carrito.push({ id, nombre, precio, cantidad: 1 });
    }

    actualizarCarrito();
  });
});

// Eliminar producto del carrito
function eliminarProducto(id) {
  carrito = carrito.filter(item => item.id !== id);
  actualizarCarrito();
}

// Actualizar vista del carrito
function actualizarCarrito() {
  // Vaciar el contenedor
  cartItems.innerHTML = "";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    cantidadTotal += item.cantidad;

    const div = document.createElement("div");
    div.innerHTML = `
      <strong>${item.nombre}</strong><br>
      Cantidad: ${item.cantidad} | Precio: $${item.precio} | Subtotal: $${subtotal}
      <button class="btn-remove" data-id="${item.id}">❌</button>
    `;
    cartItems.appendChild(div);
  });

  cartTotal.textContent = total;
  cartCount.textContent = cantidadTotal;

  // Asignar evento a los botones de eliminar
  document.querySelectorAll(".btn-remove").forEach(btn => {
    btn.addEventListener("click", () => {
      eliminarProducto(btn.dataset.id);
    });
  });
}

