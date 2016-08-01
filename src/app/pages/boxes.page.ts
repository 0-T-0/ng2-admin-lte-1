import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';

import { BoxComponent } from '../../components/boxes/box.component';
import { InfoBoxComponent } from '../../components/boxes/info-box.component';

@Component({
    moduleId: module.id,
    selector: 'boxes-page',
    templateUrl: './boxes.page.html',
    directives: [ ROUTER_DIRECTIVES, BoxComponent, InfoBoxComponent ]
})

export class BoxesPage { }