const canvas = document.querySelector("canvas");
const c = canvas.getContext("2d");

const getPlanetForOptions = (radius, velocity, orbitRadius, color) =>
    new Planet(
        canvas.width / 2,
        canvas.height / 2,
        radius,
        color,
        velocity / 1000,
        orbitRadius
    );
class Planet {
    constructor(x, y, radius, color, velocity, orbitRadius) {
        this.x = x;
        this.y = y;
        this.startingPos = {
            x, y
        }
        this.radian = 0;
        this.radius = radius;
        this.color = color;
        this.velocity = velocity;
        this.orbitRadius = orbitRadius;
    }

    draw() {
        // Planet Path
        c.beginPath();
        c.lineWidth = 2;
        c.arc(
            this.startingPos.x,
            this.startingPos.y,
            this.orbitRadius,
            0,
            Math.PI * 2,
            false
        );
        c.strokeStyle = "rgba(255, 255, 255, 0.10)";
        c.stroke();
        c.closePath();

        // Planet
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath();
    }

    update() {
        this.draw();
        // Update the x and y by the velocity.
        this.x += this.velocity;
        this.y += this.velocity;
        this.radian += this.velocity; // increase our angle every animation frame
        // Get the new x based on our new angle and radius
        this.x = this.startingPos.x + Math.cos(this.radian) * this.orbitRadius;
        // Get the new y based on our new angle and radius
        this.y = this.startingPos.y + Math.sin(this.radian) * this.orbitRadius;
    }
}


// Implementation.
let planets;
function init() {
    planets = [];

    planets.push(getPlanetForOptions(35, 0, 0, "yellow")); // Sun.
    planets.push(getPlanetForOptions(5, 6, 65, "gray")); // Mercury.
    planets.push(getPlanetForOptions(10, 5, 90, "orange")); // Venus.
    planets.push(getPlanetForOptions(15, 4, 125, "blue")); // Earth.
    planets.push(getPlanetForOptions(20, 3.5, 175, "red")); // Mars.
    planets.push(getPlanetForOptions(25, 3, 225, "orange")); // Jupiter.
    planets.push(getPlanetForOptions(20, 2.25, 275, "yellow")); // Saturn.
    planets.push(getPlanetForOptions(15, 2, 325, "blue")); // Uranus.
    planets.push(getPlanetForOptions(25, 1.5, 375, "purple")); // Neptune.
    planets.push(getPlanetForOptions(7, 1, 450, "gray")); // Pluto.
}

// Animation Loop.
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = "rgb(0, 0, 0)";
    c.fillRect(0, 0, canvas.width, canvas.height);
    planets.forEach(planet => {
        planet.update();
    });
}

init();
animate();