export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, name, pv, gender, age, node, react, java,leadership, shame) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBounce(0.2);
        this.setCollideWorldBounds(true);
        scene.physics.world.enable(this);
        this.body.setCollideWorldBounds(true);

        this.cursors = scene.input.keyboard.createCursorKeys();
        this.attackKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q)

        this.name = name;
        this.pv = pv;
        this.age = age;
        this.gender = gender;
        this.node = node;
        this.react = react;
        this.java = java;
        this.leadership = leadership;
        this.shame = shame;

        this.hardskills = {
            "Node": this.node,
            "React": this.react,
            "Java": this.java,
        };

        this.softskills = {
            "leadership":this.leadership,
            "shame":this.shame,
        }


        scene.anims.create({
            key: 'left',
            frames: scene.anims.generateFrameNumbers(texture, { start: 3, end: 5 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'right',
            frames: scene.anims.generateFrameNumbers(texture, { start: 6, end: 8 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'up',
            frames: scene.anims.generateFrameNumbers(texture, { start: 9, end: 12 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'down',
            frames: scene.anims.generateFrameNumbers(texture, { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });
        scene.anims.create({
            key: 'turn',
            frames: [{ key: texture, frame: 1 }],
            frameRate: 20
        });
    }


    update() {

        if (this.cursors.left.isDown) {
            this.setVelocityX(-300);
            this.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            this.setVelocityX(300);
            this.anims.play('right', true);
        } else {
            this.setVelocityX(0);
            
            
        }


        if (!this.cursors.left.isDown && !this.cursors.right.isDown && !this.cursors.up.isDown && !this.cursors.down.isDown) {
            
            this.anims.stop();
        }

        if (this.cursors.up.isDown) {
            this.setVelocityY(-300);
            this.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            this.setVelocityY(300);
            this.anims.play('down', true);
        } else {
            this.setVelocityY(0);
        }

        if (this.cursors.left.isDown && this.attackKey.isDown) {
            this.x -= 30
            this.anims.play("left", true);
        }
        if (this.cursors.right.isDown && this.attackKey.isDown) {
            this.x += 30
            this.anims.play("right", true);
        }

    }

}
