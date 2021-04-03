import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  userInfoForm:FormGroup;
  loggedIn: boolean;
  userFirstName: string;
  userLastName: string;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthenticated()
    if (this.loggedIn) {
          this.getUserInfo()
    }
  }
  createUserInfoForm() {
    this.userInfoForm = this.formBuilder.group({
      email:['henimex@gmail.com']
    })
  }

  getUserInfo(){
    let loggedUserMail = localStorage.getItem('hd_rc_u_mail')
    let infoModel = Object.assign({email:loggedUserMail},)
    this.userService.getUserInformation(infoModel).subscribe(response=>{
      this.userFirstName = response.data.firstName;
      this.userLastName = response.data.lastName;
    })
  }

  logout(){
    localStorage.removeItem('token')
    localStorage.removeItem('hd_rc_u_mail')
    this.toastrService.info("Logged out successfully completed","LOGOUT")
    this.router.navigate(['/']).then(() => {window.location.reload();})

  }
}
