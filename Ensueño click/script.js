// Elementos principales
const links = document.querySelectorAll("nav a, .btn");
const secciones = document.querySelectorAll(".seccion");
const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

let carrito = [];
let total = 0;

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  total += precio;
  actualizarCarrito();
}

function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const contador = document.getElementById("contador-carrito");
  const totalTexto = document.getElementById("total");

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
  document.getElementById("carrito-panel").classList.toggle("abierto");
}

function vaciarCarrito() {
  carrito = [];
  total = 0;
  actualizarCarrito();

}


