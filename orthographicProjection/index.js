const contextZY = document.querySelector("#zy").getContext("2d");
const contextXZ = document.querySelector("#xz").getContext("2d");
const contextXY = document.querySelector("#xy").getContext("2d");

const paramethers = {
  degreeRotationX: 0,
  degreeRotationY: 0,
  degreeRotationZ: 0
}

const guiParamethers = {
  degreeRotationX: 0,
  degreeRotationY: 0,
  degreeRotationZ: 0
}

initDatGui()
start()

function initDatGui() {
  let gui = new dat.GUI();

  const controller = []

  controller.push(gui.add(guiParamethers, "degreeRotationX", 0, 360).step(1).name("Degree of rotation X:"))
  controller.push(gui.add(guiParamethers, "degreeRotationY", 0, 360).step(1).name("Degree of rotation Y:"))
  controller.push(gui.add(guiParamethers, "degreeRotationZ", 0, 360).step(1).name("Degree of rotation Z:"))

  controller.forEach(field => {
    field.onChange(() => {
      paramethers[field.property] = guiParamethers[field.property] * Math.PI / 180
      start()
    })
  });
}

function start() {
  clearCanvas(contextZY)
  initField(contextZY, "z", "y")
  clearCanvas(contextXZ)
  initField(contextXZ, "x", "z")
  clearCanvas(contextXY)
  initField(contextXY, "x", "y")

  const dots = initDots()

  draw(contextZY, projection(dots, 2, 1, "ZY"))
  draw(contextXZ, projection(dots, 0, 2, "XZ"))
  draw(contextXY, projection(dots, 0, 1, "XY"))
}

function draw(context, dots) {
  context.lineWidth = 3;
  context.beginPath();

  for (let i = 0; i < dots.length; i++) {
    for (let j = 0; j < dots[i].connection.length; j++) {
      const connection = dots[i].connection[j]
      context.moveTo(dots[i].coordinate.x, dots[i].coordinate.y)
      context.lineTo(dots[connection].coordinate.x, dots[connection].coordinate.y);
    }
  }

  context.stroke();
}

function initField(context, axisHorizontal, axisVertical) {
  context.lineWidth = 1;
  context.beginPath();

  for (let y = 0; y < document.querySelector("canvas").height; y += 50) {
    context.moveTo(0, y)
    context.lineTo(document.querySelector("canvas").width, y);
    context.font = "13px normal";
    context.fillStyle = "#ff0000";
    context.fillText(y + "px", 10, y);
  }

  for (let x = 0; x < document.querySelector("canvas").width; x += 50) {
    context.moveTo(x, 0)
    context.lineTo(x, document.querySelector("canvas").height);
    context.font = "13px normal";
    context.fillStyle = "#ff0000";
    context.fillText(x + "px", x, 10);
  }
  context.stroke();

  //начало координат
  context.font = "25px normal";
  context.fillStyle = "#000000";
  context.fillText("О", 5, 20);
  context.font = "20px normal";
  context.fillText(axisHorizontal, 30, 15);
  context.fillText(axisVertical, 5, 35);
}

function clearCanvas(context) {
  context.fillStyle = "#ffffff";
  context.clearRect(0, 0, document.querySelector("canvas").width, document.querySelector("canvas").height);
}

