import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
	registerForm = new FormGroup({
		email: new FormControl(''),
		password: new FormControl(''),
	});

	constructor(private authService: AuthService, private router: Router) { }

	async onRegister() {
		if (this.registerForm.valid) {
			try {
				const user = await this.authService.register(this.registerForm.value.email, this.registerForm.value.password);
				if (user) {
					this.router.navigate(['/home']);
				}
			} catch (error) {
				alert(error);
			}

		} else
			alert('Por favor rellene todos los campos');
	}


}
