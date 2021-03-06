import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, taskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { stat } from 'fs';

@Injectable()
export class TasksService {
	private tasks: Task[] = [];
	getAllTasks(): Task[] {
		return this.tasks;
	}

	createTask(createTaskDto: CreateTaskDto): Task {
		const { title, description } = createTaskDto;
		const task: Task = {
			id: uuid(),
			title,
			description,
			status: taskStatus.OPEN
		}
		this.tasks.push(task);
		return task;
	}

	getTaskById(taskId: string): Task {
		const foundTask =  this.tasks.find(element => element.id === taskId);
		if (!foundTask) {
			throw new NotFoundException();
		}
		return foundTask;
	}

	deleteTask(id: string): void {
		const found = this.getTaskById(id);
		this.tasks = this.tasks.filter(task => task.id !== found.id)
	}

	updateTaskStatus(taskId: string, newStatus: taskStatus): Task {
		const task = this.getTaskById(taskId);
		task.status = newStatus;
		return task;
	}

	getTasksWithFilters(filterDto: GetTaskFilterDto): Task[] {
		const { status, search } = filterDto;
		let tasks: Task[] = this.getAllTasks();
		if (status) {
			tasks = tasks.filter(task => task.status === status);
		}
		if (search) {
			tasks = tasks.filter(task => {
				if (task.title.includes(search) || task.description.includes(search)) {
					return true;
				}
				return false;
			})
		}
		return tasks;
	}
}
