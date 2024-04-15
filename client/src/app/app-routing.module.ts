import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
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
