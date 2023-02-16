circle1 = {
    x: 150,
    y: 150,
    d: 200,
    r: 255,
    g: 255,
    b: 255,
};

circle2 = {
    x: 300,
    y: 150,
    d: 100,
    r: 255,
    g: 255,
    b: 255,
};

bg = {
    r: 100,
    g: 100,
    b: 100
};

act = new aae()
    .addScene({
        actor: circle1,
        target: {
            x: 300,
            d: 100,
            r: 100,
            g: 0,
            b: 255,
        },
        duration: 2,
        starttime: 1,
        easing: (t) => easeInOutCubic(thereNBackNThere(t)),
    })
    .addScene({
        actor: circle2,
        target: {
            x: 150,
            y: 60,
            d: 200,
            r: 255,
            g: 20,
            b: 100,
        },
        duration: 2,
        starttime: 1,
        easing: (t) => easeInOutCubic(thereNBackNThere(t)),
    })
    .addScene({
        actor: bg,
        target: {
            r: 255,
            g: 255,
            b: 255,
        },
        duration: 5,
        starttime: 3,
    })
    .addScene({
        actor: circle1,
        target: {
            d: 50,
        },
        duration: 5,
        starttime: 3,
        easing: (t) => easeInOutCubic(thereNBack(t)),
        loop: true,
    });

function setup() {
    frameRate(60);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(bg.r, bg.g, bg.b);

    fill(circle1.r, circle1.g, circle1.b);
    circle(circle1.x, circle1.y, circle1.d / 2);

    fill(circle2.r, circle2.g, circle2.b);
    circle(circle2.x, circle2.y, circle2.d / 2);

    act.step(1 / 60);
}