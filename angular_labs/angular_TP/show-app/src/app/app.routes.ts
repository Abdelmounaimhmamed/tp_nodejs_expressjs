
import { Routes } from '@angular/router';
import { ShowListComponent } from './components/show-list/show-list.component';
import { ShowFormComponent } from './components/show-form/show-form.component';

export const routes: Routes = [
  { path: '', component: ShowListComponent },
  { path: 'add', component: ShowFormComponent },
  { path: 'edit/:id', component: ShowFormComponent }
];
