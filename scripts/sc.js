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

document.addEventListener('DOMContentLoaded', function() {
    function updateMagicLine() {
        const currentItem = document.querySelector('.current-menu-item');
        if (!currentItem) return; // Si no hay elemento actual, salimos de la función
        
        const menuItems = document.querySelectorAll('.menu-item');
        const thisNav = currentItem.offsetLeft;
        const wee = currentItem.querySelector('.wee');
        if (!wee) return; // Si no hay elemento .wee, salimos de la función

        menuItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                const left = this.offsetLeft - thisNav;
                const width = this.offsetWidth;
                wee.style.left = `${left}px`;
                wee.style.width = `${width}px`;
            });

            item.addEventListener('mouseleave', function() {
                const initWidth = currentItem.offsetWidth;
                wee.style.left = '0';
                wee.style.width = `${initWidth}px`;
            });
        });
    }

    window.addEventListener('load', updateMagicLine);
    window.addEventListener('resize', updateMagicLine);

    var elem = document.querySelector('.carousel');
    var flkty = new Flickity(elem, {
        // Opciones de Flickity
        cellAlign: 'left',
        contain: true,
        autoPlay: true,
        wrapAround: true
    });
});
