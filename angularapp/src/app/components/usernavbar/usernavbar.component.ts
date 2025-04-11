import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-usernavbar',
  templateUrl: './usernavbar.component.html',
  styleUrls: ['./usernavbar.component.css']
})
export class UsernavbarComponent implements OnInit {


  userName : string;
  
  constructor(private authService : AuthService) { }

  ngOnInit(): void {
    this.userName= this.authService.getUsername();
    console.log(this.userName);

  }

}
