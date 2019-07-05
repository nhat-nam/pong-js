
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "black";
ctx.fillRect(0, 0, 1000, 500);


WIDTH = 1000;
HEIGHT = 500;

MAX_BALL_SPEED_Y = 600;

MAX_PADDLE_SPEED = 500;

PLAYER_1_POINTS = 0;

PLAYER_2_POINTS = 0;
//commetns


function Game(context, width, height) {

   this.ctx = context;
   this.width = width;
   this.height = height;
   this._delta = 1000/100;
   this.ball = new Ball();
   this.paddle1 = new Paddle(20);
   this.paddle2 = new Paddle(this.width - 20 - 30);

//comments
   this.menu = new PongMenu(width, height);
   this.menu.init();
   this.pauseMenu = new PauseMenu(width, height);
   this.pauseMenu.init();
   this.endMenu = new AvengersMenu(width, height);
   this.endMenu.init();
   this.difMenu = new DifficultyMenu(width, height);
   this.difMenu.init();

   this.resetGame = function(){
      this.player_1_points = 0;
      this.player_2_points = 0;
      this.menu.current_option = 0;
      this.pauseMenu.current_option = 0;
      this.endMenu.current_option = 0;
      this.difMenu.current_option = 0;
      this.game_state = "menu";
      this.player_count = -1;
      this.difficulty_option = 1;      
   }


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
         if(this.player_count == 1){
            this.game_state = "difficulty_level"
         }
      }else if(this.game_state == "newly_scored"){
         var g = this;
         setTimeout(function(){
            g.newRound();
         }, 1500);   
         this.game_state = "waiting_to_serve";
      }else if(this.game_state == "difficulty_level"){
        // choosing which difficulty level

      }else if(this.game_state == "playing" || this.game_state == "serve"){
   
   		this.ball.update(delta);
   		this.paddle1.update(delta);
   		 
         if(this.player_count == 1){
            // One Players
            if(this.difficulty_option == 1){
            
               if(this.ball.y < this.paddle2.y + (this.paddle2.length / 2)  -45 ){
                  this.paddle2.dy = -1 * MAX_PADDLE_SPEED/2;
                  this.paddle2.update(delta);
               }else if (this.ball.y > this.paddle2.y + (this.paddle2.length / 2) +45 ){
                  this.paddle2.dy = MAX_PADDLE_SPEED/2;
                  this.paddle2.update(delta);            
               }else{
                  this.stopPaddle2();
               }
            } else if(this.difficulty_option == 2){
               if(this.ball.y < this.paddle2.y + (this.paddle2.length / 2)  -45 ){
                  this.paddle2.dy = -1 * MAX_PADDLE_SPEED;
                  this.paddle2.update(delta);
               }else if (this.ball.y > this.paddle2.y + (this.paddle2.length / 2) +45 ){
                  this.paddle2.dy = MAX_PADDLE_SPEED;
                  this.paddle2.update(delta);            
               }else{
                  this.stopPaddle2();
               }
            }else if(this.difficulty_option == 3){
               if(this.ball.y < this.paddle2.y + (this.paddle2.length / 2)  -45 ){
                  this.paddle2.dy = -1 * MAX_PADDLE_SPEED*1.25;
                  this.paddle2.update(delta);
               }else if (this.ball.y > this.paddle2.y + (this.paddle2.length / 2) +45 ){
                  this.paddle2.dy = MAX_PADDLE_SPEED*1.25;
                  this.paddle2.update(delta);            
               }else{
                  this.stopPaddle2();
               }

            } else if(this.difficulty_option == 4){
               var targetY = this.ball.predictBallPath(this);
               if(targetY < this.paddle2.y + (this.paddle2.length / 2)  -25 ){
                  this.paddle2.dy = -1 * MAX_PADDLE_SPEED;
                  this.paddle2.update(delta);
               }else if (targetY > this.paddle2.y + (this.paddle2.length / 2) + 25 ){
                  this.paddle2.dy = MAX_PADDLE_SPEED;
                  this.paddle2.update(delta);            
               }else{
                  this.stopPaddle2();
               }               
            }

            
         }else{
            // Two players
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
   		if(this.ball.x - this.ball.radius >= this.width){
            this.game_state = "newly_scored";
            PLAYER_1_POINTS = PLAYER_1_POINTS + 1;
         
   		}

   		// check if ball hits left side
   		if(this.ball.x + this.ball.radius <= 0){
            this.game_state = "newly_scored";
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
         }else if(this.game_state == "difficulty_level"){
            this.difMenu.render(this.ctx);
         }
         if(this.game_state == "waiting_to_serve"){
               // draw .... 
               if(this.ball.x > WIDTH){
               ctx.font = "20px Arial";
               ctx.fillStyle = "white";
               ctx.fillText("Player 1 Scores!", 470, 400);
         }else if(this.ball.x < 0){ 
            ctx.font = "20px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Player 2 Scores!", 470, 400);}
         }

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
   
      this.paddle1.dy = 0;
      this.paddle2.dy = 0;
   }

   this.newGame = function(){

      this.ball.reset();

      this.drawInstructions();

      PLAYER_1_POINTS = 0;
      PLAYER_2_POINTS = 0;

      this.paddle1.y = 210;
      this.paddle2.y = 210;
   
      this.paddle1.dy = 0;
      this.paddle2.dy = 0;
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
   this.beforeStartGame = function(){
      if(this.game_state == "menu"){
         this.player_count = this.menu.current_option + 1;
      }
      if(this.player_count == 1){
         this.game_state = "difficulty_level";
      }else{
         this.startGame();
      }
   }
   this.startGame = function(){

      // howmany players? 
      // this.menu.option (0 -> 1 player, 1 -> 2 players)
      if(this.game_state == "menu"){
         this.player_count = this.menu.current_option + 1;
      }

      if(this.game_state == "difficulty_level"){   
         this.difficulty_option = this.difMenu.current_option + 1;
      }
      this.game_state = "serve";
      this.ball.reset();
      this.paddle1.y = 210;
      this.paddle2.y = 210;   

      PLAYER_1_POINTS = 0;
      PLAYER_2_POINTS = 0;

      //this.ball.dx = (Math.floor(Math.random() * 2) -1) * 500;
   }
   this.cheat = function(){
      if(this.player_count == 2 && this.ball.dx < 0 && this.ball.x  >= 300){
         var b = this.ball; 
         b.color = "black";
         setTimeout(
            function(){ 
               b.resetColor();
            },500);

         this.ball.dx = -1 * ((Math.random() * 201) + 500);
         this.ball.dy = ((Math.random() * MAX_BALL_SPEED_Y*2) - MAX_BALL_SPEED_Y);
        // if(this.ball.dx > MAX_BALL_SPEED_Y -)

      }

   }

   this.resetGame();

}



var game = new Game(ctx, 1000, 500);

window.onkeydown = function(e){


   //console.log(e);
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
      }else if (game.game_state == "difficulty_level"){
         game.difMenu.optionUp();
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
      }else if (game.game_state == "difficulty_level"){
         game.difMenu.optionDown();
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
            // call beforeStartGame();
            game.beforeStartGame();
         }else if (game.game_state == "difficulty_level"){
            game.startGame();
         }else if (game.game_state == "game_over"){
            if(game.endMenu.current_option==1){
               game.resetGame();
            }else{
               game.startGame();
            }
         } else if(game.game_state == "paused"){
            if(game.pauseMenu.current_option == 1){
               //game.beforeStartGame();
               game.resetGame();
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


