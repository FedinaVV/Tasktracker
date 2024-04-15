/**
 * Модель задачи
 */
export interface Task {
  id?: string,
  title?: string,
  name?: string,
  deadline: Date,
  priority?: string,
  status?: string,
  employee?: string
}
