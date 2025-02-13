import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatOption, MatSelect } from '@angular/material/select';
import { MatButton } from '@angular/material/button';
import { TaskService } from './task.service';
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from '@angular/material/datepicker';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  imports: [
    MatFormField,
    MatInput,
    FormsModule,
    MatSelect,
    MatOption,
    MatButton,
    MatDatepickerToggle,
    MatDatepicker,
    MatDatepickerInput
  ],
  styleUrls: ['./add-task-dialog.component.css']
})
export class AddTaskDialogComponent {
  newTask = {
    id: 0,
    title: '',
    description: '',
    dueDate: '',
    status: 'pending'
  };


  isEditMode: boolean = false; // Флаг режима редактирования
  filterDueDate: string ='';

  constructor(
    private taskService: TaskService,
    public dialogRef: MatDialogRef<AddTaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.task) {
      this.isEditMode = true;
      this.newTask = { ...data.task }; // Заполняем данные для редактирования
    }
  }

  onTaskDateChange(event: Date) {
    if (event) {
      this.filterDueDate = event.toISOString().split('T')[0]; // Преобразуем в строку "YYYY-MM-DD"
    }
  }

  onSave(): void {
    if (this.newTask.title && this.newTask.description) {
      if (this.isEditMode) {
        // 🔹 Обновляем задачу
        this.taskService.updateTask(this.newTask.id, this.newTask).subscribe(updatedTask => {
          this.dialogRef.close(updatedTask); // Возвращаем обновленную задачу
        });
      } else {
        // 🔹 Создаем новую задачу
        this.taskService.createTask(this.newTask).subscribe(savedTask => {
          this.dialogRef.close(savedTask);
        });
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close(null);
  }
}
