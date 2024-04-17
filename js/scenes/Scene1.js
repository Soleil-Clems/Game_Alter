import Entreprise from '../Entreprise.js';
import Player from '../Player.js';
export default class Scene1 extends Phaser.Scene {
    constructor() {
        super({ key: 'Scene1' });
    }

    preload() {
        this.load.image('map1', './assets/map/map1.png');
        this.load.image('map', './assets/map/map.png');
        this.load.image('map2', './assets/map/map2.png');
        this.load.image('map3', './assets/map/map3.png');
        this.load.image('map4', './assets/map/map4.png');
        this.load.image('welcome', './assets/map/welcome.png');
        this.load.image('arc', './assets/tiles/Arc.png');
        this.load.image('logo', './assets/tiles/logo.png');
        this.load.image('mur', './assets/tiles/mur.png');
        Entreprise.preload(this);
    }

    create(datas) {
        this.scene.stop("MainScene");
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;
        this.map1 = this.add.tileSprite(screenWidth / 2, screenHeight / 2, 100000, screenHeight, 'map1');
        

        this.physics.world.setBounds(0, 0, 1500, screenHeight);
        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(710, 500, "arc")
        this.platforms.create(710, 320, "mur")

        let caracteristiquesEntreprise = {
            nom: "Ma Super Entreprise1",
            domaine: "Technologie",
            chiffreAffaires: 1000000,
            nombreEmployes: 50
        };
        let player = datas.Player

        this.player = new Player(this, 850, 220, player.key, player.name, player.pv, player.gender, player.age,player.node,player.react,player.java, player.leadership,player.shame);


        this.entreprise1 = new Entreprise(this, 70, 100, 'en1', caracteristiquesEntreprise,"R-bus", 1, "Apprentissage", ["Dev Java", "Dev React"]);
        this.entreprise1 = new Entreprise(this, 70, 100, 'en1', caracteristiquesEntreprise,"ErTM", 2, "Apprentissage", ["Dev Java", "Dev Laravel", "Dev Node"]);
        this.entreprise2 = new Entreprise(this, 200, 500, 'en2', caracteristiquesEntreprise,"Cap j'ai Mini", 3,"Alternance", ["Dev Node Express", "Dev React Redux"]);
        this.entreprise3 = new Entreprise(this, 1500, 100, 'en3', caracteristiquesEntreprise,"C'est Giti", 4, "CDD", ["Dev C# stack .Net", "Dev mobile Flutter"]);
        this.entreprise4 = new Entreprise(this, 1400, 600, 'en4', caracteristiquesEntreprise,"Bae NP ", 5, "CDI", ["Dev PHP Laravel", "Dev MERN, React"]);
        this.epitech = new Entreprise(this, 700, 110, 'epitech', caracteristiquesEntreprise,"Epitech", 6);
        
        this.platforms.create(710, 30, "logo")
        this.physics.world.enable([this.entreprise1, this.entreprise2, this.entreprise3, this.entreprise4, this.epitech]);

        

        this.cameras.main.startFollow(this.player);
        this.cameras.main.setBounds(0, 0, this.map1.width, this.map1.height);

        
        
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.player, this.entreprise1, () => this.handleCollision(this.player, this.entreprise1), null, this);
        this.physics.add.collider(this.player, this.entreprise2, () => this.handleCollision(this.player, this.entreprise2), null, this);
        this.physics.add.collider(this.player, this.entreprise3, () => this.handleCollision(this.player, this.entreprise3), null, this);
        this.physics.add.collider(this.player, this.entreprise4, () => this.handleCollision(this.player, this.entreprise4), null, this);
        this.physics.add.collider(this.player, this.epitech, () => this.handleCollision(this.player, this.epitech), null, this);

        const exitButton = this.add.text(35,20, 
            'Menu',
            {
                fontFamily: 'sans-serif',
                fontSize: 24,
                color: '#ffffff',
                backgroundColor: '#0066ff',
                padding: {
                    x: 5,
                    y: 5
                },
            }).setOrigin(0.5);
            exitButton.setScrollFactor(0);
        exitButton.setInteractive();
        exitButton.on('pointerdown', () => {

            window.location.reload();
        })
    }

    update() {
        this.player.update();
    }

    handleCollision(player, entreprise) {

        let players = {
            key: player.texture.key,
            name: player.name,
            gender: player.gender,
            age: player.age,
            pv: player.pv,
            softskills: player.softskills,
            hardskills: player.hardskills
        }

        let ent= {
            name: entreprise.name,
            contrat: entreprise.contrat,
            poste: entreprise.postes
        }

        switch (entreprise.position) {

            case 1:
                this.scene.start("Scene0", { mapKey: 'map', player: players, entreprise : ent });
                break;
            case 2:
                this.scene.start("Scene0", { mapKey: 'map2', player: players, entreprise : ent });
                break;
            case 3:
                this.scene.start("Scene0", { mapKey: 'map3', player: players, entreprise : ent });
                break;
            case 4:
                this.scene.start("Scene0", { mapKey: 'map4', player: players, entreprise : ent });
                break;
            case 5:
                this.scene.start("Scene0", { mapKey: 'map5', player: players, entreprise : ent });
                break;
            default:
                this.scene.start("Epitech", { mapKey: 'map2', player: players, entreprise : ent });
                break;
        }
        
    }


}
