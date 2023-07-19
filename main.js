status_new = ""
objects = [];
input = ""

function setup() {
    canvas = createCanvas(480, 350)
    canvas.center()

    camera = createCapture(VIDEO)
    camera.hide()
}

function draw() {
    image(camera, 0, 0, 480, 350)

    r = random(255)
    g = random(255)
    b = random(255)

    if (status_new != "") {
        cocossd_model.detect(camera, got_results)

        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Status: Object detected"
            object_name = objects[i].label
            object_acc = floor(objects[i].confidence * 100)
            object_w = objects[i].width
            object_h = objects[i].height
            object_x = objects[i].x
            object_y = objects[i].y


            fill(r, g, b)
            stroke("black")
            textSize(20)
            text(object_name + " " + object_acc + "%", object_x + 50, object_y + 50)
            noFill()
            rect(object_x, object_y, object_w, object_h)


            if (object_name == input) {
                document.getElementById("check").innerHTML = input + " found! ❤️"
                //speak()
            }

            if (object_name != input) {
                document.getElementById("check").innerHTML = input + " not found 💔"
                //speak_two()
            }


        }

    }



}

//function speak() {
   // var synth = window.speechSynthesis
   // var speak_data = input + "found";
    //var utterthis = new SpeechSynthesisUtterance(speak_data);
   // synth.speak(utterthis);
//}

//function speak_two() {
 //   var synth = window.speechSynthesis
 //   var speak_data = input + "not found";
 //   var utterthis = new SpeechSynthesisUtterance(speak_data);
 //   synth.speak(utterthis);
//}

function start() {
    cocossd_model = ml5.objectDetector('cocossd', model_loaded)
    document.getElementById("status").innerHTML = "Status: Detecting objects"
    input = document.getElementById("input").value;
}

function model_loaded() {
    console.log("Model Loaded successfully")
    status_new = true;
}

function got_results(error, results) {
    if (error) {
        console.error(error)
    } else {
        console.log(results)
        objects = results;
    }
}