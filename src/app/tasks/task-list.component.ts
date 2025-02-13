import { Component, OnInit } from '@angular/core';
import { TaskService } from './task.service';
import { Task } from './task';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule, FormsModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { id: 0, title: '', description: '', dueDate: '', status: '' };
  editingTaskId: number | null = null; // ID редактируемой задачи
  showAddForm: boolean = false;

  // 🔥 Поля для фильтрации
  filterStatus: string = '';
  filterTitle: string = '';
  filterDueDate: string = '';

  constructor(private taskService: TaskService) {}

  ngOnInit() {
    this.loadTasks();
  }

  // 🔥 Метод загрузки с фильтрами
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

  onAdd() {
    if (this.newTask.title && this.newTask.description) {
      this.newTask.status = this.newTask.status || 'pending';
      this.newTask.dueDate = this.newTask.dueDate || new Date().toISOString().split('T')[0];

      this.taskService.createTask(this.newTask).subscribe(newTask => {
        this.tasks.push(newTask);
        this.newTask = { id: 0, title: '', description: '', dueDate: '', status: '' };
        this.showAddForm = false;
      });
    }
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

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
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
