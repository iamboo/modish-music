import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginService } from './services/login.service';
import { CalendarComponent } from './components/calendar/calendar.component';
import { MatNativeDateModule } from '@angular/material/core';
import { PipesModule } from './pipes/pipes.module';
import { CalendarModifyComponent } from './components/calendar/modify/calendar-modify.component';

@NgModule({
  declarations: [AppComponent, CalendarComponent, CalendarModifyComponent, LoginFormComponent],
  imports: [BrowserModule, MaterialModule, MatNativeDateModule, NoopAnimationsModule, ReactiveFormsModule, PipesModule],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule {}
