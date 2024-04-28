export const formatDateHelper = (dateString: string): string => {
  const dateRelease = new Date(dateString);
  return dateRelease.toISOString().substring(0, 10);
};

export const clearWord = (palabra: string): string => {
  // Reemplazar letras acentuadas con sus equivalentes sin acento
  const limpio = palabra.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  return limpio;
};
