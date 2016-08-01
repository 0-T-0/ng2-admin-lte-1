export type ElementType = "default" | "primary" | "success" | "info" | "warning" | "danger" | "link";
export type ElementSize = "normal" | "large" | "small" | "tiny";
export type AlertType = "success" | "info" | "warning" | "danger";
export type BoxType = "default" | "primary" | "success" | "info" | "warning" | "danger";

export interface ElementTypeToClassMap {
    [elementType: string]: string;
}

export interface ElementSizeToClassMap {
    [elementSize: string]: string;
}

export interface AlertTypeToClassMap {
    [alertType: string]: string;
}

export interface BoxTypeToClassMap {
    [boxType: string]: string;
}

export const BackgroundColors = [
    'red',
    'yellow',
    'aqua',
    'blue',
    'light-blue',
    'green',
    'navy',
    'teal',
    'olive',
    'lime',
    'orange',
    'fuchsia',
    'purple',
    'maroon',
    'black',
    'red-active',
    'yellow-active',
    'aqua-active',
    'blue-active',
    'light-blue-active',
    'green-active',
    'navy-active',
    'teal-active',
    'olive-active',
    'lime-active',
    'orange-active',
    'fuchsia-active',
    'purple-active',
    'maroon-active',
    'black-active'
];

export function eventTriggeredInsideElement($event: any, nativeElement: any) {
    if (!$event || !$event.target || !nativeElement) {
        return false;
    }
    let current = $event.target;
    do {
        if ( current === nativeElement ) {
            return( true );
        }
        current = current.parentNode;
    } while ( current );
    return false;
}
