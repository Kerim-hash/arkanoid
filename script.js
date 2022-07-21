const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = 500;
canvas.height = 500;

let image = new Image();
image.src =  "image.png"

const atals = {
  ball : {
    x: 182,
    y: 60,
    w: 32,
    h: 32,
  },
  orange: {
    x: 432,
    y: 22,
    w: 54,
    h: 22
  },
  blue: {
    x: 324,
    y: 22,
    w: 54,
    h: 22
  },
  pink: {
    x: 485,
    y: 22,
    w: 54,
    h: 22
  },
  platforma: {
    x: 276,
    y: 300,
    w: 175,
    h: 32,
  }
}

// state
const ball = {
  x: canvas.width / 2,
  y: canvas.height - 90,
  width: 25,
  height: 25,
  speed: 200,
  angle: Math.PI / 4 + (Math.random() * Math.PI) / 2,
};

const platforma = {
  x: 10,
  y: canvas.height - 40,
  width: 175,
  height: 32,
  speed: 200,
  leftKey: false,
  rightKey: false,
};

const blocks = [
  {
    x: 50,
    y: 50,
    width: 50,
    height: 20,
    color: 'blue'
  },
  {
    x: 100,
    y: 50,
    width: 50,
    height: 20,
    color: 'pink'
  },
  {
    x: 150,
    y: 50,
    width: 50,
    height: 20,
    color: 'orange'
  },
  {
    x: 200,
    y: 50,
    width: 50,
    height: 20,
    color: 'blue'
  },
  {
    x: 250,
    y: 50,
    width: 50,
    height: 20,
    color: 'blue'
  },
  {
    x: 300,
    y: 50,
    width: 50,
    height: 20,
    color: 'blue'
  },
  {
    x: 50,
    y: 70,
    width: 50,
    height: 20,
    color: 'blue'
  },
  {
    x: 100,
    y: 70,
    width: 50,
    height: 20,
    color: 'pink'
  },
  {
    x: 150,
    y: 70,
    width: 50,
    height: 20,
    color: 'orange'
  },
  {
    x: 200,
    y: 70,
    width: 50,
    height: 20,
    color: 'blue'
  },
  {
    x: 250,
    y: 70,
    width: 50,
    height: 20,
    color: 'blue'
  },
  {
    x: 300,
    y: 70,
    width: 50,
    height: 20,
    color: 'blue'
  },
];

const limits = [
  { x: 0, y: -20, width: canvas.width, height: 20 },
  { x: canvas.width, y: 0, width: 20, height: canvas.height },
  { x: 0, y: canvas.height, width: canvas.width, height: 20 },
  { x: -20, y: 0, width: 20, height: canvas.height },
];
// addEventListener
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    platforma.leftKey = true;
  } else if (event.key === "ArrowRight") {
    platforma.rightKey = true;
  }
});
document.addEventListener("keyup", (event) => {
  if (event.key === "ArrowLeft") {
    platforma.leftKey = false;
  } else if (event.key === "ArrowRight") {
    platforma.rightKey = false;
  }
});

requestAnimationFrame(loop);

