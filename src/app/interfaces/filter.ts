/**
 * Модель фильтра для сортировок
 */
export interface Filter {
  created: boolean,
  inWork: boolean,
  closed: boolean,
  isEmployeeSortAscending: boolean,
  isDeadlineSortAscending: boolean
}
