import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminviewuserdetails',
  templateUrl: './adminviewuserdetails.component.html',
  styleUrls: ['./adminviewuserdetails.component.css']
})
export class AdminviewuserdetailsComponent implements OnInit, OnDestroy {

  users: User[] = [];
  loggedInUserId: number = 0; // Initialize to prevent undefined issues
  private subscriptions: Subscription = new Subscription(); // Manage subscriptions

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    // Fetch logged-in user ID from local storage (ensure fallback)
    const storedUserId = localStorage.getItem('userId');
    this.loggedInUserId = storedUserId ? Number(storedUserId) : 0;

    const userSubscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.subscriptions.add(userSubscription);
  }

  public deleteUser(userId: number): void {
    const deleteSubscription = this.userService.deleteUser(userId).subscribe(() => {
      // If the deleted user is the logged-in user
      if (userId === this.loggedInUserId) {
        localStorage.clear();
        this.router.navigate(['/logout']); // Replace with actual logout route
      } else {
        this.refreshUserList();
      }
    });

    this.subscriptions.add(deleteSubscription);
  }

  private refreshUserList(): void {
    const refreshSubscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.subscriptions.add(refreshSubscription);
  }

  // Cleanup subscriptions when component is destroyed
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe(); // Ensures cleanup of all tracked subscriptions
  }
}
