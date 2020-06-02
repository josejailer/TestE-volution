import { Component } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { ITask } from 'src/app/models/ITask';
import { NgForm } from '@angular/forms';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
	tasks: ITask[];
	display: string = 'none';
	isEditModeEnabled: boolean = false;
	iTask: ITask = {};

	constructor(private taskService: TaskService) {
		taskService.getTaks().subscribe(rs => {
			this.tasks = rs;
			console.log(rs);
		});
	}

	ngOnInit() {
	}


	addTask(myForm: NgForm) {
		let taskId = new Date().getTime();
		let newTask = myForm.value;
		newTask['id'] = taskId;

		if (newTask.name !== null && newTask !== undefined) {
			this.taskService.addtask(newTask);
			this.closeModal(myForm);
		}
	}
	editTaks(task) {
		this.isEditModeEnabled = true;
		this.iTask = { ...task };
		this.display = 'block';
	}

	updateTask(myForm: NgForm) {
		console.log(myForm.value);
		this.taskService.updatetask(myForm.value);
		this.closeModal(myForm);
	}


	deleteTaks(taskId) {
		if (taskId !== undefined) {
			if (confirm('¿Estas seguro de borrar esta tarea?')) {
				this.taskService.deletetask(taskId);
			}
		}
	}

	openModalDialog() {
		this.isEditModeEnabled = false;
		this.display = 'block';
	}

	closeModal(myForm: NgForm) {
		myForm.reset();
		this.display = 'none';
	}
}
