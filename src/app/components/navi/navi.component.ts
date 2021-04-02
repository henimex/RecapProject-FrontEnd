import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
})
export class NaviComponent implements OnInit {
  loggedIn: boolean;
  userFirstName: string;
  userLastName: string;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthenticated()
    this.getUserInfo()
  }

  getUserInfo(){
    this.userService.getUserInformation('henimex@gmail.com').subscribe(response=>{
      this.userFirstName = response.data.firstName;
      this.userLastName = response.data.lastName;
    })
  }

}
