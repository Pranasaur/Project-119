var random_number;
var timer_counter = 0;
var timer_check = ''
var drawn_sketch = '';
var answer_holder = '';
var score = 0;

random_number= Math.floor(Math.random() * quick_draw_data_set.length);

console.log(quick_draw_data_set[random_number]);

var sketch = quick_draw_data_set[random_number];

document.getElementById("sketchtobedrawn").textContent = 'Sketch To be Drawn: ' + sketch;

function draw()
{
     check_sketch();

     if (drawn_sketch === sketch) {
        answer_holder = "set";
        score++;
        document.getElementById("scoreSpan").innerText = "Score: " + score;
      }

      updateCanvas(); 
}

function check_sketch()
{
     timer_counter++;
     document.getElementById("timerSpan").innerText = "Timer: " + timer_counter;
     console.log("Timer Counter: ", timer_counter);

     if (timer_counter > 400) {
        timer_counter = 0;
        timer_check = "completed";
     }

     if (timer_check === "completed" || answer_holder === "set") {
        timer_check = "";
        answer_holder = "";
        updateCanvas();
     }
}
function updateCanvas()
{
   background("white");
   var random_number = Math.floor(quick_draw_data_set);
   console.log(random_number)
}

function setup()
{
    var canvas = (280, 280);
    canvas.addEventListener('mouseup', classifyCanvas);
}

function draw()
{
   strokeWeight(4);
   stroke(0, 0, 255);

   if (mouseIsPressed) {
       line(pmouseX, pmouseY, mouseX, mouseY);
   }
}

function preload()
{
   var classifier = ml5.imageClassifier()
}

function classifyCanvas() 
{
   classifier.classify(canvasElement, gotResult);
}

function gotResult(error, results)
{
  if (error) {
   console.error(error);
   return;
  }

  console.log(results);

  let drawn_sketch = results[0].label;

  document.getElementById("sketchLabel").innerText = "Your Sketch: " + drawn_sketch;

  let confidencePercentage = results[0].confidence * 100;

  document.getElementById("confidenceValue").innerText = "Confidence: " + confidencePercentage.toFixed(2) + "%";
}