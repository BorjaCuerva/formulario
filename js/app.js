
const formulario = document.querySelector('#enviar-mail');
const inputEmail = formulario.querySelector('#email');
const inputAsunto = formulario.querySelector('#asunto');
const textMensaje = formulario.querySelector('#mensaje');
const btnEnviar = formulario.querySelector('#enviar');
const btnReset = formulario.querySelector('#resetBtn');

const MENSAJES_ERROR = {
  EMAIL: 'Introduce un email',
  ASUNTO: 'Introduce un asunto',
  MENSAJE: 'Introduce un mensaje'
}

inputEmail.addEventListener('input', (e) => {
  mensajeError(MENSAJES_ERROR.EMAIL, e);
});

inputAsunto.addEventListener('input', (e) => {
  mensajeError(MENSAJES_ERROR.ASUNTO, e);
});

textMensaje.addEventListener('input', (e) => {
  mensajeError(MENSAJES_ERROR.MENSAJE, e);
});

btnReset.addEventListener('click', () => formulario.reset());

/**
 * Validacion de que los campos no esten vacios
 * @param {String} mensaje mensaje de error
 * @param {Event} e evento de los campos
 */
const mensajeError = (mensaje, e) => {
  const elementoHTML = document.createElement('p');
  elementoHTML.classList.add('bg-red-600', 'text-white', 'p-2');
  if (e.target.value === '') {
    elementoHTML.textContent = mensaje;
    formulario.appendChild(elementoHTML);
  } else {
    formulario.removeChild(elementoHTML);
  }
}
