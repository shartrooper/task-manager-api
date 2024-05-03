import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TaskDocument, TaskResponse } from './schemas/task.schema';
import { TaskDTO, Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<TaskDocument>) {}

  async create(task: TaskDTO): Promise<TaskResponse> {
    const newTask = new this.taskModel({ task, isDone: false });
    await newTask.save();
    return newTask.toJSON();
  }

  async findAll(): Promise<TaskResponse[]> {
    const tasks = await this.taskModel.find().exec();
    return tasks.map((task) => task.toJSON());
  }

  async findOne(id: string): Promise<TaskResponse> {
    const task = await this.taskModel.findById(id).exec();
    return task.toJSON();
  }

  async update(id: string, taskData: TaskDTO): Promise<TaskResponse> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, taskData, { new: true })
      .exec();
    return updatedTask.toJSON();
  }

  async remove(id: string): Promise<any> {
    await this.taskModel.findByIdAndDelete(id).exec();
    return { id };
  }

  async toggleDone(id: string): Promise<TaskResponse> {
    const updatedTask = await this.taskModel
      .findByIdAndUpdate(id, { isDone: true }, { new: true })
      .exec();
    return updatedTask.toJSON();
  }
}
