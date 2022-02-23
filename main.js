song = "";
status = "";
objects = [];
function preload(){

}

function setup(){
    canvas = createCanvas(240,240);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(240,240);
   
}

function draw(){
    image(video,0,0,380,380);
    if(status != ""){
        objectDetector.detect (video,gotResults);
        for(i = 0; i<objects.length;i++){
            document.getElementById("status").innerHTML = "Objects detected";
            document.getElementById("number_of_objects").innerHTML = "number of objects detected are : " + objects.length;
        
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%",object[i].x +15,object[i].y + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width, objects[i].height);
        }
    }
   }

function gotResult(error,results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
    objects = results;
}

function start() {
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    finder = document.getElementById("input").value;
}
function modelLoaded() {
    console.log("Model Loaded!");
    status = true;
    objectDetector.detect(video,gotResult);
}