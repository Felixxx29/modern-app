import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'detauled-drink/:id',
    loadComponent: () =>
      import('./pages/detailed-drink/detailed-drink.component').then(
        (m) => m.DetailedDrinkComponent
      ),
  },
];