let pTimestamp = 0;
function loop(timestamp) {
  requestAnimationFrame(loop);

  const dTimestamp = Math.min(16.7, timestamp - pTimestamp);
  const secondPart = dTimestamp / 1000;
  pTimestamp = timestamp;

  clearCanvas();
 
  ball.x += secondPart * ball.speed * Math.cos(ball.angle);
  ball.y -= secondPart * ball.speed * Math.sin(ball.angle);

  if (platforma.leftKey) {
    platforma.x = Math.max(0, platforma.x - secondPart * platforma.speed);
  } else if (platforma.rightKey) {
    platforma.x = Math.min(
      canvas.width - platforma.width,
      platforma.x + secondPart * platforma.speed
    );
  }

  for (const block of blocks) {
    if (isIntersection(block, ball)) {
      toggleItem(blocks, block);

      const ctrl1 = {
        x: block.x - 10,
        y: block.y - 10,
        width: block.width + 10,
        height: 10,
      };
      const ctrl2 = {
        x: block.x - block.width,
        y: block.y - 10,
        width: 10,
        height: 10 + block.height,
      };
      const ctrl3 = {
        x: block.x,
        y: block.y + block.height,
        width: block.width + 10,
        height: 10,
      };
      const ctrl4 = {
        x: block.x - 10,
        y: block.y,
        width: 10,
        height: 10 + block.height,
      };

      if (isIntersection(ctrl1, ball) || isIntersection(ctrl3, ball)) {
        ball.angle = Math.PI * 2 - ball.angle;
      } else if (isIntersection(ctrl3, ball) || isIntersection(ctrl4, ball)) {
        ball.angle = Math.PI - ball.angle;
      }
    }
  }

  if(isIntersection(limits[2], ball)){
    alert('you lose')
    document.location.reload();
  }

  if (isIntersection(limits[0], ball) || isIntersection(limits[2], ball)) {
    ball.angle = Math.PI * 2 - ball.angle;
  }
  if (isIntersection(limits[1], ball) || isIntersection(limits[3], ball)) {
    ball.angle = Math.PI - ball.angle;
  }
  

  if (isIntersection(platforma, ball)) {
    const x = ball.x + ball.width / 2;
    const percent = (x - platforma.x) / platforma.width;
    ball.angle = Math.PI - Math.PI * 8 / 10 *( percent + 0.05)
  }
  drawBall(ball);
  for (const block of blocks) {
    dtawBlock(block);
  }
  drawPlatforma(platforma);
}

function clearCanvas() {
  canvas.width |= 0;
}

function drawPlatforma() {
  context.beginPath();
  context.drawImage(image, atals.platforma.x, atals.platforma.y, atals.platforma.w, atals.platforma.h,  platforma.x, platforma.y, platforma.width, platforma.height );
  context.stroke();
}

function drawBall() {
  context.beginPath();
  context.drawImage(image, atals.ball.x, atals.ball.y, atals.ball.w, atals.ball.h, ball.x, ball.y, ball.width, ball.height);
  context.stroke();
}

function dtawBlock(block) {
  context.beginPath();
  context.drawImage(image, atals[block.color].x, atals[block.color].y, atals[block.color].w, atals[block.color].h, block.x, block.y, block.width, block.height);
  context.stroke();

}

function isIntersection(blockA, blockB) {
  const pointsA = [
    {
      x: blockA.x,
      y: blockA.y,
    },
    {
      x: blockA.x + blockA.width,
      y: blockA.y,
    },
    {
      x: blockA.x,
      y: blockA.y + blockA.height,
    },
    {
      x: blockA.x + blockA.width,
      y: blockA.y + blockA.height,
    },
  ];

  for (const pointA of pointsA) {
    if (
      blockB.x <= pointA.x &&
      pointA.x <= blockB.x + blockB.width &&
      blockB.y <= pointA.y &&
      pointA.y <= blockB.y + blockB.height
    ) {
      return true;
    }
  }
  const pointsB = [
    {
      x: blockB.x,
      y: blockB.y,
    },
    {
      x: blockB.x + blockB.width,
      y: blockB.y,
    },
    {
      x: blockB.x,
      y: blockB.y + blockB.height,
    },
    {
      x: blockB.x + blockB.width,
      y: blockB.y + blockB.height,
    },
  ];

  for (const pointB of pointsB) {
    if (
      blockA.x <= pointB.x &&
      pointB.x <= blockA.x + blockA.width &&
      blockA.y <= pointB.y &&
      pointB.y <= blockA.y + blockA.height
    ) {
      return true;
    }
  }
  return false;
}

function toggleItem(arr, item) {
  if (arr.includes(item)) {
    const index = arr.indexOf(item);
    arr.splice(index, 1);
  } else {
    arr.push(item);
  }
}


