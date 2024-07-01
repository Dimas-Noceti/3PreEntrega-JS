document.addEventListener("DOMContentLoaded", () => {
    if(localStorage.getItem("carritoGuardado")) {
        cargarCarrito();
    }
})










const mostrarProductos = () => {
    const divCards = document.querySelector(".divCardsRow");
    divCards.innerHTML = "";

    productos.forEach(producto => {
        const div = document.createElement("div");
        div.className = ("card col-md-4")

        div.innerHTML = `
            <img src="${producto.img}" class="card-img-top fotosCards" >
            <div class="card-body textoCards">
                <h4 class="card-title">${producto.nombre}</h4>
                <h5 class="card-title">$${producto.precio}</h5>
                <p class="card-text">${producto.descripcion}</p>
                <a href="#" class="btn btn-primary agregarAlCarritoBoton" id="${producto.id}">Agregar al carrito</a>
            </div>
        `
        divCards.appendChild(div)
    });
    botonAgregarProductos()
}
mostrarProductos();


const carritoContador = document.querySelector(".carritoContador");
const containerProductos = document.querySelector(".divCardsRow");
const carritoLogo = document.querySelector(".carrito");
const divCarrito = document.querySelector(".divCarrito");



let carrito = [];
let productoLocal = localStorage.getItem("carritoGuardado")

if (productoLocal) {
    carrito = JSON.parse(productoLocal);
}


function botonAgregarProductos() {
    const agregarAlCarritoBoton = document.querySelectorAll(".agregarAlCarritoBoton");
    agregarAlCarritoBoton.forEach(boton => {
        boton.addEventListener("click", (agregarAlCarrito));
    });
}




function agregarAlCarrito(e) {
    if (e.target.className.contains = "agregarAlCarritoBoton") {
        Toastify({
            text: "Producto agregado al carrito",
            duration: 2000,
            gravity: "bottom"

        }).showToast();
    }

    const productosCarrito = productos.find(producto => producto.id == e.currentTarget.id);
    if (carrito.some(producto => producto.id == e.currentTarget.id)) {
        const index = carrito.findIndex(producto => producto.id == e.target.id)
        carrito[index].cantidad++
    }

    else{
        productosCarrito.cantidad = 1;
        carrito.push(productosCarrito)
    }


    localStorage.setItem("carritoGuardado", JSON.stringify(carrito));
    cargarCarrito();
}






function cargarCarrito() {
    const carritoAlmacenado = JSON.parse(localStorage.getItem("carritoGuardado"));
    if(carritoAlmacenado.length > 0) {
        divCarrito.innerHTML = "";

        carritoAlmacenado.forEach(producto => {
            const divProductos = document.createElement("div");
            let precioTotal = producto.precio * producto.cantidad
            divProductos.className = "divProductos d-flex";
            divProductos.innerHTML = `
        <div class="divProductos d-flex">
            <img src="${producto.img}" width="20%">
            <div>
                <p class="fs-4">${producto.nombre}</p>
                <p class="fs-6">$ ${precioTotal}</p>
            </div>
            <div  class="divInternoProductos">
                <button class="botones"><span class="masYMenos">+</span></button>
                <p><span>Cantidad </span> <span class="contadorDeProductos">${producto.cantidad}</span></p>
                <button class="botones"><span class="masYMenos">-</span></button>
            </div>
            <button class="botonEliminar">Eliminar</button>
        </div>
        `
            divCarrito.appendChild(divProductos);
        })
    }
    else {
        divCarrito.innerHTML = "";
        const nadaPorAqui = document.createElement("h2");
        nadaPorAqui.innerHTML = "No hay nada que ver aqui..";
        divCarrito.appendChild(nadaPorAqui)
    }
}







document.addEventListener("click", (e) => {
    if (e.target.classList.contains("carrito") || e.target.classList.contains("divCarrito")) {
        divCarrito.style.display = "block";
    }
    else {
        divCarrito.style.display = "none";
    }
})





