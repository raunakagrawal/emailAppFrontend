import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { EmailPopupComponent } from './email-popup/email-popup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatchGeneratorComponent } from './match-generator/match-generator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSidenavModule} from '@angular/material/sidenav';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule} from '@angular/material/input';
import { MatButtonModule} from '@angular/material/button';
import { MatCardModule} from '@angular/material/card';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule} from '@angular/material/toolbar';
import { MatMenuModule} from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { DatePipe } from '@angular/common';
import { UserService } from './service/user-service.service';
import { HistoryComponent } from './history/history.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { MemberPopupComponent } from './member-popup/member-popup.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    EmailPopupComponent,
    DashboardComponent,
    MatchGeneratorComponent,
    HistoryComponent,
    ConfirmComponent,
    MemberPopupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    HttpClientModule,
    MatInputModule, MatButtonModule,MatCardModule,MatFormFieldModule,MatDialogModule,
    ReactiveFormsModule,CommonModule,MatTableModule,MatIconModule, MatListModule,MatSelectModule,
    MatDatepickerModule,MatNativeDateModule,MatSnackBarModule,MatToolbarModule,MatMenuModule,FormsModule,MatProgressSpinnerModule,MatProgressBarModule
  ],
  providers: [UserService,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
