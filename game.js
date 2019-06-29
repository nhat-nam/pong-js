
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1000, 500);


WIDTH = 1000;
HEIGHT = 500;

MAX_BALL_SPEED_Y = 500;

MAX_PADDLE_SPEED = 500;

PLAYER_1_POINTS = 0;

PLAYER_2_POINTS = 0;
//comments


function Game(context, width, height) {

   this.ctx = context;
   this.width = width;
   this.height = height;
   this._delta = 1000/100;
   this.ball = new Ball();
   this.paddle1 = new Paddle(20);
   this.paddle2 = new Paddle(this.width - 20 - 30);

//comments
   this.menu = new Menu(width, height);
   this.menu.init();
   this.pauseMenu = new PauseMenu(width, height);
   this.pauseMenu.init();
   this.endMenu = new AvengersMenu(width, height);
   this.endMenu.init();


   this.player_1_points = 0;
   this.player_2_points = 0;

   this.game_state = "menu";
   this.player_count = 1;

   /**
   *    
   **/
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

      // new code for menu....


      if(this.game_state == "menu"){
         // 
      }else if(this.game_state == "playing" || this.game_state == "serve"){
   
   		this.ball.update(delta);
   		this.paddle1.update(delta);
   		 
         //this.paddle2.dy=100;

         if(this.player_count == 1 && this.game_state == "playing"){


            if(this.ball.y < this.paddle2.y + (this.paddle2.length / 2)  -30 ){
               this.paddle2.dy = -1 * MAX_PADDLE_SPEED;
            }else if (this.ball.y > this.paddle2.y + (this.paddle2.length / 2) +30 ){
               this.paddle2.dy = MAX_PADDLE_SPEED;
            }else{
               this.stopPaddle2();
            }
            this.paddle2.update(delta);

            if(this.paddle2.y <= 0 || this.paddle2.y + this.paddle2.length >= this.height){
               this.stopPaddle2();
            }
         }else{
            this.paddle2.update(delta);
         }


         



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
   			this.newRound();
            PLAYER_1_POINTS = PLAYER_1_POINTS + 1;
         
   		}


   		// check if ball hits left side
   		if(this.ball.x - this.ball.radius <= 0){
   			this.newRound();
            PLAYER_2_POINTS = PLAYER_2_POINTS + 1
   		}


   		//check if ball hits bottom
   		if(this.ball.y + this.ball.radius >= this.height){
   			this.ball.dy = -1*Math.abs(this.ball.dy);
   		}		
   		//check if ball hits the topppppp
   		if(this.ball.y - this.ball.radius <=0){
   			this.ball.dy = Math.abs(this.ball.dy);

         }   	

         if(PLAYER_2_POINTS == 5 || PLAYER_1_POINTS == 5){
            this.game_state = "game_over";
            if(PLAYER_2_POINTS > PLAYER_1_POINTS){

               this.endMenu.winner = 2;
            }else{
               this.endMenu.winner = 1;
            }

            this.newGame();

         }
      


      }

   }

   this.render = function() {
   		this.ctx.clearRect(0, 0, this.width, this.height);
   		this.ctx.fillStyle = "black";
   		this.ctx.fillRect(0, 0, this.width, this.height);

         if(this.game_state == "menu"){
            this.menu.render(this.ctx);
         }else if (this.game_state == "paused"){
            this.pauseMenu.render(this.ctx);
         }else if(this.game_state == "game_over"){
            this.endMenu.render(this.ctx);
         }else{

            this.ball.render(this.ctx);
            this.paddle1.render(this.ctx);
            this.paddle2.render(this.ctx);
            if(this.game_state =="serve"){
               this.drawInstructions();      
            }
            this.drawScore();
            
            if(this.ball.color == "black"){
               this.drawCheatWarning();
            }

         }

      }

      this.drawCheatWarning = function(){
         ctx.font = "20px Arial";
         ctx.fillText("Invisi-ball", 470, 400);
         ctx.fillStyle = "white";
      }

      this.drawScore = function(){
         ctx.font = "16px Arial";
         ctx.fillText(PLAYER_1_POINTS + " - " + PLAYER_2_POINTS, 480, 50);
         ctx.filStyle = "white";
      }

      this.drawInstructions = function(){
         ctx.font = "20px Arial";
         ctx.fillText("Press SPACE to serve!", 400, 400);
         ctx.fillStyle = "white";
      }



   this.newRound = function(){
      this.ball.reset();
      this.game_state = "serve";

      this.drawInstructions();

      this.paddle1.y = 210;
      this.paddle2.y = 210;
   }

   this.newGame = function(){

      this.ball.reset();

      this.drawInstructions();

      PLAYER_1_POINTS = 0;
      PLAYER_2_POINTS = 0;

      this.paddle1.y = 210;
      this.paddle2.y = 210;
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

   this.serve = function(){

      this.ball.serve(Math.floor(Math.random() * 2));
      this.game_state = "playing";

   }
   this.pause = function(){
      this.game_state = "paused";
   }
   this.unpause = function(){
      this.game_state = "playing";
   }   
   this.startGame = function(){

      // howmany players? 
      // this.menu.option (0 -> 1 player, 1 -> 2 players)
      this.player_count = this.menu.current_option + 1; 
      this.game_state = "serve";
      this.ball.reset();
      this.paddle1.y = 210;
      this.paddle2.y = 210;   

      PLAYER_1_POINTS = 0;
      PLAYER_2_POINTS = 0;

      //this.ball.dx = (Math.floor(Math.random() * 2) -1) * 500;
   }
   this.cheat = function(){
      if(this.ball.dx < 0 && this.ball.x - this.ball.radius >= 600){
      this.ball.color = "black"
      var b = this.ball; 
      setTimeout(
         function(){ 
            b.resetColor();
         },500);

      //his.ball.dx = -1 * ((Math.random() * 201) + 500);
      this.ball.dy = ((Math.random() * MAX_BALL_SPEED_Y*2) - MAX_BALL_SPEED_Y);

      }

   }

}


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
      if((game.game_state == "playing" || game.game_state == "serve") && game.player_count == 2){
         game.movePaddle2Up();
      }else if (game.game_state == "menu"){
         game.menu.optionUp();
      }  else if (game.game_state == "game_over"){
         game.endMenu.optionUp();
      }  else if(game.game_state == "paused"){
         game.pauseMenu.optionUp();
      }
   }
   if(e.key == "ArrowDown"){
      // move paddle 2 down
      if((game.game_state == "playing" || game.game_state == "serve")  && game.player_count == 2){
         game.movePaddle2Down();
      }else if (game.game_state == "menu"){
         game.menu.optionDown();
      }else if (game.game_state == "game_over"){
         game.endMenu.optionDown();
      }else if (game.game_state == "paused"){
         game.pauseMenu.optionDown();
      }


   }

      if(e.key == " "){

         //pause game.
         //serve the ball
         if(game.game_state == "serve"){
            game.serve();
     
         }
      }
      if(e.key == "Enter"){
         if(game.game_state == "menu"){

            game.startGame();
         }else if (game.game_state == "game_over"){
            if(game.endMenu.current_option==1){
               game.game_state = "menu";
            }else{
               game.startGame();
            }
         } else if(game.game_state == "paused"){
            if(game.pauseMenu.current_option == 1){
               game.game_state = "menu";
            }else{
               game.unpause();
            }
         
         }

      }

   

      if(e.key == "Escape"){
         if(game.game_state == "serve" || game.game_state == "playing"){
            game.pause();
         }
      }

      if(e.key == "ArrowRight"){
         if(game.game_state == "playing"){
            game.cheat();
         }
         
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