function initDots() {
  const dots = []

  //chort left horn
  dots.push({ index: 0, coordinate: { x: 50, y: 200, z: 300 }, connection: [1, 2, 3, 4] })
  dots.push({ index: 1, coordinate: { x: 60, y: 280, z: 265 }, connection: [2, 3] })
  dots.push({ index: 2, coordinate: { x: 55, y: 270, z: 255 }, connection: [4] })
  dots.push({ index: 3, coordinate: { x: 70, y: 260, z: 258 }, connection: [4] })
  dots.push({ index: 4, coordinate: { x: 55, y: 250, z: 245 }, connection: [] })

  dots.push({ index: 5, coordinate: { x: 70, y: 290, z: 250 }, connection: [1] })
  dots.push({ index: 6, coordinate: { x: 76, y: 271, z: 254 }, connection: [3, 1, 5] })
  dots.push({ index: 7, coordinate: { x: 57, y: 284, z: 252 }, connection: [2, 1, 5] })

  dots.push({ index: 8, coordinate: { x: 66, y: 287, z: 215 }, connection: [5, 9, 10] })
  dots.push({ index: 9, coordinate: { x: 81, y: 268, z: 223 }, connection: [6, 11] })
  dots.push({ index: 10, coordinate: { x: 47, y: 281, z: 225 }, connection: [7, 11] })
  dots.push({ index: 11, coordinate: { x: 56, y: 247, z: 230 }, connection: [4] })

  dots.push({ index: 12, coordinate: { x: 61, y: 263, z: 170 }, connection: [8, 13, 14] })
  dots.push({ index: 13, coordinate: { x: 86, y: 255, z: 201 }, connection: [9, 15] })
  dots.push({ index: 14, coordinate: { x: 42, y: 269, z: 198 }, connection: [10, 15] })
  dots.push({ index: 15, coordinate: { x: 58, y: 238, z: 215 }, connection: [11] })

  dots.push({ index: 16, coordinate: { x: 57, y: 221, z: 140 }, connection: [12, 17, 18] })
  dots.push({ index: 17, coordinate: { x: 89, y: 232, z: 179 }, connection: [13, 19] })
  dots.push({ index: 18, coordinate: { x: 37, y: 251, z: 176 }, connection: [14, 19] })
  dots.push({ index: 19, coordinate: { x: 60, y: 221, z: 197 }, connection: [15] })

  dots.push({ index: 20, coordinate: { x: 52, y: 189, z: 130 }, connection: [16, 21, 22] })
  dots.push({ index: 21, coordinate: { x: 91, y: 208, z: 171 }, connection: [17, 23] })
  dots.push({ index: 22, coordinate: { x: 32, y: 220, z: 168 }, connection: [18, 23] })
  dots.push({ index: 23, coordinate: { x: 61, y: 209, z: 189 }, connection: [19] })

  dots.push({ index: 24, coordinate: { x: 50, y: 164, z: 132 }, connection: [20, 25, 26] })
  dots.push({ index: 25, coordinate: { x: 93, y: 188, z: 172 }, connection: [21, 27] })
  dots.push({ index: 26, coordinate: { x: 29, y: 197, z: 166 }, connection: [22, 27] })
  dots.push({ index: 27, coordinate: { x: 62, y: 193, z: 190 }, connection: [23] })

  dots.push({ index: 28, coordinate: { x: 52, y: 139, z: 143 }, connection: [24, 29, 30] })
  dots.push({ index: 29, coordinate: { x: 94, y: 172, z: 173 }, connection: [25, 31] })
  dots.push({ index: 30, coordinate: { x: 30, y: 176, z: 165 }, connection: [26, 31] })
  dots.push({ index: 31, coordinate: { x: 63, y: 179, z: 191 }, connection: [27] })

  dots.push({ index: 32, coordinate: { x: 55, y: 120, z: 167 }, connection: [28, 33, 34] })
  dots.push({ index: 33, coordinate: { x: 95, y: 153, z: 174 }, connection: [29, 35] })
  dots.push({ index: 34, coordinate: { x: 31, y: 154, z: 167 }, connection: [30, 35] })
  dots.push({ index: 35, coordinate: { x: 65, y: 166, z: 192 }, connection: [31] })

  dots.push({ index: 36, coordinate: { x: 60, y: 115, z: 196 }, connection: [32, 37, 38] })
  dots.push({ index: 37, coordinate: { x: 98, y: 147, z: 195 }, connection: [33, 39] })
  dots.push({ index: 38, coordinate: { x: 35, y: 145, z: 194 }, connection: [34, 39] })
  dots.push({ index: 39, coordinate: { x: 68, y: 160, z: 209 }, connection: [35] })

  dots.push({ index: 40, coordinate: { x: 68, y: 113, z: 220 }, connection: [36, 41, 42] })
  dots.push({ index: 41, coordinate: { x: 103, y: 142, z: 216 }, connection: [37, 43] })
  dots.push({ index: 42, coordinate: { x: 46, y: 140, z: 219 }, connection: [38, 43] })
  dots.push({ index: 43, coordinate: { x: 73, y: 158, z: 219 }, connection: [39] })

  dots.push({ index: 44, coordinate: { x: 83, y: 117, z: 240 }, connection: [40, 45, 46] })
  dots.push({ index: 45, coordinate: { x: 109, y: 144, z: 225 }, connection: [41, 47] })
  dots.push({ index: 46, coordinate: { x: 56, y: 143, z: 240 }, connection: [42, 47] })
  dots.push({ index: 47, coordinate: { x: 79, y: 160, z: 230 }, connection: [43] })

  dots.push({ index: 48, coordinate: { x: 100, y: 126, z: 260 }, connection: [44, 49, 50] })
  dots.push({ index: 49, coordinate: { x: 116, y: 148, z: 236 }, connection: [45, 51] })
  dots.push({ index: 50, coordinate: { x: 67, y: 148, z: 257 }, connection: [46, 51] })
  dots.push({ index: 51, coordinate: { x: 84, y: 163, z: 242 }, connection: [47] })


  //TO DO remake and crate 1 more
  dots.push({ index: 52, coordinate: { x: 121, y: 151, z: 273 }, connection: [48, 53, 54] })
  dots.push({ index: 53, coordinate: { x: 125, y: 159, z: 245 }, connection: [49, 55] })
  dots.push({ index: 54, coordinate: { x: 80, y: 162, z: 279 }, connection: [50, 55] })
  dots.push({ index: 55, coordinate: { x: 87, y: 169, z: 252 }, connection: [51] })

  //chort skull up part
  dots.push({ index: 56, coordinate: { x: 150, y: 147, z: 268 }, connection: [52, 57] })
  dots.push({ index: 57, coordinate: { x: 150, y: 154, z: 245 }, connection: [53] })

  dots.push({ index: 58, coordinate: { x: 150, y: 160, z: 292 }, connection: [56, 52] })
  dots.push({ index: 59, coordinate: { x: 122, y: 164, z: 290 }, connection: [52, 58] })

  dots.push({ index: 60, coordinate: { x: 150, y: 181, z: 313 }, connection: [58] })
  dots.push({ index: 61, coordinate: { x: 121, y: 183, z: 311 }, connection: [59, 60] })

  dots.push({ index: 62, coordinate: { x: 150, y: 206, z: 315 }, connection: [60] })
  dots.push({ index: 63, coordinate: { x: 120, y: 204, z: 313 }, connection: [61, 62] })

  dots.push({ index: 64, coordinate: { x: 150, y: 235, z: 313 }, connection: [62] })
  dots.push({ index: 65, coordinate: { x: 121, y: 227, z: 311 }, connection: [63, 64] })

  dots.push({ index: 66, coordinate: { x: 93, y: 168, z: 289 }, connection: [54, 58] })

  dots.push({ index: 67, coordinate: { x: 94, y: 177, z: 298 }, connection: [66, 59] })
  dots.push({ index: 68, coordinate: { x: 92, y: 186, z: 305 }, connection: [67, 61] })
  dots.push({ index: 69, coordinate: { x: 91, y: 201, z: 306 }, connection: [68, 63] })
  dots.push({ index: 70, coordinate: { x: 90, y: 226, z: 304 }, connection: [69, 65] })

  dots.push({ index: 71, coordinate: { x: 149, y: 246, z: 303 }, connection: [64] })
  dots.push({ index: 72, coordinate: { x: 122, y: 238, z: 301 }, connection: [65] })
  dots.push({ index: 73, coordinate: { x: 91, y: 238, z: 294 }, connection: [70] })


  //chort eye
  dots.push({ index: 74, coordinate: { x: 136, y: 241, z: 302 }, connection: [71, 72] })
  dots.push({ index: 75, coordinate: { x: 104, y: 235, z: 298 }, connection: [72, 73] })
  dots.push({ index: 76, coordinate: { x: 89, y: 243, z: 294 }, connection: [73] })
  dots.push({ index: 77, coordinate: { x: 91, y: 250, z: 294 }, connection: [76] })
  dots.push({ index: 78, coordinate: { x: 94, y: 257, z: 294 }, connection: [77] })
  dots.push({ index: 79, coordinate: { x: 100, y: 262, z: 294 }, connection: [78] })
  dots.push({ index: 80, coordinate: { x: 114, y: 262, z: 294 }, connection: [79] })
  dots.push({ index: 81, coordinate: { x: 123, y: 260, z: 295 }, connection: [80] })
  dots.push({ index: 82, coordinate: { x: 134, y: 251, z: 296 }, connection: [81] })
  dots.push({ index: 83, coordinate: { x: 137, y: 248, z: 297 }, connection: [82, 74, 71] })

  //chort nose
  dots.push({ index: 84, coordinate: { x: 150, y: 268, z: 306 }, connection: [71, 85] })
  dots.push({ index: 85, coordinate: { x: 137, y: 273, z: 303 }, connection: [83, 86] })
  dots.push({ index: 86, coordinate: { x: 123, y: 277, z: 299 }, connection: [81] })

  dots.push({ index: 87, coordinate: { x: 150, y: 279, z: 299 }, connection: [84, 85, 86] })

  //add right part
  const leftPartCount = dots.length;
  for (let i = 0; i < leftPartCount; i++) {
    const dot = JSON.parse(JSON.stringify(dots[i]))

    dot.index += leftPartCount;
    for (let j = 0; j < dot.connection.length; j++) {
      dot.connection[j] += leftPartCount
      console.log(dot)
    }
    dot.coordinate.x += 2 * (150 - dot.coordinate.x)
    dots.push(dot)
  }

  // piramidka 
  // dots.push({ index: 0, coordinate: { x: 100, y: 300, z: 300 }, connection: [1, 2, 3] })
  // dots.push({ index: 1, coordinate: { x: 150, y: 200, z: 300 }, connection: [2, 3] })
  // dots.push({ index: 2, coordinate: { x: 200, y: 300, z: 300 }, connection: [3] })
  // dots.push({ index: 3, coordinate: { x: 150, y: 250, z: 400 }, connection: [] })

  return dots
}

