import { Component, OnInit } from '@angular/core';
import { User } from '../../Modelos/User';
import { UserService } from '../../Servicios/user.service';
import { CatalogService } from '../../Servicios/catalog.service';
import { DocumentTypeEnum } from '../../Modelos/DocumentTypeEnum';
import { NgxSpinnerService } from '../../../../node_modules/ngx-spinner';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  user: User;
  documentTypes: any[];
  paises: any[];
  departamentos: any[];
  ciudades: any[];

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
      this.paises = x;
      this.spinner.hide();
    }), (error) => {
      this.spinner.hide();
      alert(error.error);
    };
  }

  cargarDepartamentos(param) {
    this.spinner.show();
    this.catalogService.listByParent(['1', '10', param]).subscribe((x: any) => {
      this.departamentos = x;
      this.spinner.hide();
    });
  }

  cargarCiudades(param) {
    this.spinner.show();
    this.catalogService.listByParent(['1', '10', param]).subscribe((x: any) => {
      this.ciudades = x;
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
