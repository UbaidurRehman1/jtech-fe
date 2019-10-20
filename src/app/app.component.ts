import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import {Plugins, Capacitor} from '@capacitor/core';
import {AuthService} from './service/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        // private splashScreen: SplashScreen,
        // private statusBar: StatusBar,
        private auth: AuthService
    ) {
        this.initializeApp();
    }

    initializeApp() {
        // new
        if (Capacitor.isPluginAvailable('SplashScreen')) {
            Plugins.SplashScreen.hide().then();
        }
        // old
        // this.platform.ready().then(() => {
        //     // this.statusBar.styleDefault();
        //     // this.splashScreen.hide();
        // });
    }

    onLogout() {
        this.auth.logout();
    }
}
