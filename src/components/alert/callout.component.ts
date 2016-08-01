import { Component, Input, OnInit, ElementRef, Renderer, SimpleChanges } from '@angular/core';

import { AlertTypeToClassMap, AlertType, ElementClassGroup } from '../common/index';

export const DefaultCalloutTypeMap: AlertTypeToClassMap = {
    'success': 'callout-success',
    'info': 'callout-info',
    'warning': 'callout-warning',
    'danger': 'callout-danger',
};

@Component({
    selector: 'callout,[callout],[role=callout]',
    template: `
    <h4 *ngIf="isOpen">
        {{title}}
    </h4>
    <ng-content *ngIf="isOpen"></ng-content>    
    `,
    host: {
        '[class.callout]': 'true',
        '[style.display]': "isOpen ? 'block' : 'none'",
    }
})

export class CalloutComponent implements OnInit {

    @Input()
    public title: string = 'Callout!';

    @Input()
    public isOpen: boolean = true;

    @Input()
    public type: AlertType = 'info';

    private typeClassGroup: ElementClassGroup<AlertType> = null;

    constructor(private element: ElementRef, private renderer: Renderer) {}

    ngOnInit() {
        this.typeClassGroup = new ElementClassGroup<AlertType>(
            this.type, value => DefaultCalloutTypeMap[value],
            'callout-info', this.element, this.renderer);
    }

    ngOnChanges(changes: SimpleChanges): any {
        if (changes['type'] && this.typeClassGroup) {
            this.typeClassGroup.updateValue(this.type);
        }
    }
}
