import {Injectable, OnInit} from '@angular/core';
//import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Usuario } from "../../model/Usuario-model";
import { Observable } from "rxjs/Observable";
import {Http} from "@angular/http";
import { Storage } from '@ionic/storage';
import { App } from "ionic-angular";
import {LoginPage} from "../../pages/login/login";


/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider implements OnInit{
  ngOnInit(): void {


  }

  private url= "http://192.168.90.66:8080/";
  //private  url="http://192.168.1.103:8080/";

  constructor(public app: App, public storage: Storage, public http: Http) {

  }


/*  public login(credenciais: Usuario) : Observable<Usuario>{
    if (credenciais.email === null || credenciais.senha === null){
      return Observable.throw("Por favor insira suas credenciais");
    }else{
      return Observable.create(observable => {

        //Neste ponto, faça um pedido para o seu backend para fazer um cheque real!
          //this.usuarioSessao= this.http.post(this.url+"usuario/login/" + credenciais);

        console.log("dadso do usuario no login: " + credenciais.siape);

        let acesso = (credenciais.senha === this.usuarioSessao.senha && credenciais.siape === this.usuarioSessao.siape);
        //this.currentUser = new Usuario('Glenio', 'glenio.descovi@gmail.com', 2);
        observable.next(acesso);
        observable.complete();
      });
    }
  }*/

  usuarioGet= new Usuario();

  public login(credenciais: Usuario) {
    return this.http.post(this.url+'usuario/login',credenciais);
  }



  public getUsuarioInfo(): Usuario {

    this.storage.get('usuarioLogado').then((retorno) => {
      this.usuarioGet = retorno;
    });

    return this.usuarioGet;

  }
  public logout(){

      this.storage.remove('usuarioLogado');
      this.storage.clear();
    this.storage.set('usuarioLogado', 'null');

      //window.localStorage.removeItem('usuarioLogado');

  }

}

