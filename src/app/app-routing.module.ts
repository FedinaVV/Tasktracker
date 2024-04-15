import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {MainComponent} from "./components/main/main.component";
import {TasksComponent} from "./components/tasks/tasks.component";
import {TaskDetailsComponent} from "./components/task-details/task-details.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'task/:id', component: TaskDetailsComponent},
  {path: 'tasks', component: TasksComponent},
  {path: "**", redirectTo: "", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
