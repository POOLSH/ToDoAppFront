import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from './task.service';
import { Task } from './task';
import { AddTaskDialogComponent } from './add-task-dialog.component';
import {MatFormField} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatButton} from '@angular/material/button';
import {MatCard} from '@angular/material/card';
import {DatePipe} from '@angular/common';
import {CommonModule} from '@angular/common';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatSelect,
    MatOption,
    MatButton,
    MatCard,
    DatePipe,
    CommonModule,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepicker
  ],
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  editingTaskId: number | null = null; // ID редактируемой задачи

  // 🔥 Поля для фильтрации
  filterStatus: string = '';
  filterTitle: string = '';
  filterDueDate: string = '';

  constructor(private taskService: TaskService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadTasks();
  }

  // 🔥 Метод загрузки задач с фильтрацией
  loadTasks() {
    this.taskService.getTasks(this.filterStatus, this.filterTitle, this.filterDueDate).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  onDelete(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.loadTasks();
    });
  }

  onEdit(task: Task) {
    this.editingTaskId = task.id;
  }

  onUpdate(task: Task) {
    if (this.editingTaskId === task.id) {
      this.taskService.updateTask(task.id, task).subscribe(() => {
        this.editingTaskId = null;
        this.loadTasks();
      });
    }
  }

  cancelEdit() {
    this.editingTaskId = null;
  }

  // 🔥 Метод открытия всплывающего окна для добавления задачи
  openAddTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(AddTaskDialogComponent, {
      width: '400px',
      disableClose: true,
      data: { task } // Передаем задачу, если редактируем
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          // 🔹 Обновляем существующую задачу
          const index = this.tasks.findIndex(t => t.id === result.id);
          if (index !== -1) {
            this.tasks[index] = result;
          }
        } else {
          // 🔹 Добавляем новую задачу
          this.tasks.push(result);
        }
      }
    });
  }



  // 🔥 Метод для фильтрации
  applyFilters() {
    this.loadTasks();
  }

  // 🔥 Метод для сброса фильтров
  clearFilters() {
    this.filterStatus = '';
    this.filterTitle = '';
    this.filterDueDate = '';
    this.loadTasks();
  }
}
