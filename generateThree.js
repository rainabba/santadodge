/*

Generate 3D render using serial data from IMU

*/

'use strict';

// Get accel data
var ax = 0, ay = 0, az = 0;
window.addEventListener('devicemotion', function(e) {
		ax = e.accelerationIncludingGravity.x;
		ay = -e.accelerationIncludingGravity.y;
		az = -e.accelerationIncludingGravity.z;
		$("#acc").replaceWith("<div id='acc'>" + ax + ',' + ay + ',' + az + "</div>");
});

// Declare required variables
var dataRollx = 0;
var dataRolly = 0;
var dataRollz = 0;
var dataRollxArray = [];
var dataRollyArray = [];
var dataRollzArray = [];
var accuracy = 2;
var orderOfMag = (Math.PI/180);
var container;
var camera, scene, renderer;
var cube, plane, santa, present;
var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2,
    presents = [];
var score = 0;

//Connect to socket.io
var serverIP = "localhost";
//var socket = io.connect(serverIP + ':5000');
var socket = io();
console.log('socket connected to: ' + serverIP);
socket.on('throw', function(data) {
    createPresent();

});

// Start reading IMU data
runSocket();
init();
animate();

function runSocket() {
        socket.on('serial_update', function(data) {
            if (data.charAt(0) === 'O') {
                console.log(data);
                var dataArray = data.split(/ /);

                // set x
                dataRollx = (dataArray[1] *= orderOfMag).toFixed(accuracy);
                
                // set y
                dataRolly = (dataArray[2] *= orderOfMag).toFixed(accuracy);

                // set z
                dataRollz = (dataArray[3] *= orderOfMag).toFixed(accuracy);

                console.log(dataRollx + "," + dataRolly + "," + dataRollz);
            }
        });
}

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    var info = document.createElement( 'div' );
    info.style.position = 'absolute';
    info.style.top = '10px';
    info.style.width = '100%';
    info.style.textAlign = 'center';
    info.innerHTML = 'Visualize IMU';
    info.setAttribute('id', 'pourHeading');
    container.appendChild( info );

    $("#pourHeading").append("<div id='subHeading'></div>");
    $("#pourHeading").append("<div id='acc'></div>");
    $("#pourHeading").append("<div id='score'>Score: 0</div>");

    // Set up camera
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();

    // Create cube
    var geometry = new THREE.BoxGeometry( 100, 100, 100 );
    for ( var i = 0; i < geometry.faces.length; i += 2 ) {
        var hex = Math.random() * 0xffffff;
        geometry.faces[ i ].color.setHex( hex );
        geometry.faces[ i + 1 ].color.setHex( hex );
    }
    var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );
    cube = new THREE.Mesh( geometry, material );
    cube.position.y = -80;
    scene.add( cube );

    // Create santa
    var geometry = new THREE.BoxGeometry( 100, 100, 100 );
    var material = new THREE.MeshNormalMaterial();
    santa = new THREE.Mesh( geometry, material );
    santa.position.y = 350;
    scene.add( santa );
    


    
    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setSize( window.innerWidth, window.innerHeight );
    container.appendChild( renderer.domElement );

    window.addEventListener( 'resize', onWindowResize, false );
    createPresent();
}

function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );
}

function animate() {
        requestAnimationFrame( animate );
        render();
}


function render() {
    cube.translateX(ax);
    presents.forEach( function(o) {
        o.translateY(-2);
    });
    cube.rotation.x = -dataRollx;
    cube.rotation.y = -dataRollz;
    cube.rotation.z = -dataRolly;
    renderer.render( scene, camera );
    playerHit();
}

var threshold = 70;

function playerHit() {
    presents.forEach( function(o, i) {
        var yDiff = Math.abs(o.position.y - cube.position.y);
        var xDiff = Math.abs(o.position.x - cube.position.x);
        if (yDiff < threshold && xDiff < threshold) {
         console.log('HIT:', o);
         scoreHit();
         scene.remove(o);
            presents.splice(i, 1);
        }
    });
}
    // Create present
function createPresent() {
    var geometry = new THREE.BoxGeometry( 30, 30, 30 );
    var material = new THREE.MeshNormalMaterial();
    present = new THREE.Mesh( geometry, material );
    present.position.y = 350;
    scene.add( present );
    presents.push(present);
}

function scoreHit() {
    score++;
    $('#score').replaceWith("<div id='score'>Score: " + score + "</div>");
}
