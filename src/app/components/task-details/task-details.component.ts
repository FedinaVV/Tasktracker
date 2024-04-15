import {Component} from '@angular/core';
import {TasksService} from "../../services/tasks.service";
import {Task} from "../../interfaces/task";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import { v4 as uuid } from 'uuid';
import {TaskStatuses} from "../../enums/task-statuses";

/**
 * Компонент для создания/редактирования задачи
 */
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent {

  /**
   * Текуща задача для редактирования
   */
  task: BehaviorSubject<Task> = this.taskService.task;

  /**
   * Возможные статусы задач
   */
  taskStatuses = TaskStatuses;

  constructor(private taskService: TasksService,
              private activateRoute: ActivatedRoute,
              private router: Router){
  }

  ngOnInit() {
    const id = this.activateRoute.snapshot.params["id"];
    if (this.task.getValue().id == null) {
      this.taskService.getTask(id).subscribe({
        next: task => this.taskService.task.next(task),
        error: () => alert("Ошибка при загрузке задачи")
      });
    }
  }

  /**
   * Если id не определён, то создаёт,
   * иначе обновляет задачу.
   */
  saveTask() {
    if (this.task.getValue().id == null || this.task.getValue().id == "-1") {
      const id: string = uuid();
      this.task.getValue().id = id;
      this.taskService.createTask(this.task.getValue()).subscribe({
        next: () => alert("Задача создана"),
        error: () => alert("Ошибка при создании задачи")
      });
    } else {
      this.taskService.updateTask(this.task.getValue()).subscribe({
        next: task => alert("Изменения сохранены"),
        error: err => alert("Ошибка при редактировании")
      });
    }
  }

  /**
   * Удаляет задачу
   */
  deleteTask() {
    this.taskService.deleteTask(this.task.getValue().id).subscribe({
      next: () => {
        this.taskService.generateEmptyTask();
        alert("Задача удалена");
        this.router.navigate(['/tasks'])
      },
      error: () => alert("Ошибка при удалении")
    });
  }
}