function getAxisMatrix(axis) {
  let matrix = []

  if (axis == "ZY") {
    matrix = [
      [0, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ]
  } else if (axis == "XZ") {
    matrix = [
      [1, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];
  } else if (axis == "XY") {
    matrix = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 1]
    ];
  }

  return matrix
}

function projection(startDots, x, y, axis) {
  const dots = JSON.parse(JSON.stringify(startDots))
  const matrix0 = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [-150, -250, -350, 1]
  ];
  const matrix9 = [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [150, 250, 350, 1]
  ];
  const RotateX = [
    [1, 0, 0, 0],
    [0, Math.cos(paramethers.degreeRotationX), Math.sin(paramethers.degreeRotationX), 0],
    [0, -Math.sin(paramethers.degreeRotationX), Math.cos(paramethers.degreeRotationX), 0],
    [0, 0, 0, 1]
  ];
  const RotateY = [
    [Math.cos(paramethers.degreeRotationY), 0, -Math.sin(paramethers.degreeRotationY), 0],
    [0, 1, 0, 0],
    [Math.sin(paramethers.degreeRotationY), 0, Math.cos(paramethers.degreeRotationY), 0],
    [0, 0, 0, 1]
  ];
  const RotateZ = [
    [Math.cos(paramethers.degreeRotationZ), Math.sin(paramethers.degreeRotationZ), 0, 0],
    [-Math.sin(paramethers.degreeRotationZ), Math.cos(paramethers.degreeRotationZ), 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
  ];
  const matrix = getAxisMatrix(axis)

  for (let i = 0; i < dots.length; i++) {
    let vec0 = [dots[i].coordinate.x, dots[i].coordinate.y, dots[i].coordinate.z, 1]
    let v2 = multiplyVector(vec0, matrix0)
    let vx = multiplyVector(v2, RotateX)
    let vy = multiplyVector(vx, RotateY)
    let vz = multiplyVector(vy, RotateZ)
    let v4 = multiplyVector(vz, matrix9)
    let vec = multiplyVector(v4, matrix)

    dots[i].coordinate.x = vec[x]
    dots[i].coordinate.y = vec[y]
  }

  return dots
}

function TransMatrix(A) {
  let m = A.length, n = A[0].length, AT = [];
  for (let i = 0; i < n; i++) {
    AT[i] = [];
    for (let j = 0; j < m; j++) AT[i][j] = A[j][i];
  }
  return AT;
}

function multiplyVector(v, m) {
  let result = [];
  m = TransMatrix(m);
  for (let i = 0; i < m.length; i++) {
    let sum = 0;
    for (let j = 0; j < m.length; j++) {
      sum += m[i][j] * v[j];
    }
    result[i] = sum;
  }
  return result;
}