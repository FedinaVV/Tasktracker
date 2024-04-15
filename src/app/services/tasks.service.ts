import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Task} from "../interfaces/task";
import {BehaviorSubject} from "rxjs";

/**
 * Сервис для работы с API задач
 */
@Injectable({
  providedIn: 'root'
})
export class TasksService {

  /**
   * Адрес API
   */
  url: string = 'http://localhost:3000/tasks';

  /**
   * Текущая задача для редактирования
   */
  task: BehaviorSubject<Task> = new BehaviorSubject<Task>(this.generateEmptyTask());

  constructor(private http: HttpClient) {
  }

  /**
   * Возвращает все имеющиеся задачи
   */
  getTasks() {
    return this.http.get<Task[]>(this.url);
  }

  /**
   * Возвращает задачу по айди
   * @param id
   */
  getTask(id: string) {
    return this.http.get<Task>(this.url + "/" + id);
  }

  /**
   * Создаёт новую задачу
   * @param task - новая задача
   */
  createTask(task: Task) {
    return this.http.post(this.url, task);
  }

  /**
   * Обновляет существующую задачу
   * @param task - обновлённая задача
   */
  updateTask(task: Task) {
    return this.http.put(this.url + "/" + task.id, task);
  }

  /**
   * Удаляет задачу
   * @param id - айди задачи
   */
  deleteTask(id: string) {
    return this.http.delete(this.url + "/" + id);
  }

  /**
   * Устанавливает пустую задачу для работы с ней
   */
  setEmptyTask() {
    this.task.next(this.generateEmptyTask());
  }

  /**
   * Возвращает пустую задачу
   */
  generateEmptyTask() {
    return {
      id: "-1",
      title: "",
      name: "",
      deadline: new Date(),
      priority: "",
      status: "",
      performers: ""
    };
  }
}
