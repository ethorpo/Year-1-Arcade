var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
var coins;
var coin;
var attacks;
var attack;
var blocks;
var block;
var platform;
var edge;
var player;
var small;
var sword;
var shooter;
var shot;
var shotFired = false;
var smallMove = -100;
var swordMove = 100;
var key1;
var key2;
var key3;
var key4;
var key5;
var keyNEXT;
var direction = 0;
var swordStun = false;
var keyCount = 0;
var goldKey;
var key;
var shooterShot;
var shotFired;
var coinCount = 0;
var specialPrep = false;
var specialFired = false;
var specialAttack1;
var specialAttack2;
var specialAttack3;
var specialCount = 0;
var spike;
var spikes;
var bossKey;

function preload() {
	
	game.load.image('coins', 'img/gem.png');
	game.load.image('platform', 'img/platform.png');
	game.load.image('platform-small', 'img/platform-small.png');
	game.load.image('platform-side', 'img/platform-side.png');
	game.load.image('platform-single', 'img/platform-single.png');
	game.load.image('sky', 'img/sky.png');
	game.load.spritesheet('dude', 'img/kngiht-Test.png', 32, 48);
	game.load.spritesheet('bad-guy-sword', 'img/bad-guy-sword-sheet.png', 32, 48);
	game.load.spritesheet('bad-guy-small', 'img/bad-guy-small-sheet.png', 32, 48);
	game.load.image('bad-guy-shoot', 'img/bad-guy-shoot.png');
	game.load.spritesheet('shooterShot', 'img/missle.png', 32, 48);
	game.load.image('stop', 'img/stop.png');
	game.load.image('attack', 'img/attack.png');
	game.load.image('attack1', 'img/attack2.png');
	game.load.image('restartSign', 'img/restart.png');
	game.load.image('shield-right', 'img/shield-right.png');
	game.load.image('shield-left', 'img/shield-left.png');
	game.load.image('exit', 'img/door-open.png');
	game.load.image('door', 'img/door-closed.png');
	game.load.image('bossExit', 'img/boss-door-open.png');
	game.load.image('bossDoor', 'img/boss-door-closed.png');
	game.load.image('key', 'img/key.png');
	game.load.image('bossKey', 'img/bossKey.png');
	game.load.image('special', 'img/special.png');
	game.load.spritesheet('special-missle', 'img/special-missle.png', 32, 48);
	game.load.image('spike', 'img/spike.png');
	game.load.image('credit', 'img/credit.png');
	game.load.image('orb', 'img/orb.png');
	
}

function create() {
		
		start();		
}

