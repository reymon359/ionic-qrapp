import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HistorialProvider } from "../../providers/historial/historial";

import { ScanData } from "../../models/scan-data.model";
@IonicPage()
@Component({
  selector: 'page-guardados',
  templateUrl: 'guardados.html',
})
export class GuardadosPage {
  historial: ScanData[] = [];
  constructor(private _historialProvider: HistorialProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.historial = this._historialProvider.cargarHistorial();
    console.log(this.historial);
  }
  abrirScan(index: number) {
    this._historialProvider.abrirScan(index);
  }
}
