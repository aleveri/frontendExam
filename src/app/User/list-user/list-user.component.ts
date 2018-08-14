import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Modelos/User';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  modificar() {
    this.router.navigate(['/dashboard/user/update']);
  }

}
