import { FormGroup, FormControl } from '@angular/forms';
import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { IUser } from '../../models/IUser';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
	loginForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});
	constructor(private authService: AuthService, private router: Router) { }

	async onLogin() {
		try {
			const user = await this.authService.login(this.loginForm.value.email, this.loginForm.value.password);
			if (user) {
				this.router.navigate(['/home']);
			}
		} catch (error) {
			alert(error);
		}
	}

}
