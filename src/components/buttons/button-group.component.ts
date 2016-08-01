import { Component, Input, HostBinding } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'button-group',
    template: `<ng-content></ng-content>`
})
export class ButtonGroupComponent {
    @Input()
    @HostBinding('class.disabled')
    public isDisabled: boolean = false;

    @Input()
    @HostBinding('class.btn-group-vertical')
    public isVertical: boolean = false;

    @HostBinding('class.btn-group')
    private get isHorizontal(): boolean { return !this.isVertical; };

    @HostBinding('style.pointer-events')
    private get pointerEventsStyle(): string { return this.isDisabled ? 'none' : 'inherit'; };
}
