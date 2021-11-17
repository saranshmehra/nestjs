import { Body, Controller, Get, Post, Param, Delete, Patch, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, taskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
	constructor(private tasksService: TasksService) { }

	@Get()
	getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
		if (Object.keys(filterDto).length) {
			return this.tasksService.getTasksWithFilters(filterDto);
		} else {
			return this.tasksService.getAllTasks();
		}
	}

	@Post()
	createTask(@Body() createTaskDto: CreateTaskDto): Task {
		return this.tasksService.createTask(createTaskDto);
	}

	@Get('/:taskId')
	getTaskById(@Param('taskId') taskId: string): Task {
		return this.tasksService.getTaskById(taskId);
	}

	@Delete('/:taskId')
	deleteTaskById(@Param('taskId') taskId: string): void {
		return this.tasksService.deleteTask(taskId);
	}

	@Patch('/:taskId/status')
	updateTaskStatus(
		@Param('taskId') taskId: string,
		@Body('status') newStatus: taskStatus
	): Task {
		return this.tasksService.updateTaskStatus(taskId, newStatus);
	}
}