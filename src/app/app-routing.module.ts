import { TableComponent } from './table/table.component';
import { FormComponent } from './form/form.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ModalComponent } from './modal/modal.component';


const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'register', component: FormComponent },
  { path: 'table', component: TableComponent },
  { path: '', pathMatch: 'full', redirectTo: 'ListComponent' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
