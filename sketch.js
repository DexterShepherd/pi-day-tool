
var speed, r, columns, rows, colorA, colorB, bg, bgSlider, rSlider, i, j, iSlider, jSlider;

function setup() {
  createCanvas(800, 800);
  r = 100.0;
  columns = 1;
  rows = 1;
  // colorA = color(252, 203, 144);
  // colorB = color(213, 126, 235);
  colorA = color(248, 54, 0);
  colorB = color(249, 212, 35);
  noStroke();

  i = 0;
  j = 0;

  bg = [89, 216, 230];

  background(bg);

  createElement('p', 'color a');
  createInput('', 'color').input(function() {
    colorA = color(hexToRgb(this.value()));
  });

  createElement('p', 'color b');
  createInput('', 'color').input(function() {
    colorB = color(hexToRgb(this.value()));
  });

  createElement('p', 'bg');
  createInput('', 'color').input(function() {
    bg = hexToRgb(this.value());
  });

  createElement('div')

  createElement('p', 'bg opacity');
  bgSlider = createSlider(0, 50.0, 5);


  createElement('p', 'radius');
  rSlider = createSlider(10, 200, 100);

  createElement('div')
  createElement('p', 'x distortion');
  iSlider = createSlider(0, 10, 0);

  createElement('p', 'y distortion');
  jSlider = createSlider(0, 10, 0);

  createElement('div')
  createButton('log params').mousePressed(function() {
    console.log('-----------------------------------------')
    console.log('-----------------------------------------')
    console.log('-----------------------------------------')
    console.log('bg = ', bg);
    console.log('bg opac = ', bgSlider.value());
    console.log('col a = ', colorA.levels);
    console.log('col b = ', colorA.levels);
    console.log('r = ', rSlider.value());
    console.log('i = ', iSlider.value());
    console.log('j = ', jSlider.value());
    console.log('-----------------------------------------')
    console.log('-----------------------------------------')
    console.log('-----------------------------------------')
  });
}

function draw() {
  background(bg[0], bg[1], bg[2], bgSlider.value());
    for(var k = 0; k < 200; k++) {
      push();
      translate(width/2, height/2);
      var theta = map(k, 0, 200, -PI, PI);
      var xAngle = (speed + theta) * (i + 1);
      var yAngle = (speed + theta) * (j + 1);
      var shapeWidth = sin(speed + cos(speed + theta)) * r;
      var shapeHeight = cos(speed) * r;
      var x = sin(xAngle) * shapeWidth;
      var y = cos(yAngle) * r;
      var w = (sin(xAngle) + 1) * 3;
      var h = (cos(yAngle) + 1) * 3;
      var col = lerpColor(colorA, colorB, y / r);
      fill(col)
      ellipse(x, y, 5, 5);
      pop();
    }
  speed = frameCount * 0.01;

  r = rSlider.value();
  i = iSlider.value();
  j = jSlider.value();
}



function hexToRgb(hex){
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return [(c>>16)&255, (c>>8)&255, c&255];
    }
    throw new Error('Bad Hex');
}
