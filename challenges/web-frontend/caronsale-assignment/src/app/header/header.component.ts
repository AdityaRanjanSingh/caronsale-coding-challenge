import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public loginText: string = "Login"
  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onLogout(): void {
    sessionStorage.clear();
    this.router.navigate(["/"]);
  }
  getIconForHeader() {
    if (sessionStorage.getItem('token')) {
      this.loginText = "Logout"
      return 'fas fa-sign-out-alt';

    } else {
      this.loginText = "Login"
      return 'fas fa-sign-in-alt'

    }
  }

}
