import { Injectable } from '@angular/core';

import { ScanData } from "../../models/scan-data.model";

import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact, ContactField, ContactName } from '@ionic-native/contacts';
import { Hotspot } from '@ionic-native/hotspot';

import { ModalController, Platform, ToastController } from "ionic-angular";
import { MapaPage } from "../../pages/index.paginas";
@Injectable()
export class HistorialProvider {

  private _historial: ScanData[] = [];
  constructor(private iab: InAppBrowser, private modalCtrl: ModalController, private contacts: Contacts,
    private platform: Platform, private toastCtrl: ToastController,private hotspot: Hotspot) {
    console.log('Hello HistorialProvider Provider');
  }
  agregarHistorial(texto: string) {
    let data = new ScanData(texto);
    this._historial.unshift(data);
    console.log(data);
    this.abrirScan(0);
  }
  abrirScan(index: number) {
    let scanData = this._historial[index];
    switch (scanData.tipo) {
      case "http":
        this.iab.create(scanData.info, "_system");
        break
      case "mapa":
        this.modalCtrl.create(MapaPage, { coords: scanData.info })
          .present();
        break
      case "contacto":
        this.crearContacto(scanData.info);
        break
      case "email":
      // MATMSG:TO:caca@caca.com;SUB:pis;BODY:cacaman;;
        let htmlLink = scanData.info;
        // mailto:someone@example.com?Subject=Hello%20again"
        htmlLink=htmlLink.replace("MATMSG:TO:","mailto:");
        htmlLink=htmlLink.replace(";SUB:","?subject=");
        htmlLink=htmlLink.replace(";BODY:","&body=");
        htmlLink=htmlLink.replace(";;","");
        htmlLink=htmlLink.replace(/ /g,"%20");
        this.iab.create(htmlLink,"_system");
        break
        case "wifi":
          this.conectarWIFI(scanData.info);
          break

      default:
        console.error("tipo no soportado");

    }
  }
  private conectarWIFI(info:string){
    let nombreRed = info.split("S:")[1];
nombreRed=nombreRed.split(";")[0];
let passRed = info.split("P:")[1];
passRed=passRed.split(";")[0];

    this.hotspot.connectToWifi(nombreRed,passRed)
    .then(
      () => this.crearToast("Conectado al wifi " + nombreRed ),
      (error) => this.crearToast("Error " + error)
    );
    // WIFI:AT:WPA;S:2277;P:ytvfyftv;;",
 // WIFI:S:cacared;T:WEP;P:cacapass;;
  }
  private crearContacto(texto: string) {
    let campos: any = this.parse_vcard(texto);
    let nombre = campos['fn'];
    // para usar la notacion de puntos de abajo el objeto debe ser any
    let tel = campos.tel[0].value[0];

    if (!this.platform.is("cordova")) {
      console.warn("estoy en el pc, no puedo crear contacto.");
      return;
    }
    let contact: Contact = this.contacts.create();
    contact.name = new ContactName(null, nombre);
    contact.phoneNumbers = [new ContactField('mobile', tel)];
    console.log("antes de guardarlo");
    contact.save()
      .then(
        () => this.crearToast("Contacto " + nombre + " creado!"),
        (error) => this.crearToast("Error " + error)
      );

  }
  private crearToast(mensaje: string) {
    this.toastCtrl.create({
      message: mensaje,
      duration: 2500
    }).present();
  }
  private parse_vcard(input: string) {
    var Re1 = /^(version|fn|title|org):(.+)$/i;
    var Re2 = /^([^:;]+);([^:]+):(.+)$/;
    var ReKey = /item\d{1,2}\./;
    var fields = {};
    input.split(/\r\n|\r|\n/).forEach(function(line) {
      var results, key;
      if (Re1.test(line)) {
        results = line.match(Re1);
        key = results[1].toLowerCase();
        fields[key] = results[2];
      } else if (Re2.test(line)) {
        results = line.match(Re2);
        key = results[1].replace(ReKey, '').toLowerCase();
        var meta = {};
        results[2].split(';')
          .map(function(p, i) {
            var match = p.match(/([a-z]+)=(.*)/i);
            if (match) {
              return [match[1], match[2]];
            } else {
              return ["TYPE" + (i === 0 ? "" : i), p];
            }
          })
          .forEach(function(p) {
            meta[p[0]] = p[1];
          });
        if (!fields[key]) fields[key] = [];
        fields[key].push({
          meta: meta,
          value: results[3].split(';')
        })
      }
    });
    return fields;
  }
  cargarHistorial() {
    return this._historial;
  }
}
