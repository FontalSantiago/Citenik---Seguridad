//SISTEMA
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//COMPONENTES
import { HomeComponent } from './pages/_home/home.component';
import { ConsultarPlanComponent } from './pages/consultar-plan/consultar-plan.component';
import { IngresarUsuarioComponent } from './pages/ingresar-usuario/ingresar-usuario.component';
import { RouteguardsGuard } from './routeguards.guard';

//RUTAS
const routes: Routes = [
  {path: '', component: IngresarUsuarioComponent},
  {path: 'home', component: HomeComponent, canActivate: [RouteguardsGuard]}, 
  {path: 'consultar-plan', component: ConsultarPlanComponent, canActivate: [RouteguardsGuard]},
  {path: '', redirectTo: '/', pathMatch: 'full'},
  {path: '**', redirectTo: '/', pathMatch: 'full'},
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
