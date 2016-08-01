import { Component, ElementRef } from '@angular/core';

import { ButtonComponent } from './button.component';
import { SplitComponentBase } from './split.component-base';

@Component({
    selector: 'split-button',
    template: `
    <button [type]="type" (click)="buttonClicked()">
        <ng-content></ng-content>
    </button>
    <button [type]="type" class="dropdown-toggle" (click)="toggleClicked()">
        <span class="caret"></span>
    </button>
    <div class="dropdown-menu">
        <ng-content select=".dropdown-content"></ng-content>
    </div>
    `,
    directives: [ ButtonComponent ]
})

export class SplitButtonComponent extends SplitComponentBase {
    constructor(element: ElementRef) {
        super(element);
    }
}
