/**
 * Форматирование даты
 * @returns {Array}
 */
export default function datesFormat(date) {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  }

  return new Date(date).toLocaleString('ru-RU', options);
}
