import { Routes } from '@angular/router';
import { TendersListComponent } from './tenders/tenders-list/tenders-list';
import { TendersDetailComponent } from './tenders/tenders-detail/tenders-detail';
import { ProductListComponent } from './products/products-list/products-list';

export const routes: Routes = [
{ path: '', component: TendersListComponent },
{ path: 'tender/:id', component: TendersDetailComponent },
{ path: 'products', component: ProductListComponent }
];;
