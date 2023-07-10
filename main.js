//se crea la variable song en blanco
song = "";

//se crea la función preloas
function preload()
{
    //se guarda una canción en mp3 dentro de la variable song
    song = loadSound("music.mp3");
}

//se pone la puntuación de las variables scorrightwrist y scoreleftwrist en 0
scoreRightWrist = 0;
scoreLeftWrist = 0;

//se ponen las variables de rightwristx rigthtwristy en 0
rightWristX = 0;
rightWristY = 0;

//se ponen las variables de leftWristX leftWristY en 0
leftWristX = 0;
leftWristY = 0;

//se crea la función de setup
function setup() {
    //se crea el canvas con tamaño 500px x 600px
    canvas =  createCanvas(600, 500);
    //se manda el canvas al centro
    canvas.center();

    //se empieza a proyectar nuestro video en tiempo real en el canvas
    video = createCapture(VIDEO);
    //se oculta el video
    video.hide();

    //en la variable posenet se carga el modelo de posenet
    poseNet = ml5.poseNet(video, modelLoaded);
    //manda las poses detectadas a la función gotposes
    poseNet.on('pose', gotPoses);
}

//se crea la función modelloaded
function modelLoaded() {
    //se manda a la consola el texto de posenet esta inicializado
  console.log('PoseNet está inicializado');
}

//se crea la función de gotPoses
function gotPoses(results)
{
    //si results.length es mayor que 0
  if(results.length > 0)
  {
    //se mandan los resultados a las variables de scorewrist
    scoreRightWrist =  results[0].pose.keypoints[10].score;
    scoreLeftWrist =  results[0].pose.keypoints[9].score;
    //se manda a la consola los resultados
    console.log("scoreRightWrist = " + scoreRightWrist + " scoreLeftWrist = " + scoreLeftWrist);
   
    //se guardan las posiciones de las manos en las variables de rigth y left wrist en x y y y se mandan sus coordenadas a la consola
    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log("rightWristX = " + rightWristX +" rightWristY = "+ rightWristY);


    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log("leftWristX = " + leftWristX +" leftWristY = "+ leftWristY);
       
  }
}

//se crea la función de draw
function draw() {
    //nuestro video se pone del mismo tamaño que el canvas
    image(video, 0, 0, 600, 500);

//se le da un color al fondo
    fill("#FF0000");
    //se le da un color a las orillas
    stroke("#FF0000");

//se la variable de scoreriqhtwrist es mayor a 0.2
//se genera un circulo en la posicion de x y y de tu mano con un radio de 20 px
//se crea una condicional anidada 
//se rigth wrist es mayor que 0 y menor que 100
//se pone un texto en el elemento de speed y la velocidad de la cancion se pone en x0.5
//si no, entonces si rigthwristx es mayor que 100 y menor que 200
//se pone el texto de velocidad x1 en el elemento speed y la canción va a velocidad x1 (normal)
//si no, entonces si rigthwristy es mayor que 200 y menor que 300
//se pone el texto de velocidad x1.5 en speed y se pone la velocidad de la canción en x1.5
//si no, entonces si rigthwristy es mayor que 300 y menor que 400
// se pone el texto de velocidad x2.0 y se pone la velocidad de canción en x2.0
//si no, entonces si rigthwristy es mayor que 400
//se pone el texto de velocidad por 2.5 y se pone la velocidad en x2.5
    if(scoreRightWrist > 0.2)
    {
        circle(rightWristX,rightWristY,20);


        if(rightWristY >0 && rightWristY <= 100)
        {
            document.getElementById("speed").innerHTML = "Speed = 0.5x";        
            song.rate(0.5);
        }
        else if(rightWristY >100 && rightWristY <= 200)
        {
            document.getElementById("speed").innerHTML = "Speed = 1x";      
            song.rate(1);
        }
        else if(rightWristY >200 && rightWristY <= 300)
        {
            document.getElementById("speed").innerHTML = "Speed = 1.5x";        
            song.rate(1.5);
        }
        else if(rightWristY >300 && rightWristY <= 400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2x";      
            song.rate(2);
        }
        else if(rightWristY >400)
        {
            document.getElementById("speed").innerHTML = "Speed = 2.5x";        
            song.rate(2.5);
        }
    }

//si scoreleftwrist es mayor a 0.2
//se dibuja un circulo eb lass coordenadas de x y y con un radio de 20px
//se redondean las coordenasas en x y y
//se divide entre mil las coordenadas
//se manda al elemento de volumen el texto de volumen = + las coordenadas divididas entre mil
//se pone el volumen en el numero dividido entre mil
    if(scoreLeftWrist > 0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        new_leftWristY = floor(InNumberleftWristY *2);
        leftWristY_divide_1000 = new_leftWristY/1000;
        document.getElementById("volume").innerHTML = "Volume = " + leftWristY_divide_1000;    
        song.setVolume(leftWristY_divide_1000);
    }


}

//se crea la función de pkay
function play()
{
    //se empieza a ejecutar la canción en volumen 1 y en velocidad 1
    song.play();
    song.setVolume(1);
    song.rate(1);
}











