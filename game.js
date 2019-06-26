
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1000, 500);


WIDTH = 1000;
HEIGHT = 500;

MAX_BALL_SPEED_Y = 300;

MAX_PADDLE_SPEED = 1000;

function Game(context, width, height) {

   this.ctx = context;
   this.width = width;
   this.height = height;
   this._delta = 1000/100;
   this.ball = new Ball();
   this.paddle1 = new Paddle(20);
   this.paddle2 = new Paddle(this.width - 20 - 30);



   this.loop = function(){
		this.update(this._delta);
		this.render();
		var g = this;
		setTimeout(
			function(){g.loop();},
			this._delta
		);

   }



   this.update = function(delta) {
   
   		this.ball.update(delta);
   		this.paddle1.update(delta);
   		this.paddle2.update(delta);


         var centerOfPaddle, distanceFromCenter;

   		if(this.ball.collides(this.paddle1) ){

            this.ball.dx = Math.abs(this.ball.dx);


            centerOfPaddle = this.paddle1.y + (this.paddle1.length / 2);
            distanceFromCenter = this.ball.y - centerOfPaddle;
            var new_y_speed = distanceFromCenter / ( this.paddle1.length / 2 )  * MAX_BALL_SPEED_Y;
            this.ball.dy = new_y_speed;


         }
         if(this.ball.collides(this.paddle2) ){
            this.ball.dx = Math.abs(this.ball.dx)* -1;
            centerOfPaddle = this.paddle2.y + (this.paddle2.length / 2);
            distanceFromCenter = this.ball.y - centerOfPaddle;
            var new_y_speed = distanceFromCenter / ( this.paddle2.length / 2 )  * MAX_BALL_SPEED_Y;
            this.ball.dy = new_y_speed;


         }


   		// Check if ball hits right side
   		if(this.ball.x + this.ball.radius >= this.width){
   			this.ball.dx = -1 * Math.abs(this.ball.dx);
   		}
   		// check if ball hits left side
   		if(this.ball.x - this.ball.radius <= 0){
   			this.ball.dx = Math.abs(this.ball.dx);
   		}
   		//check if ball hits bottom
   		if(this.ball.y + this.ball.radius >= this.height){
   			this.ball.dy = -1*Math.abs(this.ball.dy);
   		}		
   		//check if ball hits the topppppp
   		if(this.ball.y - this.ball.radius <=0){
   			this.ball.dy = Math.abs(this.ball.dy);

		    }   	


   	}

   this.render = function() {
   		this.ctx.clearRect(0, 0, this.width, this.height);
   		this.ctx.fillStyle = "black";
   		this.ctx.fillRect(0, 0, this.width, this.height);



   		this.ball.render(this.ctx);
   		this.paddle1.render(this.ctx);
   		this.paddle2.render(this.ctx);
   	
         //this.drawScore();

      }

      this.drawScore = function(){
         ctx.font = "16px Arial";
         ctx.fillText("score", 450, 50);
      }



   this.newRound = function(){
      //reset ball



   }

   this.newGame = function(){

   }


   this.movePaddle2Up = function(){

      this.paddle2.dy = -1 * MAX_PADDLE_SPEED;

   }
   this.movePaddle2Down = function(){

      this.paddle2.dy = MAX_PADDLE_SPEED;
   }


   this.movePaddle1Up = function(){
      this.paddle1.dy = -1 * MAX_PADDLE_SPEED;
   }

   this.movePaddle1Down = function(){
      this.paddle1.dy = MAX_PADDLE_SPEED;
   }



   this.stopPaddle1 = function(){
      this.paddle1.dy = 0;
   }

   this.stopPaddle2 = function(){
      this.paddle2.dy = 0;
   }

};


var game = new Game(ctx, 1000, 500);

window.onkeydown = function(e){
   console.log(e);
   // Paddle #1
   if(e.key == "w"){
      game.movePaddle1Up();
   }

   if(e.key == "s"){
      game.movePaddle1Down();
   }

   // Paddle #2 
   if(e.key == "ArrowUp"){
      // move paddle 2 up 
      game.movePaddle2Up();
   }
   if(e.key == "ArrowDown"){
      // move paddle 2 down
      game.movePaddle2Down();
   }
}


window.onkeyup = function(e){


   // if key is up or down, game.stopPaddle2();
if(e.key == "w" || e.key == "s"){
   game.stopPaddle1();
}

if(e.key == "ArrowUp" || e.key == "ArrowDown"){
   game.stopPaddle2();
}


}

game.loop();






