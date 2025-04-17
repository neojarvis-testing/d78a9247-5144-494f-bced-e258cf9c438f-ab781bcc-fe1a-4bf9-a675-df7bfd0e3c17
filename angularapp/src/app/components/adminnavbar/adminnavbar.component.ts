import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {

  username: string;
  showLogoutConfirm: boolean = false;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.getUsername();
  }

  confirmLogout(): void {
    this.showLogoutConfirm = true;
  }

  cancelLogout(): void {
    this.showLogoutConfirm = false;
  }

  logout(): void {
    this.authService.logout();
    this.showLogoutConfirm = false;
  }
}