function update() {

	var hitPlatform = game.physics.arcade.collide(small, platform);
	hitPlatform = game.physics.arcade.collide(sword, platform);
	hitPlatform = game.physics.arcade.collide(player, platform);
		small.body.velocity.x = 0;
	    player.body.velocity.x = 0;
		sword.body.velocity.x = 0;
	game.physics.arcade.overlap(shot, blocks, shotDie, null, this);
	game.physics.arcade.overlap(sword, blocks, stunSword, null, this);
	game.physics.arcade.overlap(player, coins, collectcoins, null, this);
	game.physics.arcade.overlap(small, attacks, fightSmall, null, this);
	game.physics.arcade.overlap(shooter, attacks, fightShooter, null, this);
	game.physics.arcade.overlap(player, sword, die, null, this);
	game.physics.arcade.overlap(player, small, die, null, this);
	game.physics.arcade.overlap(player, shot, die, null, this);
	game.physics.arcade.overlap(player, shooter, die, null, this);
	game.physics.arcade.overlap(player, spikes, die, null, this);
	game.physics.arcade.overlap(small, edge, smallTurn, null, this);
	game.physics.arcade.overlap(sword, edge, swordTurn, null, this);
	game.physics.arcade.overlap(attacks, attacks, resetAttack1, null, this);
	game.physics.arcade.overlap(player, attacks, resetAttack2, null, this);
	game.physics.arcade.overlap(blocks, blocks, resetBlock1, null, this);
	game.physics.arcade.overlap(player, blocks, resetBlock2, null, this);
	game.physics.arcade.overlap(player, load, loadNext, null, this);
	game.physics.arcade.overlap(player, goldKey, keyCollect, null, this);
	game.physics.arcade.overlap(specialAttack1, small, fightSmall, null, this);
	game.physics.arcade.overlap(specialAttack2, sword, fightSword, null, this);
	game.physics.arcade.overlap(specialAttack3, shooter, fightShooter, null, this);
	

	//restart
	
	if (key2.isDown)
	{
		game.world.removeAll();
		start();
		specialFired = false;
	}
	/*if (keyNEXT.isDown)
	{
		bossStage();
	}*/
	

	//player
		
    if (cursors.left.isDown)
    {
        player.body.velocity.x = -300;
        player.animations.play('left');
		direction = 2;
    }
    else if (cursors.right.isDown)
    {
        player.body.velocity.x = 300;
        player.animations.play('right');
		direction = 1;
    }
    else
    {
        player.animations.stop();
        player.frame = 4;
    }
	if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -1500;
	}
	if (key1.isDown)
	{
		if (key1.duration < 100)
		{
		if (direction == 1) 
		{
			
			attack = attacks.create(player.body.x + 25, player.body.y, 'attack'); 	
					attack.scale.setTo(0.75, 0.75);
		}
		
		else
		{
			attack = attacks.create(player.body.x - 45, player.body.y, 'attack1'); 	
					attack.scale.setTo(0.75, 0.75);
		}

		}
		
	}
	if (key3.isDown)
	{
		if (key3.duration < 100)
		{
		
		if (direction == 1)
		{
			
		block = blocks.create(player.body.x + 25, player.body.y, 'shield-right');
				block.scale.setTo(0.75, 0.75);
		}
	else
		{		
		block = blocks.create(player.body.x - 40, player.body.y, 'shield-left');
				block.scale.setTo(0.75, 0.75);
		}

	}
	}
		
	
	if (key1.isDown && key3.isDown) 
	{
		attack.kill();
		block.kill();
	}
	
	//SpecialAttack
	
	if (specialPrep == true && specialReady.alive == false)
	{
		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.scale.setTo(0.5, 0.5);
	}
	if (specialPrep == false && specialReady.alive)
	{
		specialReady.kill();
	}
	
	if (specialAttack1.alive && specialFired == false)
	{
		specialAttack1.kill();
	}
	if (specialAttack2.alive && specialFired == false)
	{
		specialAttack2.kill();
	}
	if (specialAttack3.alive && specialFired == false)
	{
		specialAttack3.kill();
	}
	
	if (coinCount > 9)
	{
		specialPrep = true;
	}
	else
	{
		specialPrep = false;
	}
	if (key4.isDown && specialPrep == true)
	{
		specialFired = true;
		coinCount = 0;
	}
	if (specialFired == true && player.alive && specialCount < 3)
	{
	
		specialAttack1 = game.add.sprite(player.position.x, player.position.y, 'special-missle');
		specialAttack1.enableBody = true;
		game.physics.arcade.enable(specialAttack1);
		specialCount = specialCount + 1;
		
		if (small.alive == false)
		{
			specialAttack1.kill();
			specialCount = specialCount + 1;
		}

		specialAttack2 = game.add.sprite(player.position.x, player.position.y, 'special-missle');
		specialAttack2.enableBody = true;
		game.physics.arcade.enable(specialAttack2);
		specialCount = specialCount + 1;

		if (sword.alive == false)
		{
			specialAttack2.kill();
			specialCount = specialCount + 1;
		}
		
		specialAttack3 = game.add.sprite(player.position.x, player.position.y, 'special-missle');
		specialAttack3.enableBody = true;
		game.physics.arcade.enable(specialAttack3);
		specialCount = specialCount + 1;
		
		if (shooter.alive == false)
		{
			specialAttack3.kill();
			specialCount = specialCount + 1;
		}
	}
	
	//SpecialAttack Small

	if (specialFired == true && specialAttack1.alive)
	{
		
	if (small.body.x > specialAttack1.position.x && small.body.y > specialAttack1.position.y)
	{
		specialAttack1.body.velocity.x = 150;
		specialAttack1.body.velocity.y = 150;
		specialAttack1.frame = 2;
	}
	if (small.body.x < specialAttack1.position.x && small.body.y < specialAttack1.position.y)
	{
		specialAttack1.body.velocity.x = -150;
		specialAttack1.body.velocity.y = -150;
		specialAttack1.frame = 1;
	}
	if (small.body.x > specialAttack1.position.x && small.body.y < specialAttack1.position.y)
	{
		specialAttack1.body.velocity.x = 150;
		specialAttack1.body.velocity.y = -150;
		specialAttack1.frame = 3;
	}
	if (small.body.x < specialAttack1.position.x && small.body.y > specialAttack1.position.y)
	{
		specialAttack1.body.velocity.x = -150;
		specialAttack1.body.velocity.y = 150;
		specialAttack1.frame = 0;
	}
	if (small.body.x > specialAttack1.position.x && small.body.y < specialAttack1.position.y + 50 && small.body.y > specialAttack1.position.y - 50)
	{
		specialAttack1.body.velocity.x = 150;
		specialAttack1.frame = 6;
	}
	if (small.body.x < specialAttack1.position.x && small.body.y < specialAttack1.position.y + 50 && small.body.y > specialAttack1.position.y - 50)
	{
		specialAttack1.body.velocity.x = -150;
		specialAttack1.frame = 7;
	}
	if (small.body.y > specialAttack1.position.y && small.body.x < specialAttack1.position.x + 50 && small.body.x > specialAttack1.position.x - 50)
	{
		specialAttack1.body.velocity.y = 150;
		specialAttack1.frame = 5;
	}
	if (small.body.y < specialAttack1.position.y && small.body.x < specialAttack1.position.x + 50 && small.body.x > specialAttack1.position.x - 50)
	{
		specialAttack1.body.velocity.y = -150;
		specialAttack1.frame = 4;
	}
	if (specialAttack1.position.x < 0 || specialAttack1.position.x > 800 || specialAttack1.position.y < 0 || specialAttack1.position.y > 600)
	{
		specialAttack1.kill();
		specialFired = false;
	}
	}
	
	//SpecialAttack Sword
	
		if (specialFired == true && specialAttack2.alive)
		{
			if (sword.body.x > specialAttack2.position.x && sword.body.y > specialAttack2.position.y)
	{
		specialAttack2.body.velocity.x = 150;
		specialAttack2.body.velocity.y = 150;
		specialAttack2.frame = 2;
	}
	if (sword.body.x < specialAttack2.position.x && sword.body.y < specialAttack2.position.y)
	{
		specialAttack2.body.velocity.x = -150;
		specialAttack2.body.velocity.y = -150;
		specialAttack2.frame = 1;
	}
	if (sword.body.x > specialAttack2.position.x && sword.body.y < specialAttack2.position.y)
	{
		specialAttack2.body.velocity.x = 150;
		specialAttack2.body.velocity.y = -150;
		specialAttack2.frame = 3;
	}
	if (sword.body.x < specialAttack2.position.x && sword.body.y > specialAttack2.position.y)
	{
		specialAttack2.body.velocity.x = -150;
		specialAttack2.body.velocity.y = 150;
		specialAttack2.frame = 0;
	}
	if (sword.body.x > specialAttack2.position.x && sword.body.y < specialAttack2.position.y + 50 && sword.body.y > specialAttack2.position.y - 50)
	{
		specialAttack2.body.velocity.x = 150;
		specialAttack2.frame = 6;
	}
	if (sword.body.x < specialAttack2.position.x && sword.body.y < specialAttack2.position.y + 50 && sword.body.y > specialAttack2.position.y - 50)
	{
		specialAttack2.body.velocity.x = -150;
		specialAttack2.frame = 7;
	}
	if (sword.body.y > specialAttack2.position.y && sword.body.x < specialAttack2.position.x + 50 && sword.body.x > specialAttack2.position.x - 50)
	{
		specialAttack2.body.velocity.y = 150;
		specialAttack2.frame = 5;
	}
	if (sword.body.y < specialAttack2.position.y && sword.body.x < specialAttack2.position.x + 50 && sword.body.x > specialAttack2.position.x - 50)
	{
		specialAttack2.body.velocity.y = -150;
		specialAttack2.frame = 4;
	}
	if (specialAttack2.position.x < 0 || specialAttack2.position.x > 800 || specialAttack2.position.y < 0 || specialAttack2.position.y > 600)
	{
		specialAttack2.kill();
		specialFired = false;
	}
		}
		
		//SpecialAttack Shooter
		
		if (specialFired == true && specialAttack3.alive)
		{
	if (shooter.body.x > specialAttack3.position.x && shooter.body.y > specialAttack3.position.y)
	{
		specialAttack3.body.velocity.x = 150;
		specialAttack3.body.velocity.y = 150;
		specialAttack3.frame = 2;
	}
	if (shooter.body.x < specialAttack3.position.x && shooter.body.y < specialAttack3.position.y)
	{
		specialAttack3.body.velocity.x = -150;
		specialAttack3.body.velocity.y = -150;
		specialAttack3.frame = 1;
	}
	if (shooter.body.x > specialAttack3.position.x && shooter.body.y < specialAttack3.position.y)
	{
		specialAttack3.body.velocity.x = 150;
		specialAttack3.body.velocity.y = -150;
		specialAttack3.frame = 3;
	}
	if (shooter.body.x < specialAttack3.position.x && shooter.body.y > specialAttack3.position.y)
	{
		specialAttack3.body.velocity.x = -150;
		specialAttack3.body.velocity.y = 150;
		specialAttack3.frame = 0;
	}
	if (shooter.body.x > specialAttack3.position.x && shooter.body.y < specialAttack3.position.y + 50 && shooter.body.y > specialAttack3.position.y - 50)
	{
		specialAttack3.body.velocity.x = 150;
		specialAttack3.frame = 6;
	}
	if (shooter.body.x < specialAttack3.position.x && shooter.body.y < specialAttack3.position.y + 50 && shooter.body.y > specialAttack3.position.y - 50)
	{
		specialAttack3.body.velocity.x = -150;
		specialAttack3.frame = 7;
	}
	if (shooter.body.y > specialAttack3.position.y && shooter.body.x < specialAttack3.position.x + 50 && shooter.body.x > specialAttack3.position.x - 50)
	{
		specialAttack3.body.velocity.y = 150;
		specialAttack3.frame = 5;
	}
	if (shooter.body.y < specialAttack3.position.y && shooter.body.x < specialAttack3.position.x + 50 && shooter.body.x > specialAttack3.position.x - 50)
	{
		specialAttack3.body.velocity.y = -150;
		specialAttack3.frame = 4;
	}
	if (specialAttack3.position.x < 0 || specialAttack3.position.x > 800 || specialAttack3.position.y < 0 || specialAttack3.position.y > 600)
	{
		specialAttack3.kill();
		specialFired = false;
	}
	}


	if (player.alive == false)
	{
		specialFired == false
	}

	//enimies
	
	if (player.body.x < small.body.x && player.body.x > small.body.x - 250 && player.body.x < small.body.x + 250 && player.body.y > small.body.y - 50 && player.body.y < small.body.y + 50 && hitPlatform)
	{
		smallMove = -500;
	}
	else if (player.body.x > small.body.x && player.body.x > small.body.x - 250 && player.body.x < small.body.x + 250 && player.body.y > small.body.y - 50 && player.body.y < small.body.y + 50 && hitPlatform)
	{
		smallMove = 500;
	}
		
	else (small.body.velocity.x = 0)
	{
		small.body.velocity.x = smallMove;
	}
		
	if (player.body.x < sword.body.x && player.body.y > sword.body.y - 50 && player.body.y < sword.body.y + 50 && hitPlatform)
	{
		swordMove = -100;
	}
	else if (player.body.x > sword.body.x && player.body.y > sword.body.y - 50 && player.body.y < sword.body.y + 50 && hitPlatform)
	{
		swordMove = 100;
	}
		
	else (sword.body.velocity.x = 0)
	{
		sword.body.velocity.x = swordMove;
	}
	if (swordMove == 100)
	{
			sword.animations.play('right');
	}
	if (swordMove == -100)
	{
			sword.animations.play('left');
	}
	if (smallMove > 50)
	{
			small.animations.play('right');
	}
	if (smallMove < -50)
	{
			small.animations.play('left');
	}
	if (swordStun == true)
	{
		game.physics.arcade.overlap(sword, attacks, fightSword, null, this);
	}
	
	if (shotFired == false && shooter.alive)
	{
		shotFired = true
		shot = game.add.sprite(shooter.position.x, shooter.position.y, 'shooterShot');
		shot.enableBody = true;
		game.physics.arcade.enable(shot);
	}

	if (shotFired == true)
	{
		
	if (player.body.x > shot.position.x && player.body.y > shot.position.y)
	{
		shot.body.velocity.x = 100;
		shot.body.velocity.y = 100;
		shot.frame = 2;
	}
	if (player.body.x < shot.position.x && player.body.y < shot.position.y)
	{
		shot.body.velocity.x = -100;
		shot.body.velocity.y = -100;
		shot.frame = 1;
	}
	if (player.body.x > shot.position.x && player.body.y < shot.position.y)
	{
		shot.body.velocity.x = 100;
		shot.body.velocity.y = -100;
		shot.frame = 3;
	}
	if (player.body.x < shot.position.x && player.body.y > shot.position.y)
	{
		shot.body.velocity.x = -100;
		shot.body.velocity.y = 100;
		shot.frame = 0;
	}
	if (player.body.x > shot.position.x && player.body.y < shot.position.y + 50 && player.body.y > shot.position.y - 50)
	{
		shot.body.velocity.x = 100;
		shot.frame = 6;
	}
	if (player.body.x < shot.position.x && player.body.y < shot.position.y + 50 && player.body.y > shot.position.y - 50)
	{
		shot.body.velocity.x = -100;
		shot.frame = 7;
	}
	if (player.body.y > shot.position.y && player.body.x < shot.position.x + 50 && player.body.x > shot.position.x - 50)
	{
		shot.body.velocity.y = 100;
		shot.frame = 5;
	}
	if (player.body.y < shot.position.y && player.body.x < shot.position.x + 50 && player.body.x > shot.position.x - 50)
	{
		shot.body.velocity.y = -100;
		shot.frame = 4;
	}
	if (shot.position.x < 0 || shot.position.x > 800 || shot.position.y < 0 || shot.position.y > 600)
	{
		shot.kill();
		shotFired = false;
	}
	}
}

