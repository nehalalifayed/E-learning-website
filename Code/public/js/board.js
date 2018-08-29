'use strict';
function  takeScreenShot() {
  var script3 = document.createElement('script');

script3.src = 'js/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script3);
var script1 = document.createElement('script');
//
script1.src = 'js/html2canvas.js';
document.getElementsByTagName('head')[0].appendChild(script1);
  var script = document.createElement('script');

  script.src = 'js/html2canvas.min.js';
  document.getElementsByTagName('head')[0].appendChild(script);


console.log("henaaaaa");
html2canvas(document.querySelector("#Ourboard")).then(canvas => {
 console.log("7omar");
 document.body.appendChild(canvas)
});


}

(function() {
  var script = document.createElement('script');

script.src = 'js/jquery.min.js';
document.getElementsByTagName('head')[0].appendChild(script);
  var type; var room=" ";

  $(function() {
   var data;

            $.ajax({
              type: 'POST',
              data: JSON.stringify(data),
                  contentType: 'application/json',
                          url: 'http://193.227.9.124:27183/gettype',
                          success: function(data) {
                              console.log('success');
                              console.log(JSON.stringify(data));
                              type=data.type;
                              room=data.room;
                              console.log(type);

                          }
                      });

  });


  var socket = io.connect();
  socket.on('connect', function() {
   console.log('socket: ',room);
// Connected, let's sign-up for to receive messages for this room
   socket.emit('room1', room);
             });
  var canvas = document.getElementsByClassName('whiteboard')[0];
  var colors = document.getElementsByClassName('color');
  var context = canvas.getContext('2d');

  var current = {
    color: 'black'
  };
  var drawing = false;

  canvas.addEventListener('mousedown', onMouseDown, false);
  canvas.addEventListener('mouseup', onMouseUp, false);
  canvas.addEventListener('mouseout', onMouseUp, false);
  canvas.addEventListener('mousemove', throttle(onMouseMove, 10), false);

  for (var i = 0; i < colors.length; i++){
    colors[i].addEventListener('click', onColorUpdate, false);
  }

  socket.on('drawing', onDrawingEvent);

  window.addEventListener('resize', onResize, false);
  var ctx = canvas.getContext('2d');

  onResize();




  function drawLine(x0, y0, x1, y1, color, emit){

    context.beginPath();
    context.moveTo(x0, y0);
    context.lineTo(x1, y1);
    context.strokeStyle = color;
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    if (!emit) { return; }
    var w = canvas.width;
    var h = canvas.height;


    socket.emit('drawing',{
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color
    });

}


  function onMouseDown(e){
      if(type==="teacher"){
        console.log("Ana teacher");
    drawing = true;}
    else {
      console.log("Ana student");
      drawing = false;
    }
    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onMouseUp(e){
    if (!drawing) { return; }
    console.log(type);

    drawing = false;

    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);


    console.log(current.x+ ' '+current.y);
  }

  function onMouseMove(e){
    if (!drawing) { return; }

    drawLine(current.x, current.y, e.clientX, e.clientY, current.color, true);

    current.x = e.clientX;
    current.y = e.clientY;
  }

  function onColorUpdate(e){
    current.color = e.target.className.split(' ')[1];
  }

  // limit the number of events per second
  function throttle(callback, delay) {
    var previousCall = new Date().getTime();
    return function() {
      var time = new Date().getTime();

      if ((time - previousCall) >= delay) {
        previousCall = time;
        callback.apply(null, arguments);
      }
    };
  }

  function onDrawingEvent(data){

    var w = canvas.width ;
    var h = canvas.height ;
    console.log("canvan");
    console.log(canvas.width+ ' '+  canvas.height);
    drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);


  }

  // make the canvas fill its parent
  function onResize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("canvan");
    console.log(canvas.width+ ' '+  canvas.height);
  }

})();
