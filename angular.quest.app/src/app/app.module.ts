import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './components/app/app.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectComponent } from './components/project/list/project.component';
import { ProjectFormComponent } from './components/project/form/project.form.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProjectComponent,
    NavbarComponent,
    FooterComponent,
    ProjectFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'project', component: ProjectComponent },
      { path: 'project/:id', component: ProjectFormComponent }
    ])
  ],
  providers: [ProjectService],
  bootstrap: [AppComponent]
})
export class AppModule { }
