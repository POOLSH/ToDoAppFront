// src/app/models/task.model.ts

export interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string; // Используйте Date, если вы планируете работать с объектами даты
  status: string;
  userId?: number; // Если вам нужно хранить идентификатор пользователя
}
