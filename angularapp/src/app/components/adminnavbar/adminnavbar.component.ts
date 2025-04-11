import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-adminnavbar',
  templateUrl: './adminnavbar.component.html',
  styleUrls: ['./adminnavbar.component.css']
})
export class AdminnavbarComponent implements OnInit {

  constructor(private authService:AuthService) { }

  username:string;

  ngOnInit(): void {
    this.username = this.authService.getUsername()
  }

  logout(){
    this.authService.logout();
  }

}
