// Variables globales
const barraNavegacion = document.querySelector('nav');
let tiempoDesplazamiento = null;
let ultimoScrollY = window.scrollY;
let imagenes = [];

// Funciones
function manejarScroll() {
    barraNavegacion.style.top = '0';

    if (window.scrollY > 50) {
        barraNavegacion.classList.add('scrolled');
    } else {
        barraNavegacion.classList.remove('scrolled');
    }

    clearTimeout(tiempoDesplazamiento);

    if (window.innerWidth > 1024) {
        tiempoDesplazamiento = setTimeout(() => {
            if (window.scrollY !== 0) {
                barraNavegacion.style.top = '-100px';
            }
        }, 2000);
    }

    ultimoScrollY = window.scrollY;
}

function manejarMouseMove(evento) {
    if (evento.clientY <= 35) {
        barraNavegacion.style.top = '0';
    }
}

function actualizarLineaMagica() {
    const elementoActual = document.querySelector('.currentMenuItem');
    if (!elementoActual) return;

    const elementosMenu = document.querySelectorAll('.menuItem');
    const thisNav = elementoActual.offsetLeft;
    const wee = elementoActual.querySelector('.wee');
    if (!wee) return;

    elementosMenu.forEach(item => {
        item.addEventListener('mouseenter', function () {
            const left = this.offsetLeft - thisNav;
            const width = this.offsetWidth;
            wee.style.left = `${left}px`;
            wee.style.width = `${width}px`;
        });

        item.addEventListener('mouseleave', function () {
            const initWidth = elementoActual.offsetWidth;
            wee.style.left = '0';
            wee.style.width = `${initWidth}px`;
        });
    });
}

function cargarImagenes() {
    fetch('../imagenes.json')
        .then(response => response.json())
        .then(data => {
            imagenes = data;
            const contenedor = document.getElementById('galeria');
            if (!contenedor) {
                console.error('Error');
                return;
            }
            data.forEach((imagen, index) => {
                const div = document.createElement('div');
                div.className = `col-md-3 col-6 ${imagen.class} visible`;
                div.innerHTML = `<img src="${imagen.src}" alt="${imagen.alt}" class="img-fluid" data-index="${index}">`;
                contenedor.appendChild(div);
            });

            const elementosImagen = document.querySelectorAll('.galeria img');
            elementosImagen.forEach((img) => {
                img.addEventListener('click', (event) => {
                    const index = parseInt(event.target.getAttribute('data-index'));
                    abrirLightbox(index);
                });
            });
        })
        .catch(error => console.error('Error al cargar JSON:', error));
}

function filtrarGaleria(categoria) {
    const botones = document.querySelectorAll('.botonCategoria');
    botones.forEach(boton => boton.classList.remove('activo'));
    event.target.classList.add('activo');

    const elementos = document.querySelectorAll('.galeria .col-md-3');
    elementos.forEach(elemento => {
        elemento.classList.remove('visible');
        setTimeout(() => {
            if (categoria === 'todas' || elemento.classList.contains(categoria)) {
                elemento.style.display = 'block';
                setTimeout(() => elemento.classList.add('visible'), 50);
            } else {
                elemento.style.display = 'none';
            }
        }, 500);
    });
}

function abrirLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'block';
    lightboxImg.src = imagenes[currentImageIndex].src;

    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            cerrarLightbox();
        }
    });
}

function cerrarLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function cambiarImagen(direccion) {
    currentImageIndex += direccion;
    if (currentImageIndex < 0) {
        currentImageIndex = imagenes.length - 1;
    } else if (currentImageIndex >= imagenes.length) {
        currentImageIndex = 0;
    }
    document.getElementById('lightbox-img').src = imagenes[currentImageIndex].src;
}

// Inicialización
document.addEventListener('DOMContentLoaded', function () {
    window.addEventListener('scroll', manejarScroll);
    window.addEventListener('mousemove', manejarMouseMove);
    window.addEventListener('load', actualizarLineaMagica);
    window.addEventListener('resize', actualizarLineaMagica);
    cargarImagenes();
});
