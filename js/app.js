
const formulario = document.querySelector('#enviar-mail');
const inputEmail = formulario.querySelector('#email');
const inputAsunto = formulario.querySelector('#asunto');
const textMensaje = formulario.querySelector('#mensaje');
const btnEnviar = document.querySelector('#enviar');
const btnReset = formulario.querySelector('#resetBtn');
const cargador = document.querySelector('#cargador');
const inputCopia = formulario.querySelector('#copia');

const MENSAJES_ERROR = {
  EMAIL: 'Introduce un email correcto [Ejemplo: email@email.com]',
  ASUNTO: 'Introduce un asunto',
  MENSAJE: 'Introduce un mensaje'
}

const datos = {
  email: '',
  asunto: '',
  mensaje: ''
}

inputEmail.addEventListener('blur', (e) => {
  validarEmail(e.target.value) ? validar(e.target.parentElement, e) : mensajeError(MENSAJES_ERROR.EMAIL, e.target.parentElement, e.target.value, e);
});

inputCopia.addEventListener('blur', (e) => {
  /* validacion con el campo vacio */
  if (e.target.value === '') {
    validar(e.target.parentElement, e);
  } else {
    /* Si el campo esta relleno, entra la validacion del email */
    if (validarEmail(e.target.value)) {
      validar(e.target.parentElement, e);
    } else {
      mensajeError(MENSAJES_ERROR.EMAIL, e.target.parentElement, e.target.value, e);
    }
  }
});

inputAsunto.addEventListener('blur', (e) => {
  e.target.value === '' ? mensajeError(MENSAJES_ERROR.EMAIL, e.target.parentElement, e.target.value, e) : validar(e.target.parentElement, e);
});

textMensaje.addEventListener('blur', (e) => {
  e.target.value === '' ? mensajeError(MENSAJES_ERROR.EMAIL, e.target.parentElement, e.target.value, e) : validar(e.target.parentElement, e);
});

/* resetea el formulario */
btnReset.addEventListener('click', () => formulario.reset());

/**
 * Valida que los campos no esten vacios
 * Si el campo valorMensaje esta vacio, cambia el mensaje
 * @param {String} mensaje mensaje de error
 * @param {Ref} referencia elemento html al que hace referencia
 * @param {String} valorMensaje valor del campo email
 * @param {Event} e evento de los campos
 */
const mensajeError = (mensaje, referencia, valorMensaje, e) => {
  const mensajeAlerta = referencia.querySelector('.mensajeAlerta');
  datos[e.target.name] = e.target.value;
  if (mensajeAlerta) mensajeAlerta.remove();

  if (valorMensaje === '') {
    mensaje = `El campo ${e.target.id} es obligatorio`;
  }

  activarBotonEnviar();

  const elementoHTML = document.createElement('p');
  elementoHTML.classList.add('bg-red-600', 'text-white', 'p-2', 'mensajeAlerta', 'margen-form');
  elementoHTML.textContent = mensaje;
  referencia.appendChild(elementoHTML);
}

/**
 * Elimina el mensaje de alerta, si el campo está relleno
 * @param {Ref} referencia Elemento html al que hace referencia
 * @param {Event} e evento de los campos
 */
const validar = (referencia, e) => {
  const mensajeAlerta = referencia.querySelector('.mensajeAlerta');
  if (mensajeAlerta) mensajeAlerta.remove();
  datos[e.target.name] = e.target.value;
  activarBotonEnviar();
}

/**
 * Valida con una expresion regular si el campo email es correcto
 * @param {String} mail valor del campo email
 * @returns true si se cumple la expresion / false si no se cumple
 */
const validarEmail = (mail) => {
  const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  return regex.test(mail);
}

/**
 * Activa o desactiva el boton enviar
 * si todos los campos estan rellenos correctamente, lo activa
 * si algun campo es incorrecto, lo desactiva
 */
const activarBotonEnviar = () => {
  delete datos.copia;
  if (Object.values(datos).includes('')) {
    btnEnviar.disabled = true;
    btnEnviar.classList.add('opacity-50');
  } else {
    btnEnviar.disabled = false;
    btnEnviar.classList.remove('opacity-50');
  }
}

/**
 *
 * @param {Event} e evento de los campos
 */
const enviarEmail = (e) => {
  alert('enviar');
  e.preventDefault();
  cargador.classList.remove('hidden');
  cargador.classList.add('flex');
  setTimeout(() => {
    cargador.classList.add('hidden');
    cargador.classList.remove('flex');
    formulario.reset();
    const mensajeEnviado = document.createElement('p');
    mensajeEnviado.classList.add('bg-green-500', 'text-white', 'p-2', 'text-center', 'rounded-lg', 'mt-10', 'font-bold', 'text-sm', 'uppercase');
    mensajeEnviado.textContent = 'Gracias por enviar tus datos';
    formulario.appendChild(mensajeEnviado);

    setTimeout(() => {
      mensajeEnviado.remove();
    }, 2000);
  }, 2000);
  formulario.submit();
}
btnEnviar.addEventListener('click', enviarEmail);
