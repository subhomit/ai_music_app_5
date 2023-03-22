var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var song1 = "";
var song2 = "";
var score_leftWrist = 0;
var score_rightWrist = 0;
var song = "";

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup(){
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
        score_leftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist = " + score_leftWrist);
        score_rightWrist = results[0].pose.keypoints[10].score;
        console.log("Score Right Wrist = " + score_rightWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("leftWristX = " + leftWristX);
        console.log("leftWristY = " + leftWristY);
        console.log("rightWristX = " + rightWristX);
        console.log("rightWristY = " + rightWristY);
    }
}
function modelLoaded(){
    console.log("Model is Initialized");
}
function draw(){
    image(video,0, 0, 600, 500);
    fill("#00FF00");
    stroke("#000000");
    song = song1.isPlaying();
    console.log(song1);
    if(score_leftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        song2.stop();
        if(song_name == false){
            song1.play();
        }
        else{
            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_name").innerHTML = "Song Name: Peter Pan Song";
        }
    } 
    if(score_rightWrist > 0.2){
        circle(rightWrist_x,rightWrist_y,20);
        song1.stop();
        if(song_name == false){
            song2.play();
        }
        else{
            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_id").innerHTML = "Song Name: Harry Potter Theme Song";
        }
    }   
}
function play1(){
    song1.play();
}
function play2(){
    song2.play();
}
