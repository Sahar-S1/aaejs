function preload() {
    config = {
        sun: {
            radius: 20,
            position: {
                x: 0,
                y: 0,
                z: 0,
            },
            texture: "assets/SunTextureMap.jpg",
        },
        earth: {
            tilt: 23.5 * PI / 180,
            radius: 8,
            orbit_radius: 175,
            rotation_angle: 0,
            revolution_angle: 0,
            rotation_speed: PI,
            revolution_speed: PI / 16,
            texture: "assets/EarthTextureMap.jpg",
        },
        moon: {
            radius: 2,
            orbit_radius: 30,
            rotation_angle: 0,
            revolution_angle: 0,
            rotation_speed: PI,
            revolution_speed: PI,
            texture: "assets/MoonTextureMap.jpg",
        },
        camera: {
            position: {
                x: 0,
                y: 0,
                z: 250,
            },
            center: {
                x: 0,
                y: 0,
                z: 0,
            },
            up: {
                x: 0,
                y: 1,
                z: 0,
            },
        },
        showorbits: true,
        freemove: true,
        framerate: 60,
        playful: false,
    };

    textures = {
        sun: loadImage(config.sun.texture),
        earth: loadImage(config.earth.texture),
        moon: loadImage(config.moon.texture),
    };

    act = new aae()
        // Earth Revolution
        .addScene({
            actor: config.earth,
            target: {
                revolution_angle: 2 * PI,
            },
            starttime: 0,
            duration: 2 * PI / config.earth.revolution_speed,
            loop: true,
        })
        // Moon Revolution
        .addScene({
            actor: config.moon,
            target: {
                revolution_angle: 2 * PI,
            },
            starttime: 0,
            duration: 2 * PI / config.moon.revolution_speed,
            loop: true,
        })
        // Earth Rotation
        .addScene({
            actor: config.earth,
            target: {
                rotation_angle: 2 * PI,
            },
            starttime: 0,
            duration: 2 * PI / config.earth.rotation_speed,
            loop: true,
        })
        // Moon Rotation
        .addScene({
            actor: config.moon,
            target: {
                rotation_angle: 2 * PI,
            },
            starttime: 0,
            duration: 2 * PI / config.moon.rotation_speed,
            loop: true,
        })
        ;

    if (config.playful) act.addScene({
        actor: config,
        target: {
            sun: {
                radius: 10,
            },
            earth: {
                radius: 20,
                orbit_radius: 50,
            },
            moon: {
                radius: 100,
                orbit_radius: 100,
            },
        },
        starttime: 0,
        duration: 1,
        easing: thereNBack,
        loop: true,
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight * 0.75);
}

function setup() {
    createCanvas(windowWidth, windowHeight * 0.75, WEBGL);
    frameRate(config.framerate);
    noStroke();
}

function draw() {
    background(0);

    // Camera
    if (config.freemove) {
        orbitControl();
    } else {
        camera(
            config.camera.position.x, config.camera.position.y, config.camera.position.z,
            config.camera.center.x, config.camera.center.y, config.camera.center.z,
            config.camera.up.x, config.camera.up.y, config.camera.up.z
        );
    }

    // Sun
    texture(textures.sun);
    sphere(config.sun.radius);

    // Earth Orbit
    push();
    if (config.showorbits) {
        strokeWeight(0.5);
        stroke(55);
        noFill();
        ellipse(0, 0, config.earth.orbit_radius * 2);
    }
    pop();

    // Earth
    rotateZ(-config.earth.revolution_angle);
    translate(config.earth.orbit_radius, 0, 0);

    push();

    rotateX(-PI / 2 + config.earth.tilt);
    rotateY(-config.earth.rotation_angle);

    texture(textures.earth);
    sphere(config.earth.radius);

    pop();

    // Moon Orbit
    push();
    if (config.showorbits) {
        strokeWeight(0.5);
        stroke(55);
        noFill();
        ellipse(0, 0, config.moon.orbit_radius * 2);
    }
    pop();

    // Moon
    rotateZ(+config.earth.revolution_angle);
    rotateZ(-config.moon.revolution_angle);
    translate(config.moon.orbit_radius, 0, 0);

    texture(textures.moon);
    sphere(config.moon.radius);

    // AAE Step
    act.step(1 / config.framerate);
}