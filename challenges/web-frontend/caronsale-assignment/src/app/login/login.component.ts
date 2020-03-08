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
  public loginError: string = "";
  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('token')) {
      this.router.navigate(['auctionOverview'])
    }
  }
  onSubmit(formData): void {
    try {
      this.authenticationService.login(formData.value.userEmail, formData.value.userPassword).then(async d => {
        let buyer: boolean = await this.checkBuyer(d.privileges)

        if (buyer) {
          this.authenticationService.setSessionData(d);
          this.router.navigate(["auctionOverview"]);
        } else {
          this.loginError = "You are not authorised to go ahead"
        }
      }).catch(e => {
        this.loginError = "Oops something went wrong"
      })

    } catch (e) {
      this.handleError(e)
    }

  }
  handleError(e) {
    this.loginError = "Oops something went wrong"
  }
  checkBuyer(privileges): boolean {
    let regex = new RegExp(SALESMAN_IDENTIFIER);
    return regex.test(privileges)
  }

}
