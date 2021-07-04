const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");

const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
canvas.width = document.getElementsByClassName("canvas")[0].offsetWidth;
canvas.height = document.getElementsByClassName("canvas")[0].offsetHeight;

const INITIAL_COLOR = "#000000";

let painting = false;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITIAL_COLOR;

// canvas.width = 700;
// canvas.height = 700;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

function onMouseMove(e){
    const x = e.offsetX;
    const y = e.offsetY;
   if(!painting){
       ctx.beginPath();
       ctx.moveTo(x,y);
   } else {
       ctx.lineTo(x,y);
       ctx.stroke();
   }
}

function onMouseDown(e){
    painting = true;
}
function onMouseUp(e){
    stopPainting();
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }  
}
function changeColor(e){
    const color = e.target.style.backgroundColor;   
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}


function handleRange(e){
    const size = e.target.value;
    ctx.lineWidth = size;
}


function handleMode(e){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else {
        filling = true;
        mode.innerText = "Paint";
        
    }
}


function handleContextMenu(e){
    e.preventDefault();
}


function handleSaveBtn(){
    const image = canvas.toDataURL();
    const link = document.createElement("a");
    link.href = image;
    link.download = "PaintJS[😁]";
    link.click();
}

Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
    range.addEventListener("input", handleRange);
}

if(mode){
    mode.addEventListener("click", handleMode)
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveBtn);
}



if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

