import { IUser } from './IUser';
import { firestore } from 'firebase';

export interface ITask {
	id?: string;
	name?: string;
	priority?: string;
	date?: Date;
	//id al usuario que pertenece
	userId?: string;//firestore.DocumentReference<IUser>;

}