function fightShooter () {
	
	shooter.kill();
	if (specialAttack3.alive)
	{
	specialAttack3.kill();
	}
}

function fightSmall () {
	
	small.kill();
	if (specialAttack1.alive)
	{
	specialAttack1.kill();
	}
}

function stunSword (sword, block) {
	
		swordStun = true;
		sword.animations.play('stun');
		swordMove = 0;
}

function fightSword () {
	
	sword.kill();
	if (specialAttack2.alive)
	{
	specialAttack2.kill();
	}
}

function collectcoins (player, coin) {
	
		coin.kill();
		coinCount = coinCount + 1;
}

function die () {
	
		player.kill();
		game.add.sprite(0, 0, 'restartSign');	
		keyCount = 0;
}

function smallTurn (small, stop) {
	
	smallMove = smallMove * -1;

}

function swordTurn (sword, stop) {
	
	swordMove = swordMove * -1;

}

function resetAttack () {
	
	attack.kill();
}

function resetAttack1 (attack) {
	
	attack.kill();
}

function resetAttack2 (player, attack) {
	
	attack.kill();
}

function resetBlock () {
	
	block.kill();
}

function resetBlock1 (block) {
	
	block.kill();
}

function resetBlock2 (player, block) {
	
	block.kill();
}

function shotDie () {
	
	shot.kill();
	shotFired = false;
}

