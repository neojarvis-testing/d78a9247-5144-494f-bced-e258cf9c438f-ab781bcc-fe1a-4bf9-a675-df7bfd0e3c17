import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
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
  loggedInUserId: number = 0;
  private subscriptions: Subscription = new Subscription();

  showDeleteConfirm: boolean = false;
  userIdToDelete: number | null = null;

  searchTerm: string = ''; // Search functionality
  selectedRole: string = ''; // Filter functionality

  constructor(private userService: UserService, private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    const storedUserId = localStorage.getItem('userId');
    this.loggedInUserId = storedUserId ? Number(storedUserId) : 0;

    const userSubscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.subscriptions.add(userSubscription);
  }

  filteredUsers(): User[] {
    return this.users.filter(user => {
      const rowData = `${user.username} ${user.email} ${user.userRole} ${user.mobileNumber}`.toLowerCase();
      return rowData.includes(this.searchTerm.toLowerCase()) &&
        (this.selectedRole === '' || user.userRole === this.selectedRole);
    });
  }

  confirmDelete(userId: number): void {
    this.userIdToDelete = userId;
    this.showDeleteConfirm = true;
    this.renderer.addClass(document.body, 'modal-active');
  }

  cancelDelete(): void {
    this.showDeleteConfirm = false;
    this.userIdToDelete = null;
    this.renderer.removeClass(document.body, 'modal-active');
  }

  deleteUser(): void {
    if (this.userIdToDelete !== null) {
      const deleteSubscription = this.userService.deleteUser(this.userIdToDelete).subscribe(() => {
        if (this.userIdToDelete === this.loggedInUserId) {
          localStorage.clear();
          this.router.navigate(['/logout']);
        } else {
          this.refreshUserList();
        }
      });

      this.subscriptions.add(deleteSubscription);
    }

    this.showDeleteConfirm = false;
    this.renderer.removeClass(document.body, 'modal-active');
  }


  private refreshUserList(): void {
    const refreshSubscription = this.userService.getAllUsers().subscribe(data => {
      this.users = data;
    });

    this.subscriptions.add(refreshSubscription);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
