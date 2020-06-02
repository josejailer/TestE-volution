import { IUser } from '../../models/IUser';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
	public user$: Observable<IUser> = this.authService.afsAuth.user;

	constructor(public authService: AuthService, private router: Router) { }

	async onLogout() {
		try {
			await this.authService.logout();
			this.router.navigate(['/login']);
		} catch (error) {
			console.log(error);
		}
	}
}
