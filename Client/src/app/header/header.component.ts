import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isAuthorized: boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.isAuthorized = false;
  }

  onClick(): void {
    this.router.navigateByUrl('/login');
  }
}
