export default class Resize {
    static element = null;
    static callback = () => {};

    static setGameElement(element) {
        Resize.element = element;
        Resize.resizeListener();
    }

    static getGameElement() {
        return Resize.element;
    }

    static onResize(callback) {Resize.callback = callback}

    static getSize(divider = 1, split = 1) {
        if (Resize.element) {
            let computedStyle = getComputedStyle(this.element);
            let elementHeight = this.element.clientHeight;
            let elementWidth = this.element.clientWidth;
            elementHeight -= parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom);
            elementWidth -= parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight);
            return {width: (elementWidth / divider) * split, height: (elementWidth / divider) * split};
        }
        return {width: (816 / divider) * split, height: (816 / divider) * split};
    }

    static resizeListener() {
        Resize.callback();
    }
}
