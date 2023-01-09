var level01 = function (window) {

    window.opspark = window.opspark || {};

    var draw = window.opspark.draw;
    var createjs = window.createjs;

    window.opspark.runLevelInGame = function (game) {
        // some useful constants 
        var groundY = game.groundY;

        // this data will allow us to define all of the
        // behavior of our game
        var levelData = {
            "name": "Robot Romp",
            "number": 1,
            "speed": -3,
            "gameItems": [
                { "type": "sawblade", "x": 400, "y": groundY },
                { "type": "sawblade", "x": 600, "y": groundY },
                { "type": "sawblade", "x": 900, "y": groundY },
                { 'type': 'sawblade', 'x': 1800, 'y': 250 },
                { 'type': 'reward', 'x': 400, 'y': groundY - 30 },
                { 'type': 'reward', 'x': 1600, 'y': groundY - 50 },
                { 'type': 'reward', 'x': 1050, 'y': 300 },
                { 'type': 'tiger', 'x': 1500, 'y': 240 },
                { 'type': 'tiger', 'x': 1300, 'y': 250 },
                { 'type': 'tiger', 'x': 800, 'y': groundY-250 },
                { 'type': 'bama', 'x': 1600, 'y': groundY-250 },
                { 'type': 'bama', 'x': 1200, 'y': groundY-250 }, 
                { 'type': 'bama', 'x': 2000, 'y': groundY-250 },
                { 'type': 'enemy', 'x': 2400, 'y': groundY-160 },
                { 'type': 'enemy', 'x': 2600, 'y': groundY-160 },
                { 'type': 'enemy', 'x': 2800, 'y': groundY-170 },
                { 'type': 'enemy', 'x': 3000, 'y': groundY-160 }, 
                { 'type': 'enemy', 'x': 3200, 'y': groundY-150 },
                { 'type': 'enemy', 'x': 3400, 'y': groundY-170 }, 
            ]
        };
        window.levelData = levelData;
        // set this to true or false depending on if you want to see hitzones
        game.setDebugMode(false);

        // TODO 6 and on go here
        // BEGIN EDITING YOUR CODE HERE
        var hitZoneSize = 25;
        var damageFromObstacle = 10;

        var hitZoneSize2 = 30;
        var damageFromObstacle2 = 15;

        function createSawBlade(a, b) {
            var sawBladeHitZone = game.createObstacle(hitZoneSize, damageFromObstacle);
            sawBladeHitZone.x = a;
            sawBladeHitZone.y = b;
            game.addGameItem(sawBladeHitZone);

            var obstacleImage = draw.bitmap("img/sawblade.png");
            sawBladeHitZone.addChild(obstacleImage);

            obstacleImage.x = -(hitZoneSize)
            obstacleImage.y = -(hitZoneSize)
        }

        function createTiger(a, b) {
            var sawBladeHitZone = game.createObstacle(hitZoneSize2, damageFromObstacle2);
            sawBladeHitZone.x = a;
            sawBladeHitZone.y = b;
            game.addGameItem(sawBladeHitZone);
            var obstacleImage = draw.bitmap('img/tiger1.png');
            sawBladeHitZone.addChild(obstacleImage);

            obstacleImage.x = -(hitZoneSize)
            obstacleImage.y = -(hitZoneSize)
        }

        createSawBlade(900, groundY - 75);
        createSawBlade(450, groundY - 100);
        createSawBlade(50, groundY - 50);
        createTiger(950, groundY - 120);
        createTiger(550, groundY - 185)

        function createEnemy(x, y) {
            var enemy = game.createGameItem('enemy', 25);
            var bama = draw.bitmap('img/bama.jpg');
            bama.x = -25;
            bama.y = groundY - 250;
            bama.scaleX = .25;
            bama.scaleY = .25;
            enemy.addChild(bama);
            enemy.x = x;
            enemy.y = y;
            enemy.velocityX = -1;
            enemy.rotationalVelocity = 3;
            game.addGameItem(enemy);


            enemy.onPlayerCollision = function () {
                console.log('The enemy has hit Halle');
                game.changeIntegrity(-10);
            };
            enemy.onProjectileCollision = function () {
                console.log('Halle has hit the enemy');
                game.increaseScore(100);
                enemy.flyTo(1000, 1000);

            }
        }
        createEnemy(780, groundY - 285);
        function createReward(x, y) {
            function reward(x, y) {
                var reward = game.createGameItem('reward', 25);
                var football = draw.bitmap('img/reward2.png');
                football.x = -50;
                football.y = -50;
                reward.addChild(football);
                football.scaleX=.2;
                football.scaleY=.2;
                reward.x = x;
                reward.y = y;
                game.addGameItem(reward);
                reward.velocityX = -3;
                reward.onPlayerCollision = function () {
                    console.log('The lifeItem has touched Halle');
                    game.changeIntegrity(+25);
                    reward.fadeOut();
                };
                reward.onProjectileCollision = function () {
                    console.log('Halle has touched the lifeItem');
                    game.increaseScore(100);
                    reward.fadeOut();
                }
            }
            reward(650, groundY - 50);

        }
        createReward();
        createEnemy(400, groundY - 200);
createEnemy(800, groundY - 100);
createEnemy(1200, groundY - 150);
        // DO NOT EDIT CODE BELOW HERE
    }
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if ((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = level01;
}
