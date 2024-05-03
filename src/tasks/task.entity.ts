export class Task {
  id: string;
  title: string;
  description: string;
  isDone: boolean;
}

export interface TaskDTO extends Omit<Task, 'id' | 'isDone'> {}
