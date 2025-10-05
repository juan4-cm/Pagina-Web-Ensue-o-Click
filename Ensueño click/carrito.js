let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
let total = carrito.reduce((acc, item) => acc + item.precio, 0);

// ✅ Cargar carrito al iniciar
document.addEventListener("DOMContentLoaded", () => {
  actualizarCarrito();
});

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  guardarCarrito();
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const contador = document.getElementById("contador-carrito");
  const totalTexto = document.getElementById("total");

  if (!lista || !contador || !totalTexto) return; // Si no está el carrito en esa página, evitar error

  lista.innerHTML = "";
  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.nombre} - $${item.precio.toLocaleString()}`;
    lista.appendChild(li);
  });

  contador.textContent = carrito.length;
  totalTexto.textContent = `Total: $${total.toLocaleString()}`;
}

function toggleCarrito() {
  const panel = document.getElementById("carrito-panel");
  if (panel) {
    panel.classList.toggle("abierto");
  }
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  guardarCarrito();
  actualizarCarrito();
}

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  // Crear el mensaje con los productos
  let mensaje = "🛍️ *Pedido desde Ensueño Click*%0A%0A";
  carrito.forEach((item, index) => {
    mensaje += `${index + 1}. ${item.nombre} - $${item.precio.toLocaleString()}%0A`;
  });
  mensaje += `%0A💰 Total: $${total.toLocaleString()}%0A%0A📍 Por favor confirma tu dirección de envío.`;

  // Reemplaza el número con tu WhatsApp (ej: +57 Colombia)
  let telefono = "573012809820"; 

  // Abrir WhatsApp con el mensaje
  window.open(`https://wa.me/${telefono}?text=${mensaje}`, "_blank");
}

