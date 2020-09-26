console.log("loaded");
"use strict";
(function(){
    let jjhLIB = {
        drawingParams: Object.freeze({
            "minBrightness" : 25
        }),
        getByte(){return (jjhLIB.drawingParams.minBrightness + Math.round(Math.random() * 200))},
        getRandomColor(){
            return `rgba(${jjhLIB.getByte()},${jjhLIB.getByte()},${jjhLIB.getByte()},1)`;
        },
        getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        },
        counterToSeconds(counter, framerate){
            return counter / framerate;
        },
        clearScreen(ctx, width, height, color){
            ctx.save();
            ctx.beginPath();
            ctx.rect(0, 0, width, height);
            ctx.fillStyle = color;
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        },
        timeBasedScore(score, counter, framerate, maxScore, lenience){ //Returns new score. Do not use +=.
            return score += maxScore / (jjhLIB.counterToSeconds(counter, framerate) / lenience);
        }
    };

    if(window){
        window["jjhLIB"] = jjhLIB;
    }
    else{
        throw "'window' is not defined!";
    }
})();