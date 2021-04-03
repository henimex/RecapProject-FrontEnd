import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(
    private router: Router,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      email:['', Validators.required],
      password:['', Validators.required],
      passwordConfirmation:['', Validators.required]
    })
  }

  register() {
    let password = this.registerForm.get('password').value
    let confirm = this.registerForm.get('passwordConfirmation').value
    if (password === confirm && this.registerForm.valid) {
      let registerModel = Object.assign({}, this.registerForm.value);
      this.authService.register(registerModel).subscribe(response=>{
        if (response.success) {
          this.toastrService.success(response.message,'Register Information')
          localStorage.setItem('token', response.data.token)
          this.router.navigate(['/']).then(() => {window.location.reload();})
        }
      },responseError=>{
        this.toastrService.error(responseError.error.message, 'Register Information')
      })
    }else{
      this.toastrService.error('Password Confirmation Failed','Password Match')
    }
  }
}
