import Player from '../Player.js';
import Entreprise from '../Entreprise.js';
import Questions from '../Questions.js';
import react from '../questions/react.json' with { type: 'json' };
import reactred from '../questions/reactred.json' with { type: 'json' };
import mern from '../questions/mern.json' with { type: 'json' };
import node from '../questions/node.json' with { type: 'json' };
import phplar from '../questions/phplar.json' with { type: 'json' };
import java from '../questions/java.json' with { type: 'json' };
import flutter from '../questions/flutter.json' with { type: 'json' };
import csharp from '../questions/csharp.json' with { type: 'json' };

export default class Scene2 extends Phaser.Scene {
    constructor() {
        super('Scene2');
    }

    preload() {
        

        this.load.spritesheet('rec1', `./assets/sprites/rec1.png`, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('rec2', `./assets/sprites/rec2.png`, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('rec3', `./assets/sprites/rec3.png`, { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('rec4', `./assets/sprites/rec4.png`, { frameWidth: 32, frameHeight: 32 });
        this.load.image('img', './assets/tiles/bat4.png');
        this.load.image('map', './assets/map/map.png');
        this.load.image('map2', './assets/map/map2.png');
        this.load.image('map3', './assets/map/map3.png');
        this.load.image('map4', './assets/map/map4.png');
        this.load.image('map5', './assets/map/map5.png');
        
        

    }

    create(data) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        this.map = this.add.tileSprite(screenWidth / 2, screenHeight / 2, 100000, screenHeight, data.mapKey);
        this.map.setOrigin(0.5);
        let player = data.player

        let rec= ['rec1', 'rec2', 'rec3', 'rec4']
        console.log(data);
        let choix = rec[Math.floor(Math.random() * rec.length)]
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(1000, 640, choix).setScale(4).refreshBody();
        this.player = new Player(this, 150, 720, player.key, player.name, player.pv, player.gender, player.age,player.node,player.react,player.java, player.leadership,player.shame);
        this.physics.world.enable(this.player);
        this.player.setScale(4)
        
        let datas= '';

        switch (data.postes) {
            case "Dev Java":
                
                datas = java
                break;

            case "Dev React":
                
                datas = react
                break;
                
                case "Dev React Redux":
                    
                    datas = reactred
                    break;
                
                case "Dev Laravel":
                    
                    datas = phplar
                    break;
                
                case "Dev PHP Laravel":
                    
                    datas = phplar
                    break;
                
                case "Dev Node":
                    
                    datas = node
                    break;
                
                case "Dev Node Express":
                    
                    datas = node
                    break;
                
                case "Dev MERN, React":
                    
                    datas = mern
                    break;
                
                case "Dev mobile Flutter":
                    
                    datas = flutter
                    break;
                
                case "Dev C# stack .Net":
                    
                    datas = csharp
                    break;

            default:
                datas = phplar
                break;
        }

        this.ques = new Questions(this, 100, 100, "img", "", datas);

        const exitButton = this.add.text(50, 690, 
            'Exit',
            {
                fontFamily: 'sans-serif',
                fontSize: 24,
                color: '#ffffff',
                backgroundColor: '#0066ff',
                padding: {
                    x: 10,
                    y: 10
                },
            }).setOrigin(0.5);
        exitButton.setInteractive();
        exitButton.on('pointerdown', () => {
            this.scene.start('Scene1', {Player:data.player});
        });

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map.width, this.map.height);
    }

    update() {
        this.player.update();
    }

    handleCollision() {

        this.scene.start('MainScene');
        this.scene.start('Scene2');
    }
}
