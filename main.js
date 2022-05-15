function setup() {
    canvas = createCanvas(370, 370);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
}

status = "";
inputvalue = ""; 
objects = [];


function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    inputvalue = document.getElementById("objectinput").value;
}

function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
}

function draw() {
   image(video, 0, 0, 370, 370); 
   if(status != "") {
       objectDetector.detect(video, gotResult);
       for (i = 0; i < objects.length; i++) {
           document.getElementById("status").innerHTML = "Status - Object Detected";

           fill("#FF0000");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF0000");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

           if(objects[i].label == objects_name) {
               video.stop();
               objectDetector.detect(gotResult);
               document.getElementById("found_info").innerHTML = objects_name + " Found";
               synth = window.speechSynthesis;
               utterThis = new SpeechSynthesisUtterance(objects_name + " Found");
               synth.speak(utterThis);
           } else {
               document.getElementById("found_info").innerHTML = objects_name + " Not Found";
               synth = window.speechSynthesis;
               utterThis1 = new SpeechSynthesisUtterance(objects_name + "Not Found");
               synth.speak(utterThis1);
           }
           }
       }
   }

function start() {
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status - Detecting Objects";
    objects_name = document.getElementById("objectinput").value;
}

function gotResult(error, results) {
    if(error) {
        console.log(error);
    }else {
        console.log(results);
        objects = results;
    }
}