import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderComponent } from './header.component';
import { AppRoutingModule } from "../app-routing.module";
import { Router } from "@angular/router";

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [],
      imports: [AppRoutingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle logout fro ui', () => {
    let router = TestBed.get(Router)
    let sessionSpy = spyOn(sessionStorage, 'clear');
    let routerSpy = spyOn(router, 'navigate').and.callFake((param) => {
      expect(param).toEqual(['/'])
    });
    component.onLogout();
  });
  it('should handle get Icons ', () => {
    let router = TestBed.get(Router)
    let sessionSpy = spyOn(sessionStorage, 'getItem').and.callFake((): string => {
      return 'data'
    });

    let response = component.getIconForHeader();
    expect(response).toBe('fas fa-sign-out-alt')
  });
  it('should handle get Icons for log in ', () => {
    let router = TestBed.get(Router)
    let sessionSpy = spyOn(sessionStorage, 'getItem').and.callFake((): string => {
      return ''
    });

    let response = component.getIconForHeader();
    expect(response).toBe('fas fa-sign-in-alt')
  });
});
