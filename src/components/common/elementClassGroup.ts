import { ElementRef, Renderer } from '@angular/core';

export class ElementClassGroup<TValue> {

    private currentClass: string;
    private isFirstTime: boolean;
    private isDisposed: boolean;

    constructor(
        initialValue: TValue,
        private defaultClassMapper: (value: TValue) => string,
        private defaultClass: string,
        private element: ElementRef,
        private renderer: Renderer)
    {
        this.currentClass = null;
        this.isFirstTime = true;
        this.isDisposed = false;

        this.updateValue(initialValue);
    }

    public dispose() {
        if (this.isDisposed) { return; }
        this.isDisposed = true;
    }

    public updateValue(value: TValue, classMapper?: (value: TValue) => string) {
        if (this.isDisposed) { throw new Error('Object disposed'); }

        const newClass = this.mapValueToClass(value, classMapper);

        if (!this.isFirstTime && this.currentClass === newClass) { return; }

        if (this.currentClass !== null) {
            this.renderer.setElementClass(this.element.nativeElement, this.currentClass, false);
            this.currentClass = null;
        }

        if (newClass !== null) {
            this.renderer.setElementClass(this.element.nativeElement, newClass, true);
            this.currentClass = newClass;
        }
    }

    private mapValueToClass(value: TValue, classMapper: (value: TValue) => string) {
        const map = classMapper || this.defaultClassMapper;
        const cls = map(value) || this.defaultClass;
        return cls;
    }
}
