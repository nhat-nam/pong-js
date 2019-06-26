function Ball(){

this.x = 335
this.y = 398

this.dx = 500;
this.dy = 500;

this.radius = 10;

this.update = function(delta){

	this.y = this.y + (this.dy * (delta/1000));
	this.x = this.x + (this.dx * (delta/1000));
}
this.render = function(ctx){
		ctx.fillStyle="white";
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 360);
		ctx.fill();
		ctx.closePath();

	}


	this.collides = function(a_paddle){
		
		if(this.x + this.radius >= a_paddle.x 
			&& this.x - this.radius <= a_paddle.x + a_paddle.width
			&& this.y - this.radius <= a_paddle.y + a_paddle.length
			&& this.y + this.radius >= a_paddle.y){
				return true;
		}
	


		return false;
		// return false if ball does not collide. 

	}
}