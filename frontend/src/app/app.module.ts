import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { GeneratorPageComponent } from './pages/generator-page/generator-page.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { ClockComponent } from './components/clock/clock.component';
import { GridComponent } from './components/grid/grid.component';
import { LiveCodeComponent } from './components/live-code/live-code.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    GeneratorPageComponent,
    ButtonComponent,
    InputComponent,
    ClockComponent,
    GridComponent,
    LiveCodeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
