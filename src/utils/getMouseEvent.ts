// Reference https://github.com/testing-library/react-testing-library/issues/268
interface FakeMouseEventInit {
    bubbles: boolean,
    cancelable: boolean,
    composed: boolean,
    altKey: boolean,
    button: 0 | 1 | 2 | 3 | 4,
    buttons: number,
    clientX: number,
    clientY: number,
    ctrlKey: boolean,
    metaKey: boolean,
    movementX: number,
    movementY: number,
    offsetX: number,
    offsetY: number,
    pageX: number,
    pageY: number,
    screenX: number,
    screenY: number,
    shiftKey: boolean,
    x: number,
    y: number,
}

class FakeMouseEvent extends MouseEvent {
    offsetX: number = 0
    offsetY: number = 0
    pageX: number = 0
    pageY: number = 0
    x: number = 0
    y: number = 0

    constructor(type: string, values: Partial<FakeMouseEventInit>) {
        super(type, values);
        const { pageX, pageY, offsetX, offsetY, x, y } = values;
        Object.assign(this, {
            offsetX: offsetX || 0,
            offsetY: offsetY || 0,
            pageX: pageX || 0,
            pageY: pageY || 0,
            x: x || 0,
            y: y || 0,
        });
    }
}

export const getMouseEvent = (type: string, values: Partial<FakeMouseEventInit> = {}): FakeMouseEvent => {
    values = {
        bubbles: true,
        cancelable: true,
        pageX: 1000,
        pageY: 1000,
        ...values,
    };
    return new FakeMouseEvent(type, values);
}