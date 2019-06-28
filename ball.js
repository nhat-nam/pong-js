function Ball(){

this.x = 500
this.y = 250

this.dx = 0;
this.dy = 0;

this.starting_speed = 500;
this.max_speed_x = 1000;

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


	this.serve = function(dir){

		if(dir == 0){
			//left
			this.dx = -1 * this.starting_speed;

		}else{
			//right
			this.dx = this.starting_speed;
		}
	}
	this.reset = function(){
		this.dx = 0;
	    this.dy = 0;
      	this.x = 500
      	this.y = 250
	}
	this.collides = function(a_paddle){
		
		if(this.x + this.radius >= a_paddle.x 
			&& this.x - this.radius <= a_paddle.x + a_paddle.width
			&& this.y - this.radius <= a_paddle.y + a_paddle.length
			&& this.y + this.radius >= a_paddle.y){

				if(this.dx > 0){	
					this.dx+=20;	
				}else{
					this.dx-=20;
				}		
				return true;
		}
	


		return false;
		// return false if ball does not collide. 

	}
}