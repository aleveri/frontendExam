import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '../../../node_modules/@angular/common/http';
import { AppConfiguracion } from '../app.configuracion';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {

  constructor(private http: HttpClient,
    private appConfiguracion: AppConfiguracion) { }

  listByType(params: any[]) {
    return this.http.get(`${AppConfiguracion.API_URL}/Catalog/ListByType`, {
      headers: this.appConfiguracion.getHeader(),
      params: new HttpParams().append('page', params[0]).append('pageSize', params[1]).append('type', params[2])
    });
  }

  listByParent(params: any[]) {
    return this.http.get(`${AppConfiguracion.API_URL}/Catalog/ListByParent`, {
      headers: this.appConfiguracion.getHeader(),
      params: new HttpParams().append('page', params[0]).append('pageSize', params[1]).append('parent', params[2])
    });
  }
}
