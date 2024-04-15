import {Component, OnInit} from '@angular/core';
import {Task} from "../../interfaces/task";
import {BehaviorSubject, Subscription} from "rxjs";
import {TasksService} from "../../services/tasks.service";
import {Filter} from "../../interfaces/filter";
import {TaskStatuses} from "../../enums/task-statuses";

/**
 * Компонент для работы со списком задач
 */
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss', '../../../assets/styles/dialog.scss']
})
export class TasksComponent implements OnInit {

  /**
   * Список загруженных задач
   */
  downloadedTasks: Task[];

  /**
   * Отфильтрованные задачи
   */
  filteredTasks: Task[];

  /**
   * Задача для смены статуса
   */
  taskForHandling: BehaviorSubject<Task> = this.tasksService.task;

  /**
   * Фильтр для сортировки
   */
  filter: Filter = {
    created: true,
    inWork: true,
    closed: true,
    isEmployeeSortAscending: true,
    isDeadlineSortAscending: true
  }

  /**
   * Возможные статусы задач
   */
  taskStatuses = TaskStatuses;

  /**
   * Массив статусов задач
   */
  taskStatusesArray: [] = []



  constructor(private tasksService: TasksService) {
  }

  ngOnInit(): void {
    this.tasksService.getTasks().subscribe({
      next: tasks => {
        this.downloadedTasks = tasks;
        this.filteredTasks = tasks;
      },
      error: () => alert("Ошибка при загрузке задач")
    })

    this.taskStatusesArray = [];
    for (let status in this.taskStatuses) {
      // @ts-ignore
      this.taskStatusesArray.push(this.taskStatuses[status].name);
    }
  }

  ngOnDestroy() {
  }

  /**
   * Установить задачу для редактирования
   * @param task - задача для редактирования
   */
  choseTask(task: Task) {
    this.tasksService.task.next(task);
  }

  /**
   * Осуществляет фильтрацию по статусам задачи
   */
  filterByStatuses() {
    let created: Task[] = [];
    let inWork: Task[] = [];
    let closed: Task[] = [];

    if (this.filter.created) {
      created = this.downloadedTasks.filter(task => task.status === TaskStatuses.CREATED.name);
    }
    if (this.filter.inWork) {
      inWork = this.downloadedTasks.filter(task => task.status === TaskStatuses.IN_WORK.name);
    }
    if (this.filter.closed) {
      closed = this.downloadedTasks.filter(task => task.status === TaskStatuses.CLOSED.name);
    }

    this.filteredTasks = [];
    this.filteredTasks = this.filteredTasks.concat(created, inWork, closed);
  }

  /**
   * Подготовить дату для обработки
   * @param date
   */
  prepareDate(date: Date) {
    return new Date(date);
  }

  /**
   * Выполняет сортировку по исполнителю
   */
  sortByEmployee() {
    if (this.filter.isEmployeeSortAscending) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => a.employee.localeCompare(b.employee));
    } else {
      this.filteredTasks = this.filteredTasks.sort((a, b) => b.employee.localeCompare(a.employee));
    }
    this.filter.isEmployeeSortAscending = !this.filter.isEmployeeSortAscending;
  }

  /**
   * Выполняет сортировку по дате дедлайна
   */
  sortByDate() {
    if (this.filter.isDeadlineSortAscending) {
      this.filteredTasks = this.filteredTasks.sort((a, b) => {
        return (new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
      });
    } else {
      this.filteredTasks = this.filteredTasks.sort((a, b) => {
        return (new Date(b.deadline).getTime() - new Date(a.deadline).getTime());
      });
    }
    this.filter.isDeadlineSortAscending = !this.filter.isDeadlineSortAscending;
  }
}



