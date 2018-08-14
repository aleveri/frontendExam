import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  crear() {
    this.router.navigate(['/dashboard/user/create']);
  }

  listar() {
    this.router.navigate(['/dashboard/user/list']);
  }
}
