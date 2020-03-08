import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from "../app-routing.module";
import { LoginComponent } from './login.component';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
import { Router } from "@angular/router";
import { doesNotReject } from 'assert';
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [],
      imports: [
        AppRoutingModule,
        MatToolbarModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatCardModule,
        MatButtonModule,
        FormsModule,
        BrowserAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle submit form data and call login of auth service', done => {
    let service = TestBed.get(AuthenticationService)
    let spy = spyOn(service, 'login');
    component.onSubmit({ value: { userEmail: 'userEmail', userPassword: 'userPassword' } });
    expect(spy).toHaveBeenCalledWith('userEmail', 'userPassword');
    done()
  });

  it('should handle submit form data', async done => {
    let service = TestBed.get(AuthenticationService)
    spyOn(service, 'login').and.callFake(() => { return Promise.resolve({ privileges: '{PUBLIC_USER}~{SALESMAN_USER}' }) })
    let serviceSpy = spyOn(service, 'setSessionData').and.callFake((d) => {
      expect(d).toEqual({ privileges: '{PUBLIC_USER}~{SALESMAN_USER}' });
      done()
    })
    await component.onSubmit({ value: { userEmail: 'userEmail', userPassword: 'userPassword' } });
  });
});
