import { Routes } from '@angular/router';

export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'inicio' },
	{ path: 'inicio', data: { view: 'inicio' } },
	{ path: 'nosotros', data: { view: 'nosotros' } },
	{ path: 'mascotas', data: { view: 'mascotas' } },
	{ path: 'clientes', data: { view: 'clientes' } },
	{ path: 'adopciones', data: { view: 'adopciones' } },
	{ path: 'tienda', data: { view: 'tienda' } },
	{ path: 'dashboard', data: { view: 'dashboard' } },
	{ path: '**', redirectTo: 'inicio' }
];
