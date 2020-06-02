import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full',
	},
	{
		path: 'login',
		loadChildren: () => import('./components/login/login.module').then((m) => m.LoginModule),
	},
	{
		path: 'home',
		loadChildren: () => import('./components/home/home.module').then((m) => m.HomeModule),
	},
	{
		path: 'register',
		loadChildren: () =>
			import('./components/register/register.module').then((m) => m.RegisterModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
