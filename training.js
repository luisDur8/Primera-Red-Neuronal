/* ¡Hola! Soy luisDur.
Este código lo estoy creando el 14 de marzo de 2022.

Los modelos de Redes Neuronales tiene un valor (estado) de activación, cuyo rango normalmente va de (0 a 1) o de (–1 a 1). 
Esto es así porque, una neurona puede estar totalmente inactiva (0 o –1) o activa (1), por esta razón vamos a dividir los colores rgb entre 255. */

// Inicio de la Red Neuronal.
var network = new brain.NeuralNetwork();

/* Entrenamiento: darle ejemplos, dado cierto color de Fondo (entrada), asignarle cierto color de Texto (salida). */
network.train([

//********** ESENCIALES **********  
  // Fondo negro (entrada = 0) -> texto blanco (salida = 1).
{
  input: {rojo: 0, verde: 0, azul: 0}, output: {color: 1}
},
  // Fondo blanco (entrada = 1) -> texto negro (salida = 0).
{
  input: {rojo: 1, verde: 1, azul: 1}, output: {color: 0}
},

//********** PREFERENCIAS **********/ 
  // Fondo verde -> texto negro.
{
  input: {rojo: 0, verde: 1, azul: 0}, output: {color: 0}
},
  // Fondo azul -> texto blanco.
{
  input: {rojo: 0, verde: 0.5, azul: 1}, output: {color: 1}
},
  // Fondo rojo -> texto blanco.
{
  input: {rojo: 1, verde: 0, azul: 0}, output: {color: 1}
},
]);

function update(color) {
  /* Esta opción permite tratar al objeto como si fuera rgb. */
  var rgb = [color.channels.r, color.channels.g, color.channels.b];
  // console.log(rgb);

  var div = document.getElementById("comunidad");
  // Color de fondo.
  div.style.background = color.toHEXString(); 

  /* El color de fondo actual (elegido por el usuario) se toma como entrada, con esa entrada la red neuronal hace su prediccion del mejor color de texto. */
  var entrada = {
    rojo: rgb[0]/255,
    verde: rgb[1]/255,
    azul: rgb[2]/255,
  };

  // Obtención de la prediccion.
  var resultado = network.run(entrada);
  // console.log(resultado);

  // Si el resultado es mayor a 0.5, se considera un texto blanco.
  if (resultado.color > 0.5) {
    div.style.color = "white";
  }  
  else {
    div.style.color = "black";
  }
}