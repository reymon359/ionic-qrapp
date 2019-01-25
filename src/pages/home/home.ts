import { Component } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

//componentes
import { ToastController } from 'ionic-angular';

//pluguins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

//servicios o providers
import { HistorialProvider } from '../../providers/historial/historial';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public toastCtrl: ToastController, public navCtrl: NavController, private barcodeScanner: BarcodeScanner,
    private platform: Platform, private _historialProvider: HistorialProvider) {

  }
  scan() {

    //si no estamos en el movil
    console.log("platfomr ", this.platform);
    if (!this.platform.is('cordova')) {
      // this._historialProvider.agregarHistorial("http://google.com");
      // this._historialProvider.agregarHistorial("geo:9,-10");
      // this._historialProvider.agregarHistorial("MATMSG:TO:caca@caca.com;SUB:pis;BODY:cacaman;;");

//
//       this._historialProvider.agregarHistorial(`BEGIN:VCARD
// VERSION:2.1
// N:Kent;Clark
// FN:Clark Kent
// ORG:
// TEL;HOME;VOICE:12345
// TEL;TYPE=cell:67890
// ADR;TYPE=work:;;;
// EMAIL:clark@superman.com
// END:VCARD` );
this._historialProvider.agregarHistorial("WIFI:S:cacared;T:WEP;P:cacapass;;");

      return;
    }

    this.barcodeScanner.scan().then(barcodeData => {
      console.log(barcodeData);
      console.log('Barcode data'+ barcodeData);
      console.log("Result: "+ barcodeData.text);
      console.log("Format: "+ barcodeData.format);
      console.log("Cancelled: "+ barcodeData.cancelled);

      if (!barcodeData.cancelled && barcodeData.text != null) {
        this._historialProvider.agregarHistorial(barcodeData.text);



      }
    }).catch(err => {
      console.log('Error', err);
      this.mostrarToast("Error: " + err);
    }),
      {
        showTorchButton: true, // iOS and Android
      };
  }
  mostrarToast(mensaje: string) {
    const toast = this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    });
    toast.present();
  }
}
