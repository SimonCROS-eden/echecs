export default class Resize {
    static element = null;
    static squareElement = null;
    static callback = () => {};
    static isTimeout = false;

    static setElement(element) {
        Resize.element = element;
        Resize.resizeListener();
    }

    static getElement() {
        return Resize.element;
    }

    static setSquareContainerElement(element) {
        Resize.squareElement = element;
        Resize.resizeListener();
    }

    static getSquareContainerElement() {
        return Resize.squareElement;
    }

    static onResize(callback) {Resize.callback = callback}

    static getContainerWidth() {
        if (!Resize.squareElement) return 0;
        let w = Resize.squareElement.clientWidth;
        let h = Resize.squareElement.clientHeight;
        console.log(h);
        return Math.min(w, h);
    }

    static getSize(divider = 1, split = 1) {
        if (Resize.element) {
            let computedStyle = getComputedStyle(this.element);
            let elementHeight = this.element.clientHeight;
            let elementWidth = this.element.clientWidth;
            elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
            elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
            return {width: (elementWidth / divider) * split, height: (elementHeight / divider) * split};
        }
        return {width: (816 / divider) * split, height: (816 / divider) * split};
    }

    static resizeListener() {
        Resize.callback();

        // For phone (when rotate, need update for pieces after container size changed)
        setTimeout(() => {
            Resize.callback();
            Resize.isTimeout = false;
        }, 150);
    }
}
