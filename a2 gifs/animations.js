// You can change this,
// but will need to change swatch-holder's tile settings in CSS
const SWATCH_SIZE = 300;

// Looping Animation inspirations
// https://www.thisiscolossal.com/2018/11/hand-drawn-gifs-by-benjamin-zimmerman/
// https://www.thisiscolossal.com/2018/04/animation-of-sinusoidal-waves-in-gifs-by-etienne-jacob/
// https://www.thisiscolossal.com/2018/08/gifs-by-marcus-martinez/
//

let animations = [
  //================================================
  // TODO: Copy and paste this example to make your own animations

  {
    title: "Starry Night",
    description: "",
    isActive: true, // Set this to "true" to show this animation

    setup(p) {},
    draw(p, t) {
      p.background(11, 55, 5, 0.7);
      p.stroke(2);

      let count = 100;
      for (var i = 0; i < count; i++) {
        p.fill(120, 10, 96);
        let x = (i * 10) % p.width;

        //         Start at some position
        let y = 10 + 1000 * p.noise(i);

        // "Fall" at some rate
        y += t * (0.02 + i);

        //   Wrap vertically
        y = (y % p.height) + 1;

        //         Sideways wiggle, I don't like it yet...
        // x += (100 + i)*p.noise(y*.001, t*.2)

        x += Math.random() * 10;

        y += Math.random() * 8;
        p.stroke("#222222");
        p.strokeWeight(4);

        p.noStroke(9);
        // Make "closer" ones bigger
        let r = 1 + 0.04 * i;
        p.circle(x, y, r);
      }
    },
  },

  {
    title: "Tiger eye",
    description: "",
    isActive: true, // Set this to "true" to show this animation

    setup(p) {
      this.loopTime = 3;
    },
    draw(p, t) {
      let pct = (t % this.loopTime) / this.loopTime;

      // Draw something here!
      p.background(24, 100, 50);

      let sunHue = 20;
      // Set the color!
      p.fill(sunHue, 0, 5);
      p.stroke(sunHue, 60, 90);

      // Move to the center
      p.push();
      p.translate(p.width / 2, p.height / 2);

      // Draw the sun's center
      p.circle(0, 0, 60);
      p.fill(sunHue, 70, 10);
      p.circle(0, 0, 30);

      let count = 100;
      let theta = (Math.PI * 2) / count;
      for (var i = 0; i < count; i++) {
        p.rotate(theta);
        let lineLength = 500 * p.noise(i * 0.1, t * 2);
        p.line(0, 0, lineLength, 0);
        let x = p.width * p.noise(t);
        let y = p.height * p.noise(t + 1);
        let r = 150;

        p.fill(9);
        p.circle(x, y, r);
      }

      // Draw rotating clouds

      function drawClouds(radius, size, cloudCount) {
        let dTheta = (Math.PI * 2) / cloudCount;
        for (var i = 0; i < cloudCount; i++) {
          let theta = dTheta * i;
          // We want this cloud to move..one step over in this time
          theta += pct * dTheta;

          p.push();
          p.rotate(theta);
          p.translate(0, -radius);

          // Make cloud shapes
          p.scale(size);

          for (var j = 0; j < 1; j++) {
            // By the pct=1, get to where the NEXT i starts
            let i2 = i + pct;
            let x = 0;
            let y = Math.sin(Math.PI * 2 * i2);

            p.noStroke();
            p.fill(0, 0, 0, 0.3);
            p.ellipse(x, y - 0.2, 2, 1);

            p.fill(329, 100, 90);
            p.ellipse(x, y, 2, 1);
          }

          p.pop();
        }
      }

      drawClouds(50, 40, 100);
      // drawClouds(140, 10, 8);

      p.pop();
    },
  },

  //================================================
  // An example
  {
    title: "War",
    description: "",
    isActive: true,

    /**
     * TODO: Read this!
     * Setup and draw both have a "p" parameter
     * This is the P5 object.
     *
     * All of the built-in drawing tools from P5
     *  are methods on this object
     *
     * If you use any P5 tutorials, usually you will have to
     *  add "p." in front of their commands
     * e.g.  "rect(0,0,100,300)" => "p.rect(0,0,100,300)"
     *
     * "t" is the seconds that this app has been open
     * You can use that do drive location color, etc
     */

    setup(p) {
      p.background(80, 55, 26);
    },

    draw(p, t) {
      //p.background(0, 0, 0.2);

      // Fun trick: make a semi-transparent background (opacity .02)
      //  in order to have the older parts of the drawing "fade away"
      // p.background(0, 0, 0, .02)

      // Any color in the rainbow
      // let hue = Math.random() * 360;
      let hue = Math.random() * 1.5;

      // Use this line instead for just blue circles
      // let hue = Math.random()*50 + 150

      // Ternary operator: there's a 30% chance of orange, 70% chance of green
      // let hue = (Math.random()<.3?20:170) + 30*Math.random()

      // Use the time
      // let hue = t*100

      let sat = 100;
      let brightness = 20;
      let opacity = Math.random();

      p.noStroke();
      p.fill(hue % 360, sat, brightness, opacity);

      let r = Math.random() * 10 + 10;
      let x = Math.random() * p.width;
      let y = Math.random() * p.height;
      p.circle(x, y, r);
      p.noStroke();
      p.fill(hue % 360, sat, brightness + 5, opacity);
      p.circle(x, y, r + 5);
    },
  },

  //================================================
  // An example

  {
    title: "Movement",
    description:
      "How can you control movement? We can time to drive the animation, using functions like the sine wave and perlin noise",
    isActive: false,

    setup(p) {
      // Draw this once at the beginning
      p.background(0, 0, 0);
    },

    draw(p, t) {
      p.background(0, 0, 0, 0.1);
      // The center of the swatch is at (p.width/2, p.height/2)
      // let x = p.width * (0.5 + 0.5 * Math.sin(t));
      // // let y = p.height * 0.5;
      // let y = p.height * (.5 + .5 * Math.sin(10*t))
      // let r = 100;

      // Perlin noise
      // A way to get smooth motion, but not predictable
      let x = p.width * p.noise(t);
      let y = p.height * p.noise(t + 100);
      let r = 100;

      p.fill(100);
      p.circle(x, y, r);
    },
  },

  //================================================
  // An example

  {
    title: "polar coordinates",
    description: "",
    isActive: false,

    setup(p) {
      p.background(0, 0, 0, 0);

      // You can also store information on the swatch
      this.theta = 0;
    },
    draw(p, t) {
      p.background(0, 0, 0, 0.02);
      this.theta += 0.04;

      let centerX = p.width / 2;
      let centerY = p.height / 2;

      // let radius = 100
      let radius = 100 * Math.sin(t);
      // let radius = 100*p.noise(t)
      // let radius = 100*p.noise(t*10)

      let x = radius * Math.cos(this.theta) + centerX;
      let y = radius * Math.sin(this.theta) + centerY;
      let r = 10;

      p.noStroke();
      p.fill(100);
      p.circle(x, y, r);
    },
  },

  //================================================
  // For-Loops example

  {
    title: "For-loops",
    description: "Use a loop to create <i>many</i> of something",
    isActive: false,

    setup(p) {
      this.loopTime = 5;
    },
    draw(p, t) {
      p.background(70);
      p.fill(0);
      p.text(t.toFixed(2), 10, 40);

      //       How many tiles and how big are they?
      let count = 10;
      let tileSize = p.width / count;

      for (let i = 0; i < count; i++) {
        let x = tileSize * (i + 0.5);
        let y = p.height / 2;

        let hue = i * 20 + t * 100;

        hue %= 360; // Wrap the hue around 360 degrees, P5 can't handle >360 hues

        // Reusing the hue allows us to make a dropshadow
        //  and a highlight in the same color family

        // Dropshadow
        p.fill(hue, 100, 20);
        p.noStroke();
        p.ellipse(x, y + tileSize / 2, tileSize, tileSize * 0.5);

        // Main circle
        p.fill(hue, 100, 40);
        p.stroke(hue, 100, 20);
        p.circle(x, y, tileSize);

        // Highlight
        p.fill(hue, 100, 60);
        p.noStroke();
        p.circle(x - tileSize * 0.05, y - tileSize * 0.05, tileSize * 0.8);

        p.fill(hue, 100, 80);
        p.noStroke();
        p.circle(x - tileSize * 0.1, y - tileSize * 0.1, tileSize * 0.5);
      }
    },
  },

  //================================================
  // For-Loops example

  {
    title: "Transformation",
    description:
      "Push/pop transformations let you rotate, scale, and more! Watch the <a href='https://www.youtube.com/watch?v=o9sgjuh-CBM'>Coding Train explanation</a> for more",
    isActive: false,

    setup(p) {
      this.loopTime = 5;
    },
    draw(p, t) {
      p.background(70);
      p.fill(0);

      p.push();
      //       Move to the center of the canvas
      p.translate(p.width / 2, p.height / 2);
      p.noStroke();
      p.fill(0, 0, 0, 0.5);
      // Notice that now a circle at 0,0 is in the MIDDLE!
      p.circle(0, 0, 200);

      let count = 10;
      let petalLength = 100;
      let petalWidth = 40;
      let dTheta = (2 * Math.PI) / count;

      let flowerHue = (320 + t * 50) % 360;
      p.fill(320, 100, 50);

      // Draw a flower by rotating before drawing each petal
      for (let i = 0; i < count; i++) {
        p.push();
        p.rotate(i * dTheta);

        p.fill(flowerHue, 100, 50);
        p.ellipse(petalLength * 0.9, 0, petalLength, petalWidth);

        // Petal highlight
        p.fill(flowerHue, 100, 70);
        p.ellipse(petalLength * 0.9, 0, petalLength * 0.6, petalWidth * 0.6);

        p.pop();
      }

      p.fill(50, 100, 50);
      p.circle(0, 0, 40);

      // Show that rectangles rotate too!
      for (let i = 0; i < count; i++) {
        p.push();
        p.rotate(i * dTheta + t);

        p.fill(40, 100, 90);
        p.rect(0, 20, 5, 20);

        p.pop();
      }

      p.pop();
    },
  },

  //================================================
  // Functions

  {
    title: "Functions to reuse code",
    description:
      "If you put your code in a function, you can call it many times. This works great if you use transformations to move or resize before calling the function",
    isActive: false,

    setup(p) {
      //       A function to draw a flower, of some hue and petal count
      function drawFlower(hue, count) {
        let petalLength = 100;
        let petalWidth = 40;
        let dTheta = (2 * Math.PI) / count;

        p.noStroke();

        // Draw a flower by rotating before drawing each petal
        for (let i = 0; i < count; i++) {
          p.push();
          p.rotate(i * dTheta);

          p.fill(hue, 100, 50);
          p.ellipse(petalLength * 0.5, 0, petalLength, petalWidth);

          // Petal highlight
          p.fill(hue, 100, 70);
          p.ellipse(petalLength * 0.4, 0, petalLength * 0.6, petalWidth * 0.6);

          p.pop();
        }

        p.fill(50, 100, 50);
        p.circle(0, 0, 40);
      }

      // Use the function to draw *many* flowers!
      let flowerCount = 20;
      for (let i = 0; i < flowerCount; i++) {
        p.push();

        // Draw from back to front, and make "closer" flowers bigger and lower down
        let x = Math.random() * p.width;
        let y = i * 10;
        let size = 0.1 + i * 0.03;

        p.translate(x, y);
        p.scale(size);
        let hue = (Math.random() * 120 + 200) % 360;
        let petalCount = Math.floor(Math.random() * 10 + 5);
        drawFlower(hue, petalCount);

        p.pop();
      }
    },
    draw(p, t) {},
  },

  //================================================
  // Double For-Loops example

  {
    title: "Nested For-loops with noise",
    description:
      "You can use a nested for-loop to make a grid.  This goes well with perlin noise, which can take three parameters (imagine a 2d slice of a 3d noise cube)",
    isActive: false,

    setup(p) {
      this.loopTime = 5;
    },
    draw(p, t) {
      p.background(70);
      p.fill(0);
      // How many tiles and how big are they?
      let count = 20;
      let tileSize = p.width / count;
      let noiseScale = 0.01;

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          let x = tileSize * i;
          let y = tileSize * j;

          let hue = 700 * p.noise(x * noiseScale, y * noiseScale, t + 100);

          hue %= 360; // Wrap the hue around 306 degrees, P5 can't handle >360 hues
          p.fill(hue % 360, 100, 50, 1);
          p.noStroke();
          p.rect(x, y, tileSize * 0.9);
        }
      }
    },
  },

  //================================================
  // Make lots of emoji

  {
    title: "Emoji!",
    description: "Text is an easy way to make images",
    isActive: false,

    setup(p) {
      p.background(70);
      let emoji =
        "🤲 👐 🙌 👏 🤝 👍 👎 👊 ✊ 🤛 🤜 🤞 ✌️ 🤟 🤘 👌 🤏 👈 👉 👆 👇 ☝️ ✋ 🤚 🖐 🖖 🤙 💪 🖕 ✍️ 🙏 💅 🤝 🤗 🙋‍♀️ 🙆‍♂️ 🤦‍♂️".split(
          " "
        );
      // How many tiles and how big are they?
      let count = 20;
      let tileSize = p.width / count;
      let noiseScale = 0.01;

      for (let i = 0; i < count; i++) {
        for (let j = 0; j < count; j++) {
          let x = tileSize * i;
          let y = tileSize * j;

          let randomEmoji = p.random(emoji);
          p.text(randomEmoji, x, y);
        }
      }
    },
    draw(p, t) {
      // Perlin noise
      // A way to get smooth motion, but not predictable
      let x = p.width * p.noise(t * 0.2);
      let y = p.height * p.noise(t * 0.3 + 100);
      let theta = 30 * p.noise(t * 0.1);

      // Big centered text
      p.textSize(50);
      p.textAlign(p.CENTER);

      // White text with a black outline
      p.fill(100);
      p.stroke(0);

      p.push();
      p.translate(x, y);

      p.rotate(theta);
      p.text("Emoji! 💜", 0, 0);
      p.pop();
    },
  },

  // Going *around* the screen
  {
    isActive: false,
    title: "'Looping' around the screen",

    setup() {},
    draw: function (p, t) {
      // Each frame, draw a light gray background
      // p.background(0, 0, 80, 0)

      for (var i = 0; i < 40; i++) {
        // Go from right to left, with a noise move downward
        let x = t * 70 + i * 20;
        let y = t * 70 + i * 5 + 100 * p.noise(t + i * 0.1);

        // Loop around!
        x %= p.width;
        y %= p.height;

        let hue = (t * 50 + i) % 360;
        let circleRadius = 10;

        //         Using an exponent (ie, 0.3 ^ 3)
        // pushes values closer to 0, unless they are near 1

        let saturation = 300 * p.noise(t) ** 3;

        // Make a drop shadow
        p.noStroke();
        p.fill(hue, saturation, 0, 0.1);
        p.circle(x, y + 10, circleRadius * 1);

        p.fill(hue, saturation, 100 - 0.5 * saturation);
        p.circle(x, y, circleRadius);
      }
    },
  },

  //================================================
  // Seamless Looping example

  {
    title: "Looping",
    description: "Unimpressive looping, better looping examples incoming!",
    isActive: false,

    setup(p) {
      this.loopTime = 5;
    },
    draw(p, t) {
      // Remember how I said % (modulo) was good for looping?
      // This turns t, a value that goes up indefinitely
      // into pct, a value that loops from 0 to 1
      let pct = (t % this.loopTime) / this.loopTime;

      p.background(180, 50, 90);

      // Printing text is a great way to debug
      p.text("Time: " + t.toFixed(2), 10, 20);
      p.text("Loop: " + pct.toFixed(2), 10, 40);

      let x = pct * p.width;
      let y = pct * p.height;
      let r = 10;
      p.fill(0);
      p.circle(x, y, r);
    },
  },

  {
    title: "Fireworks",
    description: "",
    isActive: true,

    setup(p) {
      this.loopTime = 4;
    },
    draw(p, t) {
      p.background(100, 0, 10, 0.01);

      // How many seconds long is our loop?  You can use that to time your gifs

      let cyclePct = (t / this.loopTime) % 1;

      let count = 30;

      // Move to the center
      p.push();
      p.translate(p.width / 2, p.height / 2);

      for (var i = 0; i < count; i++) {
        // If we have N particles, each one only has to go
        // dTheta radians to get to the next particles start point
        let dTheta = (Math.PI * 4) / count;

        // Start at dTheta*i, end up at dTheta*(1 + i)
        let i2 = i + cyclePct;
        let theta = i2 * dTheta;

        // Start at dTheta*i, end up at dTheta*(1 + i)
        let polarRadius = 80 + 80 * Math.cos(Math.PI * i2);

        let circleRadius = 2 * (1.2 + Math.sin(Math.PI * i2));

        // Loop all the way around the color wheel
        let hue = (i2 * 360) / count;
        p.fill(hue, 100, 100);
        p.stroke(hue, 60, 20);

        let x = polarRadius * Math.cos(theta);
        let y = polarRadius * Math.sin(theta);
        p.circle(x, y, circleRadius);
      }

      p.pop();
    },
  },

  {
    title: "In class looping",
    description: "Examples of some looping",
    isActive: false, // Set this to "true" to show this animation

    setup(p) {
      this.loopTime = 2;
    },
    draw(p, t) {
      p.noStroke();
      p.background(100);
      // Remember how I said % (modulo) was good for looping?
      // This turns t, a value that goes up indefinitely
      // into pct, a value that loops from 0 to 1
      let pct = (t % this.loopTime) / this.loopTime;
      //       This one is in radians, for things that go around a circle
      let pctTheta = Math.PI * 2 * pct;

      p.fill(0);
      p.text(pct.toFixed(2), 10, 40);

      // Replacement looping
      // This circle "becomes" the background
      let radius = pct * 500;
      p.fill(0, 0, pct * 100);
      p.circle(p.width / 2, p.height / 2, radius);

      // Invisible-to-invisible looping
      // You can use offsets in any cos/sin behavior to change timing
      let opacity = Math.cos(pctTheta) * 0.5 + 0.5;
      p.fill(0);
      p.fill(10, 100, 50, opacity);
      p.rect(0, 0, 40, 40);

      let opacity2 = Math.cos(pctTheta + Math.PI) * 0.5 + 0.5;
      p.fill(40, 100, 50, opacity2);
      p.rect(40, 0, 40, 40);

      // Draw multiple circles in multiple locations
      let x = pct * p.width;
      // x = 50
      let hue = pct * 360;
      p.fill(hue, 100, 50);

      p.push();
      p.scale(1, Math.sin(pctTheta) * 0.2 + 1);
      p.circle(x, 100, 100);
      p.circle(x + p.width, 100, 100);
      p.circle(x - p.width, 100, 100);
      p.pop();

      // Rotating - easy mode looping
      p.push();
      p.translate(p.width / 2, p.height / 2);

      // What is the rotation ALL THE WAY aroudn the circle
      let theta = p.map(pct, 0, 1, 0, Math.PI * 2);
      // p.rotate(theta);
      // everythign in here make a full circle
      //       Rotating rectangle
      //       p.push()
      //       let count = 19

      //       for (var i = 0; i < count; i++) {
      //        let x = 100*p.noise(i + 10)
      //        let y = 100*p.noise(i)
      //         let w = 10;
      //         p.rect(x + -w / 2, y+  -w / 2, w, w);
      //       }
      //       p.pop()

      p.pop();
    },
  },
];
