import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  userInfoForm: FormGroup;

  userId:number;
  userFirstName: string;
  userLastName: string;
  userEmail: string;
  userStatus: boolean;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createLoginForm();
    //this.createUserInfoForm();
  }

  login() {
    if (this.loginForm.valid) {
      let loginModel = Object.assign({}, this.loginForm.value);
      this.authService.login(loginModel).subscribe((response) => {
        if (response.success){
          this.toastrService.success("Logged In", "Login Information")
          localStorage.setItem('token', response.data.token)
          this.getUserInfo();
          this.router.navigate(['/']).then(() => {window.location.reload();})
        }
      },responseError=>{
        this.toastrService.error(responseError.error.message, "Login Failed")
      });
    }
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  createUserInfoForm(){
    this.userInfoForm = this.formBuilder.group({
      id: ['', Validators],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      //Password: ['']
    })
  }

  getUserInfo(){
    let infoModel = Object.assign({
      email:this.loginForm.get('email').value
    },)
    this.userService.getUserInformation(infoModel).subscribe(response=>{
      this.userEmail = response.data.email,
      localStorage.setItem('hd_rc_u_mail',this.userEmail)
    })
  }

  getUserInfo2(){
    let infoModel = Object.assign({
      email:this.loginForm.get('email').value
    },)
    this.userService.getUserInformation(infoModel).subscribe(response=>{
      this.userId = response.data.id,
      this.userFirstName = response.data.firstName,
      this.userLastName = response.data.lastName,
      this.userEmail = response.data.email,
      this.userInfoForm = this.formBuilder.group({
        id: [response.data.id],
        firstName: [response.data.firstName],
        lastName: [response.data.lastName],
        email: [response.data.email],
        status: [response.data.status]
        //Password: ['']
      })
    })
  }

  sendLoggedUserInfo(){
    console.log('on hold.')
    let naviExtras : NavigationExtras = {
      queryParams:{
        'userId':this.userInfoForm.get('id').value,
        'userFirstName':this.userInfoForm.get('firstName').value,
        'userLastName':this.userInfoForm.get('lastName').value,
        'userEmail':this.userInfoForm.get('email').value,
        'userStatus':this.userInfoForm.get('status').value
      }
    };
    this.router.navigate(['/navibar']), naviExtras
  }

}
