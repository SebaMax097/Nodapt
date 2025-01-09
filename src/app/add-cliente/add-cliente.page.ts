import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-cliente',
  templateUrl: './add-cliente.page.html',
  styleUrls: ['./add-cliente.page.scss'],
})
export class AddClientePage implements OnInit {

  public nombre: string = '';
  public apellido: string = '';
  public cliente: string = '';

  constructor(
    private database: DatabaseService,
    private router: Router
  ) { }

  ngOnInit() {
    
  }
  
  agregarCliente(){
    if(this.validarDatos()==true){
      this.database.agregarCliente(this.cliente)
      alert('Cliente Agregado: '+this.cliente)
      this.router.navigate(['/clientes'])
    }else{
      alert('Error')
    }

  }

  private validarNombre(value: string): boolean {
    const regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1\s]+$/;
    const lengthValid = value.length >= 3 && value.length <= 15;
    return value.trim() !== '' && regex.test(value) && lengthValid;
  }
  
  public validarDatos(): boolean {
    if (!this.validarNombre(this.nombre)) {
      alert('El nombre no es válido');
      return false;
    }
  
    if (!this.validarNombre(this.apellido)) {
      alert('El apellido no es válido');
      return false;
    }

    //Quitamos espacios
    this.nombre = this.nombre.trim()
    this.apellido = this.apellido.trim()

    //Ponemos primera letra mayuscula
    const first_letra_nombre = this.nombre.charAt(0).toUpperCase();
    const first_letra_apellido = this.apellido.charAt(0).toUpperCase();

    //ponemos el resto en minuscula
    const resto_nombre = this.nombre.slice(1).toLowerCase();
    const resto_apellido = this.apellido.slice(1).toLowerCase();

    //Juntamos los datos
    const nombreReal = (first_letra_nombre+resto_nombre)
    const apellidoReal = (first_letra_apellido+resto_apellido)
    
    const nombreCompleto = (nombreReal+' '+apellidoReal)
    this.cliente = nombreCompleto;
    return true;
  }
}
