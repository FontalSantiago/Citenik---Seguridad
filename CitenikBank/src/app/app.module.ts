import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { MenuComponent } from './shared/menu/menu.component';
import { CarouselComponent } from './shared/carousel/carousel.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './pages/_home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { ModalComponent } from './shared/modal/modal.component';
import { SortDirective } from './shared/others/directive/sort.directive';
import { ConsultarPlanComponent } from './pages/consultar-plan/consultar-plan.component';
import { SeparatorDirective } from './shared/others/directive/separator.directive';
import { IngresarUsuarioComponent } from './pages/ingresar-usuario/ingresar-usuario.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './core/interceptors/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    MenuComponent,
    CarouselComponent,
    ConsultarPlanComponent,
    HomeComponent,
    ModalComponent,
    SortDirective,
    SeparatorDirective,
    IngresarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    TextMaskModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
