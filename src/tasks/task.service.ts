import { Injectable } from '@nestjs/common';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  private tasks: Task[] = []; // Temporary in-memory store

  create(task: Task) {
    this.tasks.push(task);
    return task;
  }

  findAll() {
    return this.tasks;
  }

  findOne(id: string) {
    return this.tasks.find((task) => task.id === id);
  }

  update(id: string, task: Task) {
    const index = this.tasks.findIndex((t) => t.id === id);
    if (index > -1) {
      this.tasks[index] = task;
      return task;
    }
    return null;
  }

  remove(id: string) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }
}
