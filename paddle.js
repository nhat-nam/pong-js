function Paddle(x){

this.x = x
this.y = 398

this.dy = -200;

this.width= 30;
this.length = 80;

this.update = function(delta){

	this.y = this.y + (this.dy * (delta/1000));
}
this.render = function(ctx){
		ctx.fillStyle="magenta";
		ctx.fillRect(this.x, this.y, this.width, this.length);

	}
}