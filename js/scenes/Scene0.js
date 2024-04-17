import Player from '../Player.js';
import Entreprise from '../Entreprise.js';

export default class Scene0 extends Phaser.Scene {
    constructor() {
        super('Scene0');
    }

    preload() {

        this.load.image('img', './assets/tiles/bat4.png');
        this.load.image('card', './assets/tiles/wanted.png');
        this.load.image('map1', './assets/map/map1.png');
        this.load.image('map2', './assets/map/map2.png');
        this.load.image('map3', './assets/map/map3.png');
        this.load.image('map4', './assets/map/map4.png');
        this.load.image('map5', './assets/map/map5.png');
        this.load.image('map6', './assets/map/map6.png');



    }

    create(data) {
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        this.map = this.add.tileSprite(screenWidth / 2, screenHeight / 2, 1500, screenHeight, data.mapKey);
        this.map.setOrigin(0.5);
        let player = data.player
        let entreprise = data.entreprise
        this.platforms = this.physics.add.staticGroup();
        let xOffset = 500;
        let yOffset = 200;
        const cardSpacingX = 20;

        entreprise.poste.forEach((poste, index) => {
            let card = this.add.text(xOffset-10, yOffset-30,
                `Entreprise: ${entreprise.name}\nPoste: ${poste}\nContrat: ${entreprise.contrat}`,
                {
                    fontFamily: 'Arial',
                    fontSize: 15,
                    color: '#ffffff',
                    backgroundColor: '#000000',
                    padding: {
                        x: 10,
                        y: 70
                    }
                });

            card.setInteractive();
            card.on('pointerdown', () => {
                this.scene.start('Scene2', {
                    entrepriseNom: entreprise.nom,
                    postes:poste,
                    contrat: entreprise.contrat,
                    player: player,
                    mapKey: data.mapKey
                });
            });

            this.platforms.create(xOffset + 80, yOffset + 70, "card").setScale(.8).refreshBody();
            xOffset += card.width + cardSpacingX;
            this.add.existing(card);
        });




    }

}
