// Función para simular la carga de la página
window.onload = function() {
    let progress = 0;
    const progressText = document.getElementById('progress-text');
    const progressBar = document.getElementById('progress-bar');
    
    // Función que actualiza la barra de progreso
    const updateProgress = () => {
      progress += 10; // Incrementamos el progreso en 10%
      progressText.innerText = `[===> ${progress}%]`; // Actualizamos el texto del porcentaje
      progressBar.style.width = `${progress}%`; // Actualizamos la barra visualmente con el ancho
  
      if (progress < 100) {
        setTimeout(updateProgress, 1000); // Volvemos a llamar a la función cada 1 segundo
      } else {
        // Cuando llega al 100%, mostramos el contenido real y escondemos la pantalla de bienvenida
        setTimeout(function() {
          document.getElementById('splash-screen').style.display = 'none';
          document.getElementById('real-content').style.display = 'block';
        }, 1000); // Espera 1 segundo antes de mostrar el contenido real
      }
    };
  
    // Iniciar la actualización de la barra de progreso
    updateProgress();
  };

// Datos de las imágenes del carrusel
const images = [
    'images/My Name Is Khan (2010) Cine Bollywood.jpg',
    'images/snowfall.jpg',
    'images/wildflower.jpg'
  ];
  
  let currentIndex = 0;
  
  // Obtener los elementos del DOM
  const carouselImages = document.querySelectorAll('.carousel-image');
  
  // Función para actualizar el carrusel y mostrar solo una imagen
  const updateCarousel = () => {
    // Ocultar todas las imágenes
    carouselImages.forEach((img) => {
      img.style.display = 'none';  // Ocultar todas las imágenes
    });
  
    // Mostrar solo la imagen actual
    carouselImages[currentIndex].style.display = 'block'; // Mostrar la imagen actual
  };
  
  // Botón para ir a la imagen anterior
  document.getElementById('prev-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === 0) ? images.length - 1 : currentIndex - 1;
    updateCarousel();
  });
  
  // Botón para ir a la imagen siguiente
  document.getElementById('next-btn').addEventListener('click', () => {
    currentIndex = (currentIndex === images.length - 1) ? 0 : currentIndex + 1;
    updateCarousel();
  });
  
  // Inicializamos el carrusel con la primera imagen visible
  updateCarousel();
  