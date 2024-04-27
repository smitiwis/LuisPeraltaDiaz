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
  },
  description: {
    required: 'Este campo es requerido.',
  },
  logo: {
    required: 'Este campo es requerido.',
    pattern: 'El campo debe ser una URL válida.',
  },
  date_release: {
    required: 'Este campo es requerido.',
  },
  date_revision: {
    required: 'Este campo es requerido.',
  },
};