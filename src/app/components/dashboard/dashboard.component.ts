import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserCard } from 'src/app/models/userCard';
import { AuthService } from 'src/app/services/auth.service';
import { UserCardService } from 'src/app/services/user-card.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  userDashboardForm: FormGroup;
  loggedIn: boolean;
  userId: number;
  userFirstName: string;
  userLastName: string;
  userMail: string;
  userCards:UserCard[];

  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private userService: UserService,
    private authService: AuthService,
    private userCardService: UserCardService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthenticated();
    if (this.loggedIn) {
      this.getUserInfo();
      this.createDashBoardForm();
      //this.getUserCards(this.userDashboardForm.get('id').value)
    }
  }
  createDashBoardForm() {
    this.userDashboardForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
    });
  }

  getUserInfo() {
    let loggedUserMail = localStorage.getItem('hd_rc_u_mail');
    let infoModel = Object.assign({ email: loggedUserMail });
    this.userService.getUserInformation(infoModel).subscribe((response) => {
      this.userDashboardForm = this.formBuilder.group({
        id: [response.data.id, Validators.required],
        firstName: [response.data.firstName, Validators.required],
        lastName: [response.data.lastName, Validators.required],
        email: [response.data.email, Validators.required],
        paswordHash: [response.data.passwordHash, Validators.required],
        paswordSalt: [response.data.passwordSalt, Validators.required]
      })
      this.getUserCards(response.data.id)
    });
  }

  updateUserInformation() {
    if (this.userDashboardForm.valid) {
      let userUpdateModel = Object.assign({}, this.userDashboardForm.value);
      this.userService.updateUserInformation(userUpdateModel).subscribe((response)=>{
        this.toastrService.success(response.message,"Process Info");
      },responseError => {
        if (responseError.error.Errors.length > 0) {
          for (let i = 0; i < responseError.error.Errors.length; i++) {
            this.toastrService.error(responseError.error.Errors[i].ErrorMessage,"Something Wrong");
          }
        }
      })
    }
  }

  holdAccount() {
    this.toastrService.info(
      'Hold Request is Not Accepted... For Now',
      'In Progress'
    );
  }

  getUserCards(userId:number){
    this.userCardService.getUserCards(userId).subscribe(response => {
      this.userCards=response.data;
    })
  }

}