function loadNext () {

game.world.removeAll();
spikes.callAll('kill');

		if (keyCount == 0)
		{
			stage2();
		}
		if (keyCount == 1)
		{
			stage3();
		}
		if (keyCount == 2)
		{
			stage4();
		}
		if (keyCount == 3)
		{
			stage5();
		}
		if (keyCount == 4)
		{
			stage6();
		}
		if (keyCount == 5)
		{
			stage7();
		}
		if (keyCount == 6)
		{
			stage8();
		}
		if (keyCount == 7)
		{
			stage9();
		}
		if (keyCount == 8)
		{
			stage10();
		sword.kill();
		}
		if (keyCount == 9)
		{
			bossStage();
		}
		
		if (specialPrep == true && specialReady.alive == false)
	{
		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.scale.setTo(0.5, 0.5);
	}
}

function keyCollect (player, key) {
	
	key.kill();
	
	keyCount = keyCount + 1;
	if (keyCount == 10)
	{
		credit = game.add.sprite(0, 0, 'credit');
	}
	if (keyCount == 9)
	{
		var level = load.create(exit.position.x, exit.position.y, 'bossExit');
		level.enableBody = true;
		level.body.immovable = true;
	}
	else{
	var level = load.create(exit.position.x, exit.position.y, 'exit');
	level.enableBody = true;
	level.body.immovable = true;
	}
	exit.kill();
}

