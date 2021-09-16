img = "";
objects = [];
detection_status = "";

function setup() {
    canvas = createCanvas(600, 450);
    canvas.center();
    cocossd_model = ml5.objectDetector("cocossd", model_loaded);
    document.getElementById("status").innerHTML = "Detecting";
}

function preload() {
    img = loadImage("bedroom.jpg");
}

function model_loaded() {
    console.log("Model is not loaded");
    cocossd_model.detect(img, gotresult);
    detection_status = true;
}

function draw() {
    if (detection_status != "") {
        for (counter = 0; counter < objects.length; counter++) {
            confidence = floor(objects[counter].confidence * 100);
            fill("red");
            text(objects[counter].label + " ," + confidence + "%");
            nofill();
            stroke()
            rect(objects[counter].x, objects[counter].y, objects[counter].width, objects[counter].height);
        }
    }
}

function gotresult(result, error) {
    if (result) {
        console.log(result);
        objects = result;
    } else {
        console.log(error);
    }
}