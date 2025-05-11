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
  