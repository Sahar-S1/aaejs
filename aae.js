// Easings
function linear(t) {
    return t;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

// Main
function aae() {

    this.time = 0;
    this.scenes = [];

    this.addScene = function ({ actor, target, duration, starttime, easing }) {
        this.scenes.push({
            actor: actor,
            copy: JSON.parse(JSON.stringify(actor)),
            target: target,
            duration: duration,
            starttime: starttime,
            easing: easing || linear,
            progess: 0,
        });
        return this;
    }

    this.goto = function (time) {
        this.time = time;

        for (var scene of this.scenes) {
            if (scene.starttime <= time && time <= scene.starttime + scene.duration) {
                scene.progress = (time - scene.starttime) / scene.duration;

                easedProgress = scene.easing(scene.progress);
                for (var key in scene.target) {
                    scene.actor[key] = scene.copy[key] + easedProgress * (scene.target[key] - scene.copy[key]);
                }
            }
        }

        return this;
    }

    this.step = function (dt) {
        return this.goto(this.time + dt);
    }

}