function start () 
{
	game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;
	
		keyCount = 0;
		coinCount = 0;
		specialCount = 0;
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		key5 = game.input.keyboard.addKey(Phaser.Keyboard.P);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;
		shotFired = false;
		specialPrep = false;
		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		spikes = game.add.group();
		spikes.enableBody = true;

		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(400, 400, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(-100, 300, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(600, 100, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(400, 200, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(0, 450, 'platform-small');
		ledge.body.immovable = true;
		var stop = edge.create(375, 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(300, 200, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 200, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 550, 'stop');
		stop.body.immovable = true;
		var level = load.create(725, 36, 'exit');
		level.body.immovable = true;
		enter = game.add.sprite(20, game.world.height - 95, 'door');
			
		var spike = spikes.create(100, 100, 'spike');
		spike.body.immovable = true;
		spike.kill();
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(700, 300, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(25, 150, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(450, 100, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(80, 350, 'coins');
		coin.scale.setTo(0.5, 0.5);		
		
		//enimies
		
		small = game.add.sprite(600, 310, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = -100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		sword = game.add.sprite(20, 170, 'bad-guy-sword');
		sword.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(sword);
		sword.enableBody = true;
		sword.body.gravity.y = 5000;
		sword.body.collideWorldBounds = true;
		swordMove = 100;
		sword.animations.add('left', [0, 1, 2, 3], 10, true);
		sword.animations.add('right', [5, 6, 7, 8], 10, true);
		sword.animations.add('stun', [4], 10, true);
		
		shooter = game.add.sprite(150, 400, 'bad-guy-shoot');
		shooter.enableBody = true;
		shooter.kill();
		
		shot = game.add.sprite(0, 0, 'shooterShot');
		shot.enableBody = true;
		shot.kill();
		
		//Player
		
		player = game.add.sprite(32, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		
		specialAttack1 = game.add.sprite(player.position.x, player.position.y, 'special-missle');
		specialAttack2 = game.add.sprite(player.position.x, player.position.y, 'special-missle');
		specialAttack3 = game.add.sprite(player.position.x, player.position.y, 'special-missle');
		specialAttack1.kill();
		specialAttack2.kill();
		specialAttack3.kill();
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
		key5.onDown.add(this.gofull, this);
	
}
	
	function gofull () {
		
		
			game.scale.startFullScreen(true);
		
	}
		


function stage2 ()
{

	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;
		shotFired = false;
		
		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(400, 400, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(150, 300, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(400, 150, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(0, 150, 'platform-small');
		ledge.body.immovable = true;
		var stop = edge.create(375, 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(375, 100, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 100, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 550, 'stop');
		stop.body.immovable = true;
		exit = game.add.sprite(700, 85, 'door');
		enter = game.add.sprite(680, game.world.height - 95, 'door');
		key = goldKey.create(25, 25, 'key');
		key.body.immovable = true;
		
	
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(700, 300, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(450, 100, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(50, 400, 'coins');
		coin.scale.setTo(0.5, 0.5);	
		
		//enimies
		
		small = game.add.sprite(600, 310, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = -100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		sword = game.add.sprite(550, 50, 'bad-guy-sword');
		sword.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(sword);
		sword.enableBody = true;
		sword.body.gravity.y = 5000;
		sword.body.collideWorldBounds = true;
		swordMove = 100;
		sword.animations.add('left', [0, 1, 2, 3], 10, true);
		sword.animations.add('right', [5, 6, 7, 8], 10, true);
		sword.animations.add('stun', [4], 10, true);
		
		shooter = game.add.sprite(150, 400, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);

				
		//Player
		
		player = game.add.sprite(700, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}


function stage3 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;	

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();		

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(350, 420, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(150, 300, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(500, 300, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(500, 150, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(0, 150, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(0, 150, 'platform-small');
		ledge.body.immovable = true;
		var stop = edge.create(700, 275, 'stop');
		stop.body.immovable = true;
		stop = edge.create(475, 275, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 550, 'stop');
		stop.body.immovable = true;
		enter = game.add.sprite(680, game.world.height - 95, 'door');
		exit = game.add.sprite(50, 85, 'door');
		key = goldKey.create(700, 50, 'key');
		key.body.immovable = true;
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(450, 100, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(80, 400, 'coins');
		coin.scale.setTo(0.5, 0.5);		
		
		//enimies
		
		small = game.add.sprite(400, 450, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = 100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		sword = game.add.sprite(600, 200, 'bad-guy-sword');
		sword.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(sword);
		sword.enableBody = true;
		sword.body.gravity.y = 5000;
		sword.body.collideWorldBounds = true;
		swordMove = 100;
		sword.animations.add('left', [0, 1, 2, 3], 10, true);
		sword.animations.add('right', [5, 6, 7, 8], 10, true);
		sword.animations.add('stun', [4], 10, true);
		
		
		shooter = game.add.sprite(25, 250, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		
		//Player
		
		player = game.add.sprite(700, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}

function stage4 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;		
		
		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(0, 420, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(400, 420, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(175, 300, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(450, 225, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(650, 125, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(0, 100, 'platform');
		ledge.body.immovable = true;
		var stop = edge.create(600, 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 550, 'stop');
		stop.body.immovable = true;
		enter = game.add.sprite(50, game.world.height - 95, 'door');
		exit = game.add.sprite(50, 35, 'door');
		key = goldKey.create(25, 150, 'key');
		key.body.immovable = true;
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(450, 100, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(80, 400, 'coins');
		coin.scale.setTo(0.5, 0.5);		
		
		//enimies
		
		small = game.add.sprite(400, game.world.height - 125, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = 100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		sword = game.add.sprite(400, 300, 'bad-guy-sword');
		sword.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(sword);
		sword.enableBody = true;
		sword.body.gravity.y = 5000;
		sword.body.collideWorldBounds = true;
		swordMove = 100;
		sword.animations.add('left', [0, 1, 2, 3], 10, true);
		sword.animations.add('right', [5, 6, 7, 8], 10, true);
		sword.animations.add('stun', [4], 10, true);
		
		
		shooter = game.add.sprite(25, 150, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		
		//Player
		
		player = game.add.sprite(50, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}

function stage5 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;	

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(-100, 420, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(125, 300, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(475, 250, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(650, 425, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(400, 100, 'platform-small');
		ledge.body.immovable = true;
		var ledgeUp = platform.create(200, 169, 'platform-side');
		ledgeUp.body.immovable = true;
		var stop = edge.create(625, 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(game.world.width -9 , 350, 'stop');
		stop.body.immovable = true;
		stop = edge.create(220, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 550, 'stop');
		stop.body.immovable = true;
		enter = game.add.sprite(50, game.world.height - 95, 'door');
		exit = game.add.sprite(400, 35, 'door');
		key = goldKey.create(450, 450, 'key');
		key.body.immovable = true;
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(350, 50, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(80, 50, 'coins');
		coin.scale.setTo(0.5, 0.5);	
		coin = coins.create(350, 400, 'coins');
		coin.scale.setTo(0.5, 0.5);	
		coin = coins.create(750, 525, 'coins');
		coin.scale.setTo(0.5, 0.5);			
		
		//enimies
		
		small = game.add.sprite(400, game.world.height - 125, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = 100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		sword = game.add.sprite(650, 300, 'bad-guy-sword');
		sword.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(sword);
		sword.enableBody = true;
		sword.body.gravity.y = 5000;
		sword.body.collideWorldBounds = true;
		swordMove = 100;
		sword.animations.add('left', [0, 1, 2, 3], 10, true);
		sword.animations.add('right', [5, 6, 7, 8], 10, true);
		sword.animations.add('stun', [4], 10, true);
		
		
		shooter = game.add.sprite(650, 50, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		
		//Player
		
		player = game.add.sprite(50, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}

function stage6 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();		

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(0, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(125, 300, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(600, 300, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(350, 300, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(250, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(500, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(740, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(300, 200, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(500, 200, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(-100, 100, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(600, 100, 'platform');
		ledge.body.immovable = true;
		enter = game.add.sprite(400, game.world.height - 95, 'door');
		exit = game.add.sprite(50, 35, 'door');
		key = goldKey.create(700, 20, 'key');
		key.body.immovable = true;
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(50, 150, 'coins');
		coin.scale.setTo(0.5, 0.5);	
		coin = coins.create(375, 425, 'coins');
		coin.scale.setTo(0.5, 0.5);	
		coin = coins.create(750, 150, 'coins');
		coin.scale.setTo(0.5, 0.5);			
		
		//enimies
		
		shooter = game.add.sprite(400, 100, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		//Player
		
		player = game.add.sprite(400, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}

function stage7 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;	

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();		

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(-100, 420, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(140, 300, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(230, 300, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(525, 250, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(525, 450, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(225, 450, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(675, 450, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(0, 100, 'platform-single');
		ledge.body.immovable = true;
		var ledgeUp = platform.create(200, 169, 'platform-side');
		ledgeUp.body.immovable = true;
		ledgeUp = platform.create(575, 169, 'platform-side');
		ledgeUp.body.immovable = true;
		var stop = edge.create(220, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(570, 550, 'stop');
		stop.body.immovable = true;
		enter = game.add.sprite(50, game.world.height - 95, 'door');
		exit = game.add.sprite(0, 35, 'door');
		key = goldKey.create(675, 500, 'key');
		key.body.immovable = true;
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(400, 50, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(80, 50, 'coins');
		coin.scale.setTo(0.5, 0.5);	
		coin = coins.create(375, 400, 'coins');
		coin.scale.setTo(0.5, 0.5);	
		coin = coins.create(700, 125, 'coins');
		coin.scale.setTo(0.5, 0.5);			
		
		//enimies
		
		small = game.add.sprite(400, 450, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = 100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		shooter = game.add.sprite(675, 300, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		
		//Player
		
		player = game.add.sprite(50, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}

function stage8 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;	

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();		

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		spikes = game.add.group();
		spikes.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(300, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(125, 300, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(500, 300, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(0, 150, 'platform');
		ledge.body.immovable = true;
		var stop = edge.create(400, 125, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 125, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(790, 550, 'stop');
		stop.body.immovable = true;
		enter = game.add.sprite(680, game.world.height - 95, 'door');
		exit = game.add.sprite(50, 85, 'door');
		key = goldKey.create(700, 50, 'key');
		key.body.immovable = true;
		var spike = spikes.create(0, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(32, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(64, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(98, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(130, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(162, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(196, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(228, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(450, 100, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(80, 400, 'coins');
		coin.scale.setTo(0.5, 0.5);		
		
		//enimies
		
		small = game.add.sprite(400, game.world.height - 125, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = 100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		sword = game.add.sprite(50, 50, 'bad-guy-sword');
		sword.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(sword);
		sword.enableBody = true;
		sword.body.gravity.y = 5000;
		sword.body.collideWorldBounds = true;
		swordMove = 100;
		sword.animations.add('left', [0, 1, 2, 3], 10, true);
		sword.animations.add('right', [5, 6, 7, 8], 10, true);
		sword.animations.add('stun', [4], 10, true);
		
		
		shooter = game.add.sprite(25, 250, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		
		//Player
		
		player = game.add.sprite(680, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
		
}
function stage9 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;	

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();		

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		spikes = game.add.group();
		spikes.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(0, 420, 'platform');
		ledge.body.immovable = true;
		ledge = platform.create(400, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(175, 300, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(450, 225, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(650, 125, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(0, 100, 'platform');
		ledge.body.immovable = true;
		var stop = edge.create(500, 375, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 375, 'stop');
		stop.body.immovable = true;
		stop = edge.create(-9, 550, 'stop');
		stop.body.immovable = true;
		stop = edge.create(590, 550, 'stop');
		stop.body.immovable = true;
		enter = game.add.sprite(50, game.world.height - 95, 'door');
		exit = game.add.sprite(50, 35, 'door');
		key = goldKey.create(25, 150, 'key');
		key.body.immovable = true;
		var spike = spikes.create(600, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(632, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(664, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(696, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(728, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(760, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		
		//Pickups
		
		coins = game.add.group();
		coins.enableBody = true;
		var coin = coins.create(450, 100, 'coins');
		coin.scale.setTo(0.5, 0.5);
		coin = coins.create(80, 400, 'coins');
		coin.scale.setTo(0.5, 0.5);		
		
		//enimies
		
		small = game.add.sprite(400, 450, 'bad-guy-small');
		small.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(small);
		small.enableBody = true;
		small.body.gravity.y = 5000;
		small.body.collideWorldBounds = true;
		smallMove = 100;
		small.animations.add('left', [3], 10, true);
		small.animations.add('right', [5], 10, true);
		
		sword = game.add.sprite(300, 300, 'bad-guy-sword');
		sword.scale.setTo(1.75, 1.75);
		game.physics.arcade.enable(sword);
		sword.enableBody = true;
		sword.body.gravity.y = 5000;
		sword.body.collideWorldBounds = true;
		swordMove = 100;
		sword.animations.add('left', [0, 1, 2, 3], 10, true);
		sword.animations.add('right', [5, 6, 7, 8], 10, true);
		sword.animations.add('stun', [4], 10, true);
		
		
		shooter = game.add.sprite(675, 50, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		
		//Player
		
		player = game.add.sprite(50, 500, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}
function stage10 ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;	

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();		

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		spikes = game.add.group();
		spikes.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		var ledge = platform.create(550, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(150, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(350, 420, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(600, 100, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(325, 100, 'platform-small');
		ledge.body.immovable = true;
		ledge = platform.create(0, 250, 'platform-single');
		ledge.body.immovable = true;
		ledge = platform.create(175, 175, 'platform-single');
		ledge.body.immovable = true;
		enter = game.add.sprite(680, game.world.height - 95, 'door');
		exit = game.add.sprite(400, 38, 'bossDoor');
		key = goldKey.create(725, 75, 'bossKey');
		key.body.immovable = true;
		var spike = spikes.create(600, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(568, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(536, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(504, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(472, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(440, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(408, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(376, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(344, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(312, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(280, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(248, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(216, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(184, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(152, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(120, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(88, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(56, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(24, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		spike = spikes.create(-12, 535, 'spike');
		spike.body.immovable = true;
		spike.scale.setTo(.5, .5);
		
		//Pickups

		//enimies
		
		shooter = game.add.sprite(600, 150, 'bad-guy-shoot');
		shooter.enableBody = true;
		game.physics.arcade.enable(shooter);
		
		//Player
		
		player = game.add.sprite(700, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}

function bossStage ()
{
	    cursors = game.input.keyboard.createCursorKeys();
		key1 = game.input.keyboard.addKey(Phaser.Keyboard.D);	
		key2 = game.input.keyboard.addKey(Phaser.Keyboard.R);
		key3 = game.input.keyboard.addKey(Phaser.Keyboard.A);
		key4 = game.input.keyboard.addKey(Phaser.Keyboard.F);
		keyNEXT = game.input.keyboard.addKey(Phaser.Keyboard.J);
		swordStun = false;	
		shotFired = false;	

		specialReady = game.add.sprite(550, game.world.height - 50, 'special');
		specialReady.kill();		

		//World
	    game.physics.startSystem(Phaser.Physics.ARCADE);
		game.add.sprite(0, 0, 'sky');
		platform = game.add.group();
		platform.enableBody = true;
		edge = game.add.group();
		edge.enableBody = true;
		load = game.add.group();
		load.enableBody = true;
		goldKey = game.add.group();
		goldKey.enableBody = true;
		spikes = game.add.group();
		spikes.enableBody = true;
		var ground = platform.create(0, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		ground = platform.create(400, game.world.height - 32, 'platform');
		ground.body.immovable = true;
		key = goldKey.create(368, 300, 'orb');
		key.body.immovable = true;
		
		//Pickups

		//enimies
		
		//Player
		
		player = game.add.sprite(700, game.world.height - 80, 'dude');
		game.physics.arcade.enable(player);
		player.body.gravity.y = 5000;
		player.body.collideWorldBounds = true;
		player.animations.add('left', [0, 1, 2, 3], 10, true);
		player.animations.add('right', [5, 6, 7, 8], 10, true);
		
		//block
		
		blocks = game.add.group();
		blocks.enableBody = true;
		game.physics.arcade.enable(blocks);
		
				
		//attack
		
		attacks = game.add.group();
		attacks.enableBody = true;
		
}