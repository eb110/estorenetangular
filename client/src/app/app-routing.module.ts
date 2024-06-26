import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TestErrorComponent } from './core/test-error/test-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { ServerErrorComponent } from './core/server-error/server-error.component';

const routes: Routes = [
  //breadcrumb requires a string of length > 0 to display it
  //this is why extra parameter has been attached
  {path: '', component: HomeComponent, data:{breadcrumb: 'home'}},
  {path: 'test-error', component: TestErrorComponent},
  {path: 'not-found', component: NotFoundComponent},
  {path: 'server-error', component: ServerErrorComponent},
  //lazy loading of shop module
  //all products will be loaded only if shop link clicked
  //go to shop routing
  {path: 'shop', loadChildren:() => import('./feature-shop/feature-shop.module').then(m => m.FeatureShopModule)},
  {path: '**', redirectTo: '', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
