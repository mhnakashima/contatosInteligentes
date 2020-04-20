import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './generics/not-found/not-found.component';
import { ContactsViewComponent } from './pages/contacts/contacts-view/contacts-view.component';
import { ContactsComponent } from './pages/contacts/contacts.component';

const routes: Routes = [
  { path: '', component: ContactsComponent, data: {animation: 'Contact'} },
  { path: 'contacts', component: ContactsComponent, data: {animation: 'Contact'} },
  { path: 'view/:name', component: ContactsViewComponent, data: {animation: 'ContactView'} },
  { path: '404', component: NotFoundComponent, data: {animation: '404'} },
  { path: '**', redirectTo: '/404', data: {animation: 'Contact'} }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
