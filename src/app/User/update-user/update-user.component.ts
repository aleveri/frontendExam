import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../Modelos/User';
import { UserService } from '../../Servicios/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { CatalogService } from '../../Servicios/catalog.service';
import { DocumentTypeEnum } from '../../Modelos/DocumentTypeEnum';
import { DataService } from '../../Servicios/data.service';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  @ViewChild(NgForm) form;

  user: User;
  documentTypes: any[];
  countries: any[];
  states: any[];
  cities: any[];

  constructor(private userService: UserService,
    private dataService: DataService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private catalogService: CatalogService) {
    this.user = this.dataService.getData();
  }

  ngOnInit() {
    if (this.user) {
      this.spinner.show();
      this.catalogService.paramsForUpdate([this.user.countryId, this.user.stateId]).subscribe((x: any) => {
        this.countries = x[0].resultado as any;
        this.states = x[1].resultado as any;
        this.cities = x[2].resultado as any;
        this.documentTypes = DocumentTypeEnum;
        this.spinner.hide();
      }), (error) => {
        this.spinner.hide();
        alert(error.error);
      };
    }
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

  modificar() {
    this.spinner.show();
    this.userService.modificar(this.user).subscribe(x => {
      this.spinner.hide();
      this.router.navigate(['/dashboard/user/list']);
    }, (error) => {
      this.spinner.hide();
      alert(error.error);
    });
  }

  cancelar() {
    this.router.navigate(['/dashboard/user/list']);
  }
}
