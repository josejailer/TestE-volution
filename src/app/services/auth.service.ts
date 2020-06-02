import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { IUser } from '../models/IUser';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class AuthService {
	public user$: Observable<IUser>;

	constructor(public afsAuth: AngularFireAuth, private afs: AngularFirestore) {
		this.user$ = this.afsAuth.authState.pipe(
			switchMap((user) => {
				if (user) {
					return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
				}
				return of(null);
			})
		);
	}

	register(email: string, pass: string) {
		return new Promise((resolve, reject) => {
			this.afsAuth.auth.createUserWithEmailAndPassword(email, pass)
				.then(userData => {
					resolve(userData)
					const data: IUser = {
						id: userData.user.uid,
						email: userData.user.email,
					}
					this.afs.doc(`users/${userData.user.uid}`).set(data, { merge: true })
				}).catch(err => console.log(reject(err)))
		});
	}

	login(email: string, pass: string) {
		return new Promise((resolve, reject) => {
			this.afsAuth.auth.signInWithEmailAndPassword(email, pass)
				.then(userData => resolve(userData),
					err => reject(err));
		});
	}

	logout() {
		return this.afsAuth.auth.signOut();
	}

}
