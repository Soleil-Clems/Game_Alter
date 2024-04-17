export default class Entreprise extends Phaser.GameObjects.Image {
    constructor(scene, x, y, texture, caracteristiques,nom, position, contrat, postes) {
        super(scene, x, y, texture);

        this.caracteristiques = caracteristiques;
        this.name=nom
        this.position=position
        this.contrat = contrat
        this.postes = postes
        this.setTexture(texture); 
        scene.add.existing(this);
        this.setInteractive();
    }


    static preload(scene) {
        
        scene.load.image('en1', './assets/tiles/en1.png');
        scene.load.image('en2', './assets/tiles/en2.png');
        scene.load.image('en3', './assets/tiles/en3.png');
        scene.load.image('en4', './assets/tiles/en4.png');
        scene.load.image('epitech', './assets/tiles/epitec.png');
    }


    static map(scene){
        if (this.position ==1) {
            return scene.load.image('map', './assets/map/map2.png');
        }else if (this.position ==2) {
            return scene.load.image('map', './assets/map/map3.png');
        }else if (this.position ==3) {
            return scene.load.image('map', './assets/map/map4.png');
        }else if (this.position ==4) {
            return scene.load.image('map', './assets/map/map5.png');
        }else{
            return scene.load.image('map', './assets/map/map1.png');

        }
    }

    
    
}
