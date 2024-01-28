let numeroAleatorio = 0;
let intentos = 1;
let numerosGenerados = [];

generarTextoInicio();
generarNumeroAleatorio();

function generarTextoInicio() {
  generarTexto("h1", "Juego de adivinar numero!");
  generarTexto("p", "Digite un numero entre el 1 y el 10!");
}

function generarNumeroAleatorio() {

    if (numerosGenerados.length === 10) {
        numerosGenerados = [];
    }
  numeroAleatorio = Math.floor(Math.random() * 10) + 1;

  if (numerosGenerados.includes(numeroAleatorio)) {
    return generarNumeroAleatorio();
  }
  numerosGenerados.push(numeroAleatorio);
}

function generarTexto(selector, texto) {
  const elementoDom = document.querySelector(selector);
  elementoDom.innerHTML = texto;
}

function intentoUsuario() {
  console.log(`EL numero aleatorio es ${numeroAleatorio}`);
  console.log(`Numeros generados ${numerosGenerados}`);
  const numeroUsuario = parseInt(document.getElementById("intento").value);

  if (numeroUsuario === numeroAleatorio) {
    generarTexto(
      "p",
      `Felicidades has acertado en ${intentos} ${
        intentos === 1 ? "intento" : "intentos"
      }`
    );
    limpiarInput("#intento");
    document.getElementById('boton_intento').setAttribute('disabled', true);
    deshabilitarBoton("reiniciar");
    return;
  }

  if (verificaIntentosMax()) {
    return;
  }

  limpiarInput("#intento");
  generarTexto(
    "p",
    `${
      numeroUsuario > numeroAleatorio
        ? "Es menor al numero digitado"
        : "Es mayor al numero digitado"
    }`
  );
  intentos++;
}

function reiniciarJuego() {
  document.getElementById("reiniciar").setAttribute("disabled", true);
  generarTextoInicio();
  generarNumeroAleatorio();
  deshabilitarBoton('boton_intento');
  limpiarInput("#intento");
  intentos = 1;
}

function limpiarInput(selector) {
  const elementoDom = document.querySelector(selector);
  elementoDom.value = "";
}

function deshabilitarBoton(selectorId) {
  document.getElementById(selectorId).removeAttribute("disabled");
}

function verificaIntentosMax() {
  if (intentos === 10) {
    generarTexto("p", "Perdiste has excedido la cantidad de intentos");
    limpiarInput("#intento");
    document.getElementById("reiniciar").setAttribute("disabled", true);
    deshabilitarBoton("reiniciar");
    return true;
  }
  return false;
}
