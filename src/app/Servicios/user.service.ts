import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AppConfiguracion } from '../app.configuracion';
import { User } from '../Modelos/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,
    private appConfiguracion: AppConfiguracion) { }

  crear(param: User) {
    return this.http.post(`${AppConfiguracion.API_URL}/User`, param, {
      headers: this.appConfiguracion.getHeader()
    });
  }

  modificar(param: User) {
    return this.http.put(`${AppConfiguracion.API_URL}/User`, param, {
      headers: this.appConfiguracion.getHeader()
    });
  }

  list(params: any[]) {
    return this.http.get(`${AppConfiguracion.API_URL}/User/List`, {
      params: new HttpParams().append('pagina', params[0]).append('cantidadPagina', params[1])
    });
  }

  borrar(param: string) {
    return this.http.delete(`${AppConfiguracion.API_URL}/User`, {
      params: new HttpParams().append('pagina', param)
    });
  }

}
