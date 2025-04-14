import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router'; // Import Router for navigation

@Component({
  selector: 'app-adminviewuserdetails',
  templateUrl: './adminviewuserdetails.component.html',
  styleUrls: ['./adminviewuserdetails.component.css']
})
export class AdminviewuserdetailsComponent implements OnInit {

  users: User[] = [];
  loggedInUserId: number; // Store the logged-in user's ID  

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Fetch logged-in user ID from local storage or another source
    this.loggedInUserId = Number(localStorage.getItem('userId')); // Assuming userId is stored in local storage

    this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });
  }

  public deleteUser(userId: number): void {
    this.userService.deleteUser(userId).subscribe(data => {
      // If the deleted user is the logged-in user
      if (userId === this.loggedInUserId) {
        // Clear all local storage data
        localStorage.clear();

        // Redirect to logout or login page
        this.router.navigate(['/logout']); // Replace '/logout' with your actual logout route
      } else {
        // Refresh the user list
        this.ngOnInit();
      }
    });
  }
}
