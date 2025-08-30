import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { App } from './app/app';
import { TendersListComponent } from './app/tenders/tenders-list/tenders-list';
import { TendersDetailComponent } from './app/tenders/tenders-detail/tenders-detail';
import { ProductListComponent } from './app/products/products-list/products-list';

const routes: Routes = [
{ path: '', component: TendersListComponent },
{ path: 'tender/:id', component: TendersDetailComponent },
{ path: 'products', component: ProductListComponent },
{ path: '**', redirectTo: '' }
];

bootstrapApplication(App, {
providers: [
provideRouter(routes),
provideHttpClient(),
provideAnimations()
]
}).catch(err => console.error(err))