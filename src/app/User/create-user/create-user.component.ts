import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../Modelos/User';
import { UserService } from '../../Servicios/user.service';
import { CatalogService } from '../../Servicios/catalog.service';
import { DocumentTypeEnum } from '../../Modelos/DocumentTypeEnum';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { Router } from '../../../../node_modules/@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  @ViewChild(NgForm) form;
  
  user: User;
  documentTypes: any[];
  countries: any[];
  states: any[];
  cities: any[];

  constructor(private userService: UserService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private catalogService: CatalogService) {
    this.user = new User();
    this.documentTypes = DocumentTypeEnum;
  }

  ngOnInit() {
    this.spinner.show();
    this.catalogService.listByType(['1', '10', '0']).subscribe((x: any) => {
      this.countries = x.resultado;
      this.spinner.hide();
    }), (error) => {
      this.spinner.hide();
      alert(error.error);
    };
  }

  cargarDepartamentos(param) {
    this.spinner.show();
    this.catalogService.listByParent(['1', '10', param]).subscribe((x: any) => {
      this.states = x.resultado;
      this.spinner.hide();
    });
  }

  cargarCiudades(param) {
    this.spinner.show();
    this.catalogService.listByParent(['1', '10', param]).subscribe((x: any) => {
      this.cities = x.resultado;
      this.spinner.hide();
    });
  }

  crear() {
    this.spinner.show();
    this.userService.crear(this.user).subscribe(x => {
      this.spinner.hide();
      this.router.navigate(['/dashboard/user/list']);
    }, (error) => {
      this.spinner.hide();
      alert(error.error);
    });
  }

}
