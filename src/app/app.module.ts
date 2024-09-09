import { BrowserModule } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [],
  imports: [BrowserModule, AppRoutingModule, AppComponent],
  providers: [provideHttpClient()],
  bootstrap: [],
})
export class AppModule {}
