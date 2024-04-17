import Scene1 from './scenes/Scene1.js';
import Scene2 from './scenes/Scene2.js';
import Scene0 from './scenes/Scene0.js';
import Epitech from './scenes/EpitechScene.js';
import MainScene from './scenes/MainScene.js';
const config = {
    type: Phaser.AUTO,
    width: 2500,
    height: 2500,
    scale: {
        mode: Phaser.Scale.RESIZE,
        parent: 'game-container',
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [MainScene,Scene1,Scene0, Scene2, Epitech]
}

const game = new Phaser.Game(config);
