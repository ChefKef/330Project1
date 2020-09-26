(function(){    
    /*
    Ideas
    be able to Alter xScale and yScale. - 2 sliders. HTML/JS Done.
    be able to alter c. Both numerator and denominator. - 2 sliders. HTML/JS Done.
    be able to alter the framerate (add framerate) - pulldown. HTML/JS Done.
    be able to alter dt - slider. HTML/JS Done.
    */
    /*
    To-do:
    Implement controls. Done.
    Implement game. Done.
    Reset/Pause/Play Buttons. Done.
    Move to IIFE. Done.
    CSS. Done.
    Implement Score. Done.
    */
   "use strict";
   let ctx;
   const canvasWidth = 800, canvasHeight = 600;
   let x = .01, y = 0, z = 8/3;
   let a = 10, b = 28, c = 8/3;
   let targetX, targetY, targetRadius = 10;
   let xScale = 8, yScale = 8;
   let numSlider, denSlider, xSlider, ySlider, framePicker, dtSlider;
   let framerate = 60;
   let dt = .01;
   let play = true;
   let timer = 0, score = 0;
   let scoreHolder;
   let maxScore = 100, scoreLenience = 5;
   window.onload = init;
   function init(){
     ctx = canvas.getContext("2d");
     canvas.width = canvasWidth;
     canvas.height = canvasHeight;
     jjhLIB.clearScreen(ctx, canvasWidth, canvasHeight, "black");
     newTarget();
     sliderSetup();
     framerateSetup();
     buttonSetup();
     setupCollapsible();
     scoreSetup();
     loop();
   }

   function loop(){
       if(play)
       {
           setTimeout(loop, 1000/framerate);
           timer++;
       }
       let dx = (a * (y - x)) * dt;
       let dy = (x * (b - z) - y) * dt;
       let dz = (x * y - c * z) * dt;
       x = x + dx;
       y = y + dy;
       z = z + dz;
       gameCheck();
       ctx.save();
       ctx.translate(canvasWidth/2, canvasHeight/2);
       ctx.fillStyle = jjhLIB.getRandomColor();
       ctx.fillRect(x * xScale, y * yScale, 2, 2);
       ctx.restore();
   }
   
   function sliderSetup(){
       numSlider = document.querySelector("#cNumerator");
       denSlider = document.querySelector("#cDenominator");
       xSlider = document.querySelector("#xSlider");
       ySlider = document.querySelector("#ySlider");
       dtSlider = document.querySelector("#dtSlider");
       numSlider.onchange = numeratorUpdate;
       denSlider.onchange = denominatorUpdate;
       xSlider.onchange = xUpdate;
       ySlider.onchange = yUpdate;
       dtSlider.onchange = dtUpdate;
   }
   function numeratorUpdate(){
       document.querySelector("#numerator").innerHTML = `Numerator Value: ${numSlider.value}`;
       cUpdate();
   }
   function denominatorUpdate(){
       document.querySelector("#denominator").innerHTML = `Denominator Value: ${denSlider.value}`;
       cUpdate();
   }
   function cUpdate(){
       document.querySelector("#c").innerHTML = `Current c value: ${numSlider.value}/${denSlider.value}`
       c = numSlider.value/denSlider.value;
   }
   function xUpdate(){
       document.querySelector("#xScale").innerHTML = `X Scale: ${xSlider.value}`;
       xScale = xSlider.value;
   }
   function yUpdate(){
       document.querySelector("#yScale").innerHTML = `Y Scale: ${ySlider.value}`;
       yScale = ySlider.value;
   }
   function dtUpdate(){
       document.querySelector("#dt").innerHTML = `dt: ${dtSlider.value / 1000}`;
       dt = dtSlider.value / 1000;
   }
   function framerateSetup(){
       framePicker = document.querySelector("#framerate");
       framePicker.onchange = framerateUpdate;
   }
   function framerateUpdate(){
       framerate = framePicker.value;
   }
   function newTarget(){
       targetX = jjhLIB.getRandomInt(canvasWidth / 5, 4 * canvasWidth / 5);
       targetY = jjhLIB.getRandomInt(canvasHeight / 5, 4 * canvasHeight / 5);
   }
   function gameCheck(){
       if(Math.abs((x * xScale + (canvasWidth / 2)) - targetX) < (targetRadius * 1.2) && Math.abs((y * yScale + (canvasHeight / 2)) - targetY) < (targetRadius * 1.2))
       {
           newTarget();
           jjhLIB.clearScreen(ctx, canvasWidth, canvasHeight, "black");
           updateScore();
       }
       else
       {
           ctx.save();
           ctx.beginPath();
           ctx.fillStyle = "red";
           ctx.lineWidth = 4;
           ctx.strokeStyle = "red";
           ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2, false);
           ctx.closePath();
           ctx.fill();
           ctx.stroke();
           ctx.restore();
       }
   }
   function buttonSetup(){
       document.querySelector("#playButton").onclick = function(){
           if(!play)
           {
                play = true;
                loop();
           }
       };
       document.querySelector("#pauseButton").onclick = function(){
           play = false;
       };
       document.querySelector("#stepButton").onclick = function(){
           play = false;
           loop();
       };
       document.querySelector("#restartButton").onclick = function(){
            x = .01;
            y = 0; 
            z = 8/3;
            a = 10; 
            b = 28;
            ctx.fillRect(0,0,canvasWidth,canvasHeight);
            ctx.arc(targetX, targetY, targetRadius, 0, Math.PI * 2, false);
       };
       document.querySelector("#resetButton").onclick = function(){
            location.reload();
        }
    }
   function scoreSetup(){
        scoreHolder = document.querySelector("#score");
   }
   function updateScore(){
       score = jjhLIB.timeBasedScore(score, timer, framerate, maxScore, scoreLenience);
        scoreHolder.innerHTML = `Score: ${Math.floor(score)}`;
        timer = 0;
   }
   /*Collapsible implementation from https://www.w3schools.com/howto/howto_js_collapsible.asp */
   function setupCollapsible(){
    let coll = document.querySelector(".collapsible");
    coll.addEventListener("click", function() {
        this.classList.toggle("active");
        let content = this.nextElementSibling;
        if (content.style.display === "block") {
          content.style.display = "none";
        } else {
          content.style.display = "block";
        }
      });
    }
})()