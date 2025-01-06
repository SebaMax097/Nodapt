import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-boton-volver',
  templateUrl: './boton-volver.component.html',
  styleUrls: ['./boton-volver.component.scss'],
})
export class BotonVolverComponent{

  constructor(private navCtrl: NavController) { }

  goBack(){
    this.navCtrl.back();
  }

}
