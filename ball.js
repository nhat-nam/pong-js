function Ball(){

this.x = 335
this.y = 398

this.dx = 400;
this.dy = 400;

this.radius = 10;

this.update = function(delta){

	this.y = this.y + (this.dy * (delta/1000));
	this.x = this.x + (this.dx * (delta/1000));
}
this.render = function(ctx){
		ctx.fillStyle="magenta";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 360);
		ctx.fill();
		ctx.closePath();

	}


	this.collides = function(paddle){

		//return true if ball collides with Paddle paddle


		// return fals if ball does not collide. 

	}
}