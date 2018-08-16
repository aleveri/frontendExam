import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../Modelos/User';
import { UserService } from '../../Servicios/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from '../../Servicios/data.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];

  constructor(private router: Router,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private userService: UserService) { }

  ngOnInit() {
    this.spinner.show();
    this.userService.list(['1', '70']).subscribe((x: any) => {
      this.users = x.resultado;
      this.spinner.hide();
    }, (error) => {
      console.log(error);
    });
  }

  modificar(param: any) {
    this.dataService.setData(param);
    this.router.navigate(['/dashboard/user/update']);
  }

  borrar(param: any) {
    this.spinner.show();
    this.userService.borrar(param).subscribe(x => {
      this.userService.list(['1', '70']).subscribe((x: any) => {
        this.users = x.resultado;
        this.spinner.hide();
      }, (error) => {
        console.log(error);
      });
    }, (error) => {
      console.log(error);
    });
  }

}
