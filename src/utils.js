/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

/**
 * Получение массива чисел, для отображения номеров страниц
 * @param page {Number}
 * @param lastPage {Number}
 * @returns {Array}
 */
export function getPaginationList(page, lastPage) {
  const paginationList = [];

  if (lastPage <= 5) {
    for (let i = 1; i <= lastPage; i++) {
      paginationList.push(i);
    }
  } else if (page - 1 === 0) {
    paginationList.push(page, page + 1, page + 2);
  } else if (page === lastPage) {
    paginationList.push(page - 2, page - 1, page);
  } else {
    paginationList.push(page - 1, page, page + 1);
  }

  return paginationList;
}
