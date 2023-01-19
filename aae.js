// Easings
function linear(t) {
    return t;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function clip(val, min, max) {
  return Math.min(Math.max(val, min), max);
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
            scene.progress = (time - scene.starttime) / scene.duration;
            scene.progress = clip(scene.progress, 0, 1);

            easedProgress = scene.easing(scene.progress);
            for (var key in scene.target) {
                scene.actor[key] = scene.copy[key] + easedProgress * (scene.target[key] - scene.copy[key]);
            }
        }

        return this;
    }

    this.step = function (dt) {
        return this.goto(this.time + dt);
    }

    this.play = function(render) {
        let lastTimestamp;
        let tick = (timestamp) => {
            if(lastTimestamp === undefined) lastTimestamp = timestamp;

            this.step((timestamp - lastTimestamp) / 1000);
            lastTimestamp = timestamp;

            if(render !== undefined) render();
            window.requestAnimationFrame(tick);
        }
        window.requestAnimationFrame(tick);
    }
}
