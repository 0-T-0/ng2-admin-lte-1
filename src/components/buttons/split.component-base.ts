import { Input, Output, ElementRef, EventEmitter, HostBinding, HostListener } from '@angular/core';

import { ElementType, eventTriggeredInsideElement } from '../common/index';

export abstract class SplitComponentBase {
    @Input()
    public type: ElementType = 'default';

    @Input()
    @HostBinding('class.open')
    public isOpen: boolean = false;

    @Output() public clicked = new EventEmitter<any>();
    @Output() public toggled = new EventEmitter<any>();
    @Output() public opened = new EventEmitter<any>();
    @Output() public closed = new EventEmitter<any>();

    @HostBinding('class.btn-group')
    private get btnGroup(): boolean { return true; };

    constructor(private element: ElementRef) {}

    buttonClicked() {
        this.clicked.emit({});
    }

    toggleClicked() {
        this.setState(!this.isOpen);
    }

    @HostListener('document:click', ['$event'])
    clickedOnDocument($event) {
        if (eventTriggeredInsideElement($event, this.element.nativeElement)) {
            return;
        }
        this.setState(false);
    }

    private setState(isOpen: boolean) {
        if (this.isOpen === isOpen) { return; }
        this.isOpen = isOpen;
        this.toggled.emit({ isOpen });
        if (isOpen) { this.opened.emit({ }); }
        else { this.closed.emit({ }); }
    }
}
