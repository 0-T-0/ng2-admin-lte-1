import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { AlertComponent } from '../../components/alert/alert.component';
import { CalloutComponent } from '../../components/alert/callout.component';

@Component({
    moduleId: module.id,
    selector: 'alerts-page',
    templateUrl: './alerts.page.html',
    directives: [ ROUTER_DIRECTIVES, AlertComponent, CalloutComponent ]
})

export class AlertsPage {



};
