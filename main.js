video = "";
objects = [];
status = "";

function setup() {
    canvas = createCanvas(550, 450);
    canvas.center();
}

function preload() {
    video = createVideo("video.mp4");
    video.hide();
}

function start() {
    objectDetector = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";

}

function modelLoaded() {
    console.log("Model Is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function draw() {
    image(video, 0, 0, 550, 450);
    if (status!="") {
        objectDetector.detect(video, getResult);
        console.log("Length="+objects.length);
        for (i = 0; i < objects.length; i++) {
            document.getElementById("no_of_objects").innerHTML = "No. Of Objects = " + objects.length;
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            percent = Math.floor(objects[i].confidence * 100);
            fill("red");
            text(objects[i].label + " " + percent + "%", objects[i].x+15, objects[i].y+15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

    }

}

function getResult(error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        objects = result;
    }
}