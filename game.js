
canvas = document.getElementById("canvas");
ctx = canvas.getContext("2d");
ctx.fillStyle = "cyan";
ctx.fillRect(0, 0, 1000, 500);


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


   		if(this.ball.collides(this.paddle1)){
   			/// change directino of ball
   		}

   		// Check if ball hits right side
   		if(this.ball.x + this.ball.radius >= this.width){
   			this.ball.dx = this.ball.dx * -1;
   		}
   		// check if ball hits left side
   		if(this.ball.x - this.ball.radius <= 0){
   			this.ball.dx = this.ball.dx * -1;
   		}
   		//check if ball hits bottom
   		if(this.ball.y + this.ball.radius >= this.height){
   			this.ball.dy = this.ball.dy * -1;
   		}		
   		//check if ball hits the topppppp
   		if(this.ball.y - this.ball.radius <=0){
   			this.ball.dy = this.ball.dy * -1;

		}   	


   	}

   this.render = function() {
   		this.ctx.clearRect(0, 0, this.width, this.height);
   		this.ctx.fillStyle = "cyan";
   		this.ctx.fillRect(0, 0, this.width, this.height);

   		this.ball.render(this.ctx);
   		this.paddle1.render(this.ctx);
   		this.paddle2.render(this.ctx);
   	}

};


var game = new Game(ctx, 1000, 500);
game.loop();