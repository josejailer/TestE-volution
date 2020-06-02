import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { ITask } from '../models/ITask';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
	providedIn: 'root'
})
export class TaskService {
	constructor(private afs: AngularFirestore, public afsAuth: AngularFireAuth) { }
	private taskCollection: AngularFirestoreCollection<ITask>;
	private tasks: Observable<ITask[]>;
	private taskDoc: AngularFirestoreDocument<ITask>;
	private task: Observable<ITask>;

	getTaks() {
		this.taskCollection = this.afs.collection<ITask>('tasks', userId => userId.where('userId', '==', this.afsAuth.auth.currentUser.uid));
		return this.tasks = this.taskCollection.snapshotChanges()
			.pipe(map(changes => {
				return changes.map(action => {
					const data = action.payload.doc.data() as ITask;
					data.id = action.payload.doc.id;
					console.log("fecha" + data);
					return data;
				});
			}));
	}

	addtask(task: ITask): void {
		task.userId = this.afsAuth.auth.currentUser.uid;
		this.taskCollection.add(task);
	}
	updatetask(task: ITask): void {
		let idtask = task.id;
		this.taskDoc = this.afs.doc<ITask>(`tasks/${idtask}`);
		this.taskDoc.update(task);
	}
	deletetask(idtask: string): void {
		this.taskDoc = this.afs.doc<ITask>(`tasks/${idtask}`);
		this.taskDoc.delete();
	}
}
