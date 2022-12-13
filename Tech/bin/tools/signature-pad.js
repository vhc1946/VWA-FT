
const canvas = document.getElementsByClassName('signature-pad')[0];
const ctx = canvas.getContext('2d');

function resize(){
  ctx.canvas.width = canvas.width;
  ctx.canvas.height = canvas.height;
}

let coord = {x:0 , y:0};
let paint = false;

function getPosition(event){
  coord.x = event.offsetX;
  coord.y = event.offsetY;
}

function startPainting(event){
  paint = true;
  getPosition(event);
}

function stopPainting(){
  paint = false;
}

function sketch(event){
  if (!paint) return;
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.lineCap = 'round';
  ctx.strokeStyle = 'black';
  ctx.moveTo(coord.x, coord.y);
  getPosition(event);
  ctx.lineTo(coord.x , coord.y);
  ctx.stroke();
}

resize(); // Resizes the canvas once the window loads
document.addEventListener('mousedown', startPainting);
document.addEventListener('mouseup', stopPainting);
document.addEventListener('mousemove', sketch);
window.addEventListener('resize', resize);