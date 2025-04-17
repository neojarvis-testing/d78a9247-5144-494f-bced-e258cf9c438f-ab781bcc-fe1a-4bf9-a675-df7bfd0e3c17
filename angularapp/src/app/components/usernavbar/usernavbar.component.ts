import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {
  
  userName: string;
  showLogoutConfirm: boolean = false; // Logout confirmation modal visibility
  isNavbarCollapsed: boolean = true; // Navbar toggling

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.authService.getUsername();
    console.log(this.userName);
  }

  // Show logout confirmation modal
  confirmLogout() {
    this.showLogoutConfirm = true;
  }

  // Perform logout after confirmation
  logout() {
    this.showLogoutConfirm = false;
    this.authService.logout();
    this.router.navigate(['/logout']); // Navigate to logout page
  }

  // Cancel logout action
  cancelLogout() {
    this.showLogoutConfirm = false;
  }

  // Toggle navbar collapse state
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }
}
