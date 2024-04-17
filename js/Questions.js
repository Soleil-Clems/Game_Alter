export default class Questions extends Phaser.GameObjects.Container {
    constructor(scene, x, y, texture, frame, allQuestions, score = 0, playerHp, entHp) {
        super(scene, x, y);
        scene.add.existing(this);

        this.questions = allQuestions;
        this.currentQuestionIndex = 0;
        this.currentQuestion = this.questions.questions[this.currentQuestionIndex];
        this.score = score;
        this.playerHp = this.questions.questions.length
        this.entHp = this.questions.questions.length


        this.entscoreText = this.scene.add.text(1200, 10, `Entreprise HP: ${this.entHp}`, {
            fontFamily: 'sans-serif',
            fontSize: 18,
            color: '#000000'
        });
        this.playerscoreText = this.scene.add.text(10, 10, `Player HP: ${this.playerHp}`, {
            fontFamily: 'sans-serif',
            fontSize: 18,
            color: '#000000'
        });

        this.displayQuestion();

        this.setInteractive();
        this.handleClick = this.handleAnswerClick.bind(this);
        this.on('pointerdown', this.handleClick);
    }

    displayQuestion() {
        this.removeAll(true);

        const screenWidth = window.innerWidth;
        const questionText = this.scene.add.text(screenWidth / 2 - 200, 50, this.currentQuestion.question, {
            fontFamily: 'sans-serif',
            fontSize: 28,
            color: '#ffffff',
            backgroundColor: '#0066ff',
            padding: {
                x: 20,
                y: 10
            },
        });
        this.add(questionText);
        questionText.setOrigin(0.5);

        const answers = this.currentQuestion.reponses;
        const columns = 2;
        const lineHeight = 100;
        let yPosition = 150;

        let column = 0;
        for (const [key, value] of Object.entries(answers)) {
            const answerText = this.scene.add.text(screenWidth / 2 - 200, yPosition, key + ": " + value,
                {
                    fill: '#ffffff',
                    backgroundColor: '#0066ff',
                    padding: {
                        x: 20,
                        y: 10
                    },
                });
            this.add(answerText);
            answerText.setInteractive();
            answerText.setOrigin(0.5)
            answerText.on('pointerdown', () => this.handleAnswerClick(key));
            yPosition += lineHeight;
        }
    }

    handleAnswerClick(clickedKey) {
        const correctAnswerKey = this.currentQuestion.correcte;
        let good;
        if (clickedKey === correctAnswerKey) {
            console.log('Bonne réponse !');
            good = true;
        } else {
            console.log('Mauvaise réponse ! ' + clickedKey);
            good = false;
        }

        if (good) {
            this.score++;
            this.entHp--;
        } else {
            if (this.score > 0) {
                this.score--;
            }
            this.playerHp--;
        }

        this.entscoreText.setText(`Entreprise HP: ${this.entHp}`);
        this.playerscoreText.setText(`Player HP: ${this.playerHp}`);

        this.currentQuestionIndex++;
        if (this.currentQuestionIndex < this.questions.questions.length) {
            this.currentQuestion = this.questions.questions[this.currentQuestionIndex];
            this.displayQuestion();
        } else {
            this.displayEndGameScore();
        }
    }

    displayEndGameScore() {
        this.removeAll(true);

        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        const scoreText = this.scene.add.text(screenWidth / 2, screenHeight / 2, 
        (this.entHp < this.playerHp) ? "Félicitations, vous avez décroché une alternance !" : "Désolé, vous avez perdu.", 
            {
                fontFamily: 'sans-serif',
                fontSize: 28,
                color: '#ffffff',
                backgroundColor: '#0066ff',
                padding: {
                    x: 20,
                    y: 10
                },
            }).setOrigin(0.5);
        this.add(scoreText);

        if(this.entHp < this.playerHp){
            localStorage.setItem("alternance", true);
        }
    }
}
