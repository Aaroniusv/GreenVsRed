
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var HEIGHT = 400;
var WIDTH = 400;
var keys = [];




window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});
window.addEventListener("keyup", function(e) {
    keys[e.keyCode] = false;
});
var Enemy =
{
	x: this.x ||Math.random()*400,

	y: this.y || Math.random() *400,
	isAlive: true || this.isAlive,
  DrawEnemy: function()
	{
		ctx.fillStyle= "#FA1F40";
		ctx.fillRect(this.x,this.y,40,40);
	},
  KillEnemy: function()
  {
    ctx.clearRect(this.x,this.y,40,40);
    this.isAlive = false;
  }
};
var canvasHelper =
{
	drawMap: function()
	{
		ctx.fillStyle= "#040033";
		ctx.fillRect(0,0,WIDTH,HEIGHT);
	}
};
var Player =
{
	x: this.x || 0,
	y: this.y ||0,
  points: Number(this.points) || 0,
  timer: Number(this.timer) || 0,
  isAlive: this.isAlive || true,
	DrawPlayer: function()
	{
		ctx.fillStyle= "#75FB48";
		ctx.fillRect(Player.x,Player.y,20,20);
	},
  GameOver: function()
  {
    alert("GAME OVER!!!");
  },
};
var Projectile =
{
  x: this.x || 0,
	y: this.y ||0,

	DrawPlayer: function()
	{
		ctx.fillStyle= "#75FB48";
		ctx.fillRect(Player.x,Player.y,3,3);
	},
};



// distance check
function distance(ent1, ent2){
    var x = ent2.x + 20 - ent1.x,
        y = ent2.y +20 - ent1.y,
        collision = false;
    if (x >= 0 && x <= 60 && y >= 0 && y <= 60)
    {
      collision = true;
    }
    return collision;
}

function update(mod)
{
	if(keys[39]){
		Player.x += 3;
	}
	if(keys[37]){
		Player.x -= 3;
	}
	if(keys[38]){
		Player.y -= 3;
	}
	if(keys[40]){
		Player.y += 3;
	}


}
render = function()
{
	ctx.clearRect(0,0,WIDTH,HEIGHT);
	update(null);
	if(distance(Enemy,Player))
  {
    console.log("Collision detected");
    Player.timer = 0;
    Enemy.KillEnemy();
    Player.points ++;
    document.getElementById("points").innerText = Player.points;
    Enemy.isAlive = true;
    Enemy.x = Math.random()*400;
  	Enemy.y = Math.random() *400;
    Enemy.DrawEnemy();
  }
  if (Player.timer >= 5 && Enemy.isAlive)
  {
    alert("game over");
    Player.timer = 0;
    Enemy.x = Math.random()*400;
  	Enemy.y = Math.random() *400;
    Enemy.DrawEnemy();
  }

	canvasHelper.drawMap();
	Player.DrawPlayer();
  if (Enemy.isAlive)
  {
    Enemy.DrawEnemy();
  }
	requestAnimationFrame(render);

}


main = function()
{
	render();
  setInterval(function()
  {
    Player.timer ++;
    document.getElementById("timer").innerText = Player.timer;
    console.log(Number(Player.timer)  );
    }, 1000);


}
