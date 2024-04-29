interface ErrorMessages {
  [key: string]: {
    [key: string]: string;
  };
}
export const ERROR_MESSAGES: ErrorMessages = {
  id: {
    required: 'Este campo es requerido.',
    pattern: 'ID no válido. Ejemplo: xxxx-lp',
  },
  name: {
    required: 'Este campo es requerido.',
    minlength: 'El campo debe tener al menos 5 caracteres.',
    maxlength: 'El campo debe tener como máximo 100 caracteres.',
  },
  description: {
    required: 'Este campo es requerido.',
    minlength: 'El campo debe tener al menos 10 caracteres.',
    maxlength: 'El campo debe tener como máximo 200 caracteres.',
  },
  logo: {
    required: 'Este campo es requerido.',
    pattern: 'El campo debe ser una URL válida.',
  },
  date_release: {
    required: 'Este campo es requerido.',
    invalidDate: 'Debes elegir una fecha mayor o igual a la fecha actual.',
  },
  date_revision: {
    required: 'Este campo es requerido.',
    invalidDate: 'Debes elegir una fecha un año posterior la fecha de liberación.',
  },
};