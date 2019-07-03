function Ball(){

	this.x = 500
	this.y = 250

	this.dx = 0;
	this.dy = 0;

	this.starting_speed = 500;
	this.max_speed_x = 2000;

	this.original_color = "white";
	this.color = "white";
	this.radius = 10;

	this.update = function(delta){

		this.y = this.y + (this.dy * (delta/1000));
		this.x = this.x + (this.dx * (delta/1000));
	}
	this.resetColor = function(){
		this.color = this.original_color;
	}
	this.render = function(ctx){
		ctx.fillStyle=this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 360);
		ctx.fill();
		ctx.closePath();
		//this.drawBallPath(ctx);
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
					if(this.dx > this.max_speed_x){
						this.dx = this.max_speed_x;
					}
				}else{
					this.dx-=20;
					if(this.dx < -1*this.max_speed_x){
						this.dx = -1*this.max_speed_x;
					}
				}		
				return true;
		}
	


		return false;
		// return false if ball does not collide. 

	}
	this.drawBallPath = function(ctx){

		var x = this.x;
		var y = this.y;
		var slope = this.dy/this.dx;
		ctx.strokeStyle="white";
		var y_vel = this.dy;
		ctx.moveTo(this.x,this.y);
		var prevX, prevY;
		while(  x < WIDTH && x > 0){
			prevX = x;
			prevY = y;
			if(y_vel==0){
				if(this.dx > 0 ){
					x = 10000;
				}else{
					x = -10000;
				}
			}
			if(y_vel > 0){
				// 
				distToBottom = HEIGHT - y-this.radius; 
				distToNewX = distToBottom/slope;
				x = x + distToNewX;
				y=HEIGHT -this.radius;
				y_vel = y_vel * -1;
			}else if(y_vel< 0){
				distToTop = y - this.radius;
				distToNewX = distToTop/slope;
				x = x - distToNewX;
				y = this.radius;
				y_vel = y_vel * -1;
			}
			ctx.lineTo(x,y);
			slope = slope*-1;
		}
		ctx.stroke();
		var d = (x-WIDTH)*slope;
		if(d >= 0){
			return d;
		}else {
			return 500 + d;
		}
	
	}
	this.predictBallPath = function(){

		var x = this.x;
		var y = this.y;
		var slope = this.dy/this.dx;
		var y_vel = this.dy;
		var prevX, prevY;
		while(  x < WIDTH && x > 0){
			prevX = x;
			prevY = y;
			if(y_vel==0){
				if(this.dx > 0 ){
					x = 10000;
				}else{
					x = -10000;
				}
			}
			if(y_vel > 0){
				// 
				distToBottom = HEIGHT - y-this.radius; 
				distToNewX = distToBottom/slope;
				x = x + distToNewX;
				y=HEIGHT -this.radius;
				y_vel = y_vel * -1;
			}else if(y_vel< 0){
				distToTop = y - this.radius;
				distToNewX = distToTop/slope;
				x = x - distToNewX;
				y = this.radius;
				y_vel = y_vel * -1;
			}
			slope = slope*-1;
		}
		var d = (x-WIDTH)*slope;
		if(d == -0){
			return 250;
		}
		if(d >= 0){
			return d;
		}else {
			return 500 + d;
		}
		
	}
}