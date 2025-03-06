// Lista de colores que usa el juego
var buttonColours = ["red", "blue", "green", "yellow"];

// Aquí guardamos lo que el juego elige y lo que el jugador elige
var gamePattern = [];
var userClickedPattern = [];

// Para saber si el juego ya empezó
var started = false;
var level = 0;

// Cuando presionas una tecla, el juego empieza
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Nivel " + level); // Cambia el título
    nextSequence(); // Empieza la secuencia
    started = true; // El juego ya empezó
  }
});

// Cuando haces clic en un botón
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // Obtiene el color del botón
  userClickedPattern.push(userChosenColour); // Guarda lo que eligió el jugador

  playSound(userChosenColour); // Reproduce un sonido
  animatePress(userChosenColour); // Anima el botón

  checkAnswer(userClickedPattern.length - 1); // Revisa si la respuesta es correcta
});

// Revisa si lo que eligió el jugador es correcto
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence(); // Siguiente nivel
      }, 1000);
    }
  } else {
    playSound("wrong"); // Sonido de error
    $("body").addClass("game-over"); // Fondo rojo
    $("#level-title").text("¡Game Over! Toca cualquier tecla para reiniciar");

    setTimeout(function() {
      $("body").removeClass("game-over"); // Quita el fondo rojo
    }, 200);

    startOver(); // Reinicia el juego
  }
}

// Crea la siguiente secuencia del juego
function nextSequence() {
  userClickedPattern = []; // Reinicia lo que eligió el jugador
  level++; // Sube de nivel
  $("#level-title").text("Nivel " + level); // Actualiza el título

  var randomNumber = Math.floor(Math.random() * 4); // Número aleatorio
  var randomChosenColour = buttonColours[randomNumber]; // Elige un color
  gamePattern.push(randomChosenColour); // Guarda el color en la secuencia

  // Anima el botón elegido
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour); // Reproduce un sonido
}

// Anima el botón cuando se presiona
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed"); // Añade una clase
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed"); // Quita la clase
  }, 100);
}

// Reproduce un sonido
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3"); // Busca el sonido
  audio.play(); // Reproduce el sonido
}

// Reinicia el juego
function startOver() {
  level = 0; // Reinicia el nivel
  gamePattern = []; // Reinicia la secuencia
  started = false; // El juego no ha empezado
}