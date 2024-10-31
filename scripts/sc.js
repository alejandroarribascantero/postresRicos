const navbar = document.querySelector('nav');
let scrollTimeout = null; // Almacena el temporizador de inactividad
let lastScrollY = window.scrollY; // Almacena la última posición de scroll

window.addEventListener('scroll', function () {
    // Mostrar el navbar cuando el usuario comienza a hacer scroll
    navbar.style.top = '0';

    // Cambiar el color del navbar al hacer scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Limpiar el temporizador anterior
    clearTimeout(scrollTimeout);

    // Ocultar el navbar después de 2 segundos de inactividad, excepto si está en la parte superior de la página
    // y no en dispositivos móviles
    if (window.innerWidth > 1024) { // Solo aplica en pantallas más grandes
        scrollTimeout = setTimeout(() => {
            if (window.scrollY !== 0) {
                navbar.style.top = '-100px'; // Oculta el navbar (ajusta el valor según tu diseño)
            }
        }, 2000);
    }

    // Actualizar la última posición de scroll
    lastScrollY = window.scrollY;
});

// Mostrar el navbar al pasar el ratón por la parte superior de la ventana
window.addEventListener('mousemove', function (event) {
    if (event.clientY <= 25) { // Si el mouse está en los primeros 50px de la ventana
        navbar.style.top = '0';
    }
});