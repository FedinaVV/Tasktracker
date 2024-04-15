import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {TasksService} from "../../../services/tasks.service";

/**
 * Компонент хэдера
 */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(private tasksService: TasksService,
              private router: Router) {
  }

  /**
   * Обработка нажатия на кнопку "Создать задачу"
   * Устанавливает пустую задачу для обработки
   * и переводит на страницу редактирования
   */
  createTask() {
    this.tasksService.setEmptyTask();
    this.router.navigate(['/task/-1']);
  }
}
