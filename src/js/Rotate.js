export default class Rotate {
    static element = null;
    static last = [];
    static callback = () => {};
    static rotation = {x: 55, z: 0};
    static isTimeout = false;

    static setElement(element) {
        Rotate.element = element;
    }

    static getElement() {
        return Rotate.element;
    }

    static setCallback(callback) {Rotate.callback = callback}

    static onClickStart(evt) {
        if (evt.type === "mousedown" && evt.button !== 2) return;
        Rotate.last[0] = evt.pageY || evt.changedTouches[0].pageY;
        Rotate.last[1] = evt.pageX || evt.changedTouches[0].pageX;
    }

    static onMove(evt) {
        if (!Rotate.last.length || !Rotate.callback) return;
        let loc = evt.type === "mousemove" ? [evt.pageY, evt.pageX] : [evt.changedTouches[0].pageY, evt.changedTouches[0].pageX];
        let x = Rotate.last[0] - loc[0];
        let z = Rotate.last[1] - loc[1];
        if (evt.type === "mousemove") z /= 2;
        if (Math.abs(x) >= 30) {
            Rotate.rotation.x += x < 0 ? -5 : 5;
            Rotate.last[0] = loc[0];
        }
        if (Math.abs(z) >= 100) {
            Rotate.rotation.z += z < 0 ? -45 : 45;
            Rotate.last[1] = loc[1];
        }
        if (Rotate.rotation.x > 55) Rotate.rotation.x = 55;
        if (Rotate.rotation.x < 0) Rotate.rotation.x = 0;
        if (Rotate.rotation.z < -90) Rotate.rotation.z = -90;
        if (Rotate.rotation.z > 90) Rotate.rotation.z = 90;
        if (Rotate.isTimeout) return;
        Rotate.isTimeout = true;
        setTimeout(() => {
            Rotate.callback();
            Rotate.isTimeout = false;
        }, 150);
    }

    static onClickEnd(evt) {
        Rotate.last = [];
        Rotate.moveX = false;
        Rotate.moveZ = false;
    }

    static getStyle() {
        return {transform: "rotateX(" + Rotate.rotation.x + "deg) rotateZ(" + Rotate.rotation.z + "deg) scale(0.65)"};
    }

    // Non utilisé
    // static getDistance(loc1, loc2) {
    //     return Math.sqrt((loc1[0] - loc2[0]) ** 2 + (loc1[1] - loc2[1]) ** 2);
    // }
}