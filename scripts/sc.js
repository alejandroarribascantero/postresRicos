const barraNavegacion = document.querySelector('nav');
let tiempoDesplazamiento = null;
let ultimoScrollY = window.scrollY;

window.addEventListener('scroll', function () {
    barraNavegacion.style.top = '0';

    // Añadir la clase scrolled para cambiar colores al desplazarse por la pagina
    if (window.scrollY > 50) {
        barraNavegacion.classList.add('scrolled');
    } else {
        barraNavegacion.classList.remove('scrolled');
    }

    clearTimeout(tiempoDesplazamiento);

    // Ocultar el menu en pantallas grandes
    if (window.innerWidth > 1024) {
        tiempoDesplazamiento = setTimeout(() => {
            if (window.scrollY !== 0) {
                barraNavegacion.style.top = '-100px';
            }
        }, 2000);
    }

    ultimoScrollY = window.scrollY;
});

// Desplegar el menu si el mouse se mueve hacia la parte superior de la ventana
window.addEventListener('mousemove', function (evento) {
    if (evento.clientY <= 35) {
        barraNavegacion.style.top = '0';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    function updateMagicLine() {
        const currentItem = document.querySelector('.current-menu-item');
        if (!currentItem) return; // Si no hay elemento actual, salimos de la función

        const menuItems = document.querySelectorAll('.menu-item');
        const thisNav = currentItem.offsetLeft;
        const wee = currentItem.querySelector('.wee');
        if (!wee) return; // Si no hay elemento .wee, salimos de la función

        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function () {
                const left = this.offsetLeft - thisNav;
                const width = this.offsetWidth;
                wee.style.left = `${left}px`;
                wee.style.width = `${width}px`;
            });

            item.addEventListener('mouseleave', function () {
                const initWidth = currentItem.offsetWidth;
                wee.style.left = '0';
                wee.style.width = `${initWidth}px`;
            });
        });
    }

    window.addEventListener('load', updateMagicLine);
    window.addEventListener('resize', updateMagicLine);

    
});

document.addEventListener('DOMContentLoaded', function () {
    fetch('../imagenes.json')
    .then(response => response.json())
    .then(data => {
        const container = document.getElementById('galeria');
        if (!container) {
            console.error('Error: galeria-container not found');
            return;
        }
        data.forEach(image => {
            const div = document.createElement('div');
            div.className = `col-md-3 col-6 ${image.class} visible`;
            div.innerHTML = `<img src="${image.src}" alt="${image.alt}" class="img-fluid">`;
            container.appendChild(div);
        });
    })
    .catch(error => console.error('Error loading JSON:', error));
});


// Galeria
function filtrarGaleria(categoria) {
    // Cambiar el estado del botón activo
    const botones = document.querySelectorAll('.boton-categoria');
    botones.forEach(boton => boton.classList.remove('activo'));
    event.target.classList.add('activo');

    // Aplicar la lógica de filtrado con efecto
    const elementos = document.querySelectorAll('.galeria .col-md-3');
    elementos.forEach(elemento => {
        elemento.classList.remove('visible'); // Oculta con efecto
        setTimeout(() => {
            if (categoria === 'todas' || elemento.classList.contains(categoria)) {
                elemento.style.display = 'block';
                setTimeout(() => elemento.classList.add('visible'), 50); // Muestra con efecto
            } else {
                elemento.style.display = 'none';
            }
        }, 500); // Tiempo del desvanecimiento
    });
}

let currentImageIndex = 0;
const images = document.querySelectorAll('.galeria img');

images.forEach((img, index) => {
    img.addEventListener('click', () => {
        openLightbox(index);
    });
});

function openLightbox(index) {
    currentImageIndex = index;
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    lightbox.style.display = 'block';
    lightboxImg.src = images[currentImageIndex].src;

    // Añadir evento para cerrar el lightbox al hacer clic fuera de la imagen
    lightbox.addEventListener('click', function (event) {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}

function changeImage(direction) {
    currentImageIndex += direction;
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }
    document.getElementById('lightbox-img').src = images[currentImageIndex].src;
}

