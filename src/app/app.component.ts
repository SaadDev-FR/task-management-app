import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from './services/auth-service/auth-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  constructor(private http:HttpClient,private authService: AuthServiceService){}
  ngOnInit(): void {
  }
  
  title = 'task-management-app';
}
