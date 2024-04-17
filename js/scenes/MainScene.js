import Entreprise from '../Entreprise.js';
import Player from '../Player.js';
export default class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
        localStorage.setItem("alternance", false);
    }

    preload() {
        this.load.audio('music', './assets/audio/audio.mp3');
        this.load.image('welcome', './assets/map/night.png');
        this.load.image('sol', './assets/tiles/sol.png');
        this.load.image('star', './assets/tiles/star.png');
        this.load.image('cloud', './assets/tiles/cloud.png');
        this.load.image('bomber', './assets/tiles/bomb.png');
        this.load.image('carapace', './assets/tiles/carap.png');
        this.load.image('arb', './assets/tiles/arbitre.png');
        this.load.image('plant', './assets/tiles/carniplant.png');
        this.load.spritesheet('Kaijin', './assets/sprites/Kaijin.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Erza', './assets/sprites/Erza.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Bee', './assets/sprites/Bee.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Ellen', './assets/sprites/Ellen.png', { frameWidth: 32, frameHeight: 32 });

    }

    create() {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        const music = this.sound.add('music', { loop: true, volume: 0.5 });
        music.play();
        let soundEnabled =true
        
        
        
        
        let background = this.add.image(0, 0, 'welcome').setOrigin(0);
        background.displayWidth = this.sys.game.config.width;
        background.scaleY = background.scaleX
        
        const welcomeText = this.add.text(screenWidth / 2, 40, 'Welcome in Alternance Quest!', {
            fontFamily: 'sans-serif',
            fontSize: 48,
            color: '#ffffff'
        });
        
        const chooseText = this.add.text(screenWidth / 2, 100, 'Choose your player', {
            fontFamily: 'sans-serif',
            fontSize: 28,
            color: '#ffffff',
            backgroundColor: '#8B4513',
            padding: {
                x: 20,
                y: 10
            },
            stroke: '#FFD700',
            strokeThickness: 1,
            cornerRadius: 10
        });
        
        welcomeText.setOrigin(0.5);
        chooseText.setOrigin(0.5);
        
        const soundButton = this.add.text(
            20, 
            20, 
            'Sound: On', 
            { 
                fontFamily: 'Arial', 
                fontSize: 16, 
                color: '#ffffff' 
            }
        ).setInteractive();
    
        soundButton.on('pointerdown', () => {
            if (soundEnabled) {
                soundButton.setText('Sound: Off');
                soundEnabled = false;
                music.stop(); 
            } else {
                soundButton.setText('Sound: On');
                soundEnabled = true;
                music.play(); 
            }
        });
        

        this.platforms = this.physics.add.staticGroup();
        let sol = this.platforms.create(710, 525, "sol")
        let cloud = this.platforms.create(450, 615, "cloud")
        let bomber = this.platforms.create(650, 615, "bomber")
        let carapace = this.platforms.create(850, 615, "carapace")
        let plant = this.platforms.create(1050, 615, "plant")
        let arb = this.platforms.create(1100, 100, "arb")
        let star1 = this.platforms.create(100, 100, "star")
        let star2 = this.platforms.create(1000, 200, "star")
        let star3 = this.platforms.create(500, 300, "star")
        let star4 = this.platforms.create(800, 150, "star")
        let star5 = this.platforms.create(300, 900, "star")
        let star6 = this.platforms.create(500, 600, "star")

        let obj1 = {
            "key": 'Kaijin',
            "name": "Kaijin",
            "pv": 5,
            "gender": "Male",
            "age": "21yo",
            "node": "5/10",
            "react": "5/10",
            "java": "5/10",
            "leadership": "5/10",
            "shame": "5/10"
        }

        let obj2 = {
            "key": 'Erza',
            "name": "Erza",
            "pv": 5,
            "gender": "Female",
            "age": "21yo",
            "node": "5/10",
            "react": "5/10",
            "java": "5/10",
            "leadership": "5/10",
            "shame": "5/10"
        }

        let obj3 = {
            "key": 'Bee',
            "name": "Bee",
            "pv": 5,
            "gender": "Male",
            "age": "21yo",
            "node": "5/10",
            "react": "5/10",
            "java": "5/10",
            "leadership": "5/10",
            "shame": "5/10"
        }

        let obj4 = {
            "key": 'Ellen',
            "name": "Ellen",
            "pv": 5,
            "gender": "Female",
            "age": "21yo",
            "node": "5/10",
            "react": "5/10",
            "java": "5/10",
            "leadership": "5/10",
            "shame": "5/10"
        }

        this.player1 = this.platforms.create(450, 500, obj1.key).setScale(2.5).refreshBody();
        this.player1.setData('customData', obj1);
        this.player2 = this.platforms.create(650, 500, obj2.key).setScale(2.5).refreshBody();
        this.player2.setData('customData', obj2);
        this.player3 = this.platforms.create(850, 500, obj3.key).setScale(2.5).refreshBody();
        this.player3.setData('customData', obj3);
        this.player4 = this.platforms.create(1050, 500, obj4.key).setScale(2.5).refreshBody();
        this.player4.setData('customData', obj4);

        this.players = [this.player1, this.player2, this.player3, this.player4];

        const obj1Value = this.player1.getData('customData');

        this.players.forEach(player => {
            player.setInteractive();
            player.on(Phaser.Input.Events.POINTER_OVER, () => {

                this.showPlayerInfo(player);
            });
            player.on(Phaser.Input.Events.POINTER_OUT, () => {

                this.hidePlayerInfo();
            });

            const chooseButton = this.add.text(player.x - 30, player.y + player.height + 5, 'Choisir', {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                backgroundColor: '#8B4513',
                padding: {
                    x: 10,
                    y: 5
                }
            }).setInteractive();

            chooseButton.on(Phaser.Input.Events.POINTER_DOWN, () => {
                let playerInfo = player.getData('customData')

                this.choosedPlayer(playerInfo);
            });
        });


    }


    showPlayerInfo(player) {

        if (this.playerInfoText) {
            this.playerInfoText.destroy();
        }


        this.playerInfoText = this.add.text(player.x, player.y - 100,
            `Name: ${player.getData('customData').key}\nAge: ${player.getData('customData').age}\nGender: ${player.getData('customData').gender}\nLeadership: ${player.getData('customData').leadership}\nShame: ${player.getData('customData').shame}\nReact: ${player.getData('customData').react}\nNode: ${player.getData('customData').node}\nJava: ${player.getData('customData').java}`,

            {
                fontFamily: 'Arial',
                fontSize: 18,
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: {
                    x: 10,
                    y: 10
                }
            });


        this.playerInfoText.setOrigin(0.5);
        this.playerInfoText.setDepth(1);


    }


    hidePlayerInfo() {

        if (this.playerInfoText) {
            this.playerInfoText.destroy();
            this.playerInfoText = null;
        }
    }

    choosedPlayer(player) {
        this.scene.stop("MainScene");
        this.scene.start("Scene1", { Player: player });

    }

}

