import Player from '../Player.js';
import Entreprise from '../Entreprise.js';
import Questions from '../Questions.js';

export default class EpitechScene extends Phaser.Scene {
    constructor() {
        super({ key: 'Epitech' });

        this.pname = ''
    }

    preload() {
        // Chargement des ressources
        this.load.spritesheet('Enzo', './assets/sprites/Enzo.png', { frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('Said', './assets/sprites/Said.png', { frameWidth: 32, frameHeight: 32 });
        this.load.image('dialog', './assets/tiles/dialogue.png');
        this.load.image('img', './assets/tiles/bat4.png');
        this.load.image('map', './assets/map/map.png');
        this.load.image('map2', './assets/map/map2.png');
        this.load.image('map3', './assets/map/map3.png');
        this.load.image('map4', './assets/map/map4.png');
        this.load.image('map5', './assets/map/map5.png');
        this.load.image('map6', './assets/map/map6.png');
    }

    create(data) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        this.map = this.add.tileSprite(screenWidth / 2, screenHeight / 2, 100000, screenHeight, data.mapKey);
        this.map.setOrigin(0.5);

        this.platforms = this.physics.add.staticGroup();
        this.platforms.create(1000, 640, "Enzo").setScale(4).refreshBody();
        this.platforms.create(1200, 640, "Said").setScale(4).refreshBody();
        this.platforms.create(1200, 530, "dialog").setScale(0.7).refreshBody();

        let player = data.player;
        this.player = new Player(this, 700, 720, player.key, player.name, player.pv, player.gender, player.age, player.node, player.react, player.java, player.leadership, player.shame);
        this.physics.world.enable(this.player);
        this.player.setScale(4);
        this.pname = player.name;

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

        this.displayConversation(`Hello ${this.pname}, as tu trouve une Alternance?`, 'Enzo', "Non", "Oui");
    }

    displayConversation(questionText, admin, non, oui) {
        this.dialogBox = this.add.rectangle(/* coordonnées de la boîte de dialogue */);
        this.text = this.add.text(1022, 530, questionText, { font: "18px Arial", fill: "#000000" });
        this.admin = this.add.text(1102, 495, admin, { font: "14px Arial", fill: "#ffffff" });
        this.btnOui = this.add.text(700, 520, oui, { font: "24px Arial", backgroundColor: '#000000', fill: "#ffffff" });
        this.btnNon = this.add.text(750, 520, non, { font: "24px Arial", backgroundColor: '#000000', fill: "#ffffff" });

        this.btnOui.setInteractive();
        this.btnNon.setInteractive();

        this.btnOui.on('pointerdown', () => {
            this.displayNextQuestion('oui');
        });

        this.btnNon.on('pointerdown', () => {
            this.displayNextQuestion('non');
        });
    }

    displayNextQuestion(question) {
        if (question === 'oui') {
            this.closeAllDialogBoxes();

            if (localStorage.getItem("alternance")=='true') {
                this.displayConversation(`Felicitation ${this.pname}, on va signer la convention`, 'Said', '', '')
            } else {
                this.displayConversation(`Menteur ${this.pname}, t'en as pas `, 'Said', '', '')
                
            }
        } else if (question === 'non') {
            this.closeAllDialogBoxes();
            this.displayConversation("Dommage, mais t'inquiet", 'Said', '', '')
        }
    }

    closeAllDialogBoxes() {
        this.dialogBox.destroy();
        this.text.destroy();
        this.btnOui.destroy();
        this.btnNon.destroy();
        this.admin.destroy();
    }
}
