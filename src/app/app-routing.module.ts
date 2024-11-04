import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesListComponent } from './games-list/games-list.component';

const routes: Routes = [ { path: '', redirectTo: '/Home', pathMatch: 'full' }
  , { path: 'Home', component: HomeComponent }, 
   { path: 'game-list', component: GamesListComponent },
   { path: '**', redirectTo: '/Home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
