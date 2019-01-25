import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

// mapas
import { AgmCoreModule } from '@agm/core';
//paginas
import { GuardadosPage, HomePage, MapaPage, TabsPage } from "../pages/index.paginas";

//servicios o providers
import { HistorialProvider } from '../providers/historial/historial';


//pluguins
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Contacts, Contact} from '@ionic-native/contacts';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot';

@NgModule({
  declarations: [
    MyApp, GuardadosPage, HomePage, MapaPage, TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA9KTPtCniv71JJUg1vF58R3m1RgdmzStU'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp, GuardadosPage, HomePage, MapaPage, TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    BarcodeScanner,
    InAppBrowser,
    Contacts,
    Contact,
    Hotspot,

    { provide: ErrorHandler, useClass: IonicErrorHandler },
    HistorialProvider
  ]
})
export class AppModule { }
