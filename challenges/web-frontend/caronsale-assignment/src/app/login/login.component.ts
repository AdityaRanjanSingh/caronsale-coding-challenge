import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authenticationService/authentication.service';
import { SALESMAN_IDENTIFIER } from '../../constants/api-constants';
import { IAuthToken } from '../../interfaces/iauth-token';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
  }
  async onSubmit(formData): void {
    try {
      const response: IAuthToken = await this.authenticationService.login(formData.value.userEmail, formData.value.userPassword)
      let buyer: boolean = await this.checkBuyer(response.privileges)
      if (buyer) {
        this.authenticationService.setSessionData(response);
        this.router.navigate(["auction"]);
      }
    } catch (e) {
      this.handleError(e)
    }

  }
  checkBuyer(privileges): boolean {
    let regex = new RegExp(SALESMAN_IDENTIFIER);
    return regex.test(privileges)
  }

}
