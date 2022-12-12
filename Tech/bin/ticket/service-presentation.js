
/*
const canvas = document.getElementsByClassName('signature-pad')[0];
console.log(canvas.offsetTop);
const ctx = canvas.getContext("2d");
let coord = { x: 0, y: 0 };

var resize=()=>{
  ctx.canvas.width = canvas.width;
  ctx.canvas.height = canvas.height;
}
var reposition=(event)=>{
  coord.x = event.offsetX;
  coord.y = event.offsetY;
}
var start=(event)=>{
  document.addEventListener("mousemove", draw);
  reposition(event);
  console.log(event);
}
var stop=()=>{
  document.removeEventListener("mousemove", draw);
}
var draw=(event)=>{
  ctx.beginPath();
  ctx.lineWidth = 4;
  ctx.lineCap = "round";
  ctx.strokeStyle = "black";
  ctx.moveTo(coord.x, coord.y);
  reposition(event);
  ctx.lineTo(coord.x, coord.y);
  ctx.stroke();
}

canvas.addEventListener("mousedown", start);
canvas.addEventListener("mouseup", stop);
window.addEventListener("resize", resize);

resize();
*/
