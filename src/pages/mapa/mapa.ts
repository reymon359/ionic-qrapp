import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html',
})
export class MapaPage {
  lat: number;
  lng: number;
  constructor(public navParams: NavParams, private viewCtrl: ViewController) {
    // this.lat = 38.3440819;
    // this.lng = -0.4955833;
    let coordsArray = this.navParams.get("coords").split(",");
    this.lat = Number(coordsArray[0].replace("geo:", ""));
    this.lng = Number(coordsArray[1]);
  }
  cerrarModal() {
    this.viewCtrl.dismiss();
  }
}
