import { provideRouter, RouterConfig } from '@angular/router';

import { HomePage } from './pages/home.page';

const routes: RouterConfig = [
    { path: '', component: HomePage },
    { path: '**', redirectTo: '' }
];

export const appRouterProviders = [
    provideRouter(routes)
];
