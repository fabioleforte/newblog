import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditComponent } from './edit/edit.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'register', component: FormComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'table', component: TableComponent },
  { path: '', pathMatch: 'full', redirectTo: 'ListComponent' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
