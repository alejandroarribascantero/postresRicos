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
    if (evento.clientY <= 25) {
        barraNavegacion.style.top = '0';
    }
});
