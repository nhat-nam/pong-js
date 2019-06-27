 function Paddle(x){

this.x = x
this.y = 18

this.dy = 0;

this.width= 30;
this.length = 80;

this.update = function(delta){

	this.y = this.y + (this.dy * (delta/1000));


	if(this.y <= 0){
		this.y = 0; 
	}

	if(this.y >= HEIGHT - this.length){
		this.y = HEIGHT - this.length;
	}


}
this.render = function(ctx){
		ctx.fillStyle = "white";
		ctx.fillRect(this.x, this.y, this.width, this.length);

	}
}