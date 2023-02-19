// Utils
function clip(val, min, max) {
    return Math.min(Math.max(val, min), max);
}

function map(val, a, b, x, y) {
    return x + (val - a) / (b - 1) * y;
}

// Easings
function linear(t) {
    return t;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function thereNBack(t) {
    return (t <= 0.5) ? map(t, 0, 0.5, 0, 1) : map(t, 0.5, 1, 1, 0);
}

function thereNBackNThere(t) {
    return (t <= 1 / 3) ? map(t, 0, 1 / 3, 0, 1) :
        (1 / 3 <= t && t <= 2 / 3) ? map(t, 1 / 3, 2 / 3, 1, 0) :
            map(t, 2 / 3, 1, 0, 1);
}

// Main
function aae() {

    this.time = 0;
    this.scenes = [];

    this.addScene = function ({ actor, target, duration, starttime, easing, loop }) {
        this.scenes.push({
            actor: actor,
            copy: JSON.parse(JSON.stringify(actor)),
            target: target,
            duration: duration,
            starttime: starttime,
            easing: easing || linear,
            loop: loop || false,
            progress: 0,
        });
        return this;
    }

    this.goto = function (time) {
        this.time = time;

        for (var scene of this.scenes) {
            scene.progress = (time - scene.starttime) / scene.duration;
            if (scene.loop && scene.progress > 1) {
                scene.progress = scene.progress - Math.floor(scene.progress);
            }
            scene.progress = clip(scene.progress, 0, 1);

            easedProgress = scene.easing(scene.progress);

            var queue = [{ actor: scene.actor, copy: scene.copy, target: scene.target, }];
            while (queue.length != 0) {
                var { actor, copy, target } = queue.shift();
                for (var key in target) {
                    if (typeof target[key] == "object") {
                        queue.push({
                            actor: actor[key],
                            copy: copy[key],
                            target: target[key],
                        });
                    } else {
                        actor[key] = copy[key] + easedProgress * (target[key] - copy[key]);
                    }
                }
            }
        }

        return this;
    }

    this.step = function (dt) {
        return this.goto(this.time + dt);
    }

    this.play = function (render) {
        let lastTimestamp;
        let tick = (timestamp) => {
            if (lastTimestamp === undefined) lastTimestamp = timestamp;

            this.step((timestamp - lastTimestamp) / 1000);
            lastTimestamp = timestamp;

            if (render !== undefined) render();
            window.requestAnimationFrame(tick);
        }
        window.requestAnimationFrame(tick);
    }
}
