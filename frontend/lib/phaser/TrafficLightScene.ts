import * as Phaser from "phaser";

export type TrafficLightSceneEvents = {
    onScore: (score: number) => void;
    onLightChange: (color: "red" | "yellow" | "green") => void;
    onMessage: (message: string) => void;
    onFinish: (score: number) => void;
};

type LightColor = "red" | "yellow" | "green";

const TOTAL_ROUNDS = 6;

// Đèn Xanh Qua Đường - real Phaser scene.
// Bé chờ đèn xanh rồi bấm "Qua đường". Đúng +10, sai (đèn đỏ) -5.
export class TrafficLightScene extends Phaser.Scene {
    private sceneEvents!: TrafficLightSceneEvents;
    private light: LightColor = "red";
    private score = 0;
    private rounds = 0;
    private locked = false;
    private character!: Phaser.GameObjects.Container;
    private redLamp!: Phaser.GameObjects.Arc;
    private yellowLamp!: Phaser.GameObjects.Arc;
    private greenLamp!: Phaser.GameObjects.Arc;
    private crossButton!: Phaser.GameObjects.Container;
    private lightTimer?: Phaser.Time.TimerEvent;
    private startX = 90;

    constructor() {
        super({ key: "TrafficLightScene" });
    }

    init(data: TrafficLightSceneEvents) {
        this.sceneEvents = data;
        this.score = 0;
        this.rounds = 0;
        this.locked = false;
        this.light = "red";
    }

    create() {
        const { width, height } = this.scale;

        // Sky
        this.add.rectangle(width / 2, height / 2, width, height, 0x87ceeb);
        // Grass
        this.add.rectangle(width / 2, height - 40, width, 80, 0x4caf50);
        // Road
        this.add.rectangle(width / 2, height - 130, width, 150, 0x4a5568);
        // Crosswalk stripes
        for (let i = 0; i < 6; i++) {
            this.add.rectangle(width / 2 - 150 + i * 60, height - 130, 34, 130, 0xffffff, 0.92);
        }

        // Traffic light pole
        this.add.rectangle(width - 90, height - 250, 12, 200, 0x2d3748);
        const box = this.add.rectangle(width - 90, height - 360, 56, 150, 0x1a202c);
        box.setStrokeStyle(3, 0x000000);

        this.redLamp = this.add.circle(width - 90, height - 410, 18, 0x991b1b);
        this.yellowLamp = this.add.circle(width - 90, height - 360, 18, 0x78350f);
        this.greenLamp = this.add.circle(width - 90, height - 310, 18, 0x14532d);

        // Character (Bé An) - simple container
        this.character = this.createCharacter(this.startX, height - 150);

        // Cross button
        this.crossButton = this.createButton(width / 2, 52, "Qua đường", () =>
            this.handleCross(),
        );

        this.add.text(24, 20, "Chờ đèn xanh rồi bấm Qua đường", {
            fontFamily: "Nunito, sans-serif",
            fontSize: "18px",
            color: "#1f2937",
            fontStyle: "bold",
        });

        this.setLight("red");
        this.scheduleNextLight();
    }

    private createCharacter(x: number, y: number) {
        const container = this.add.container(x, y);
        const body = this.add.circle(0, 0, 26, 0xf59e0b);
        body.setStrokeStyle(3, 0xffffff);
        const face = this.add.circle(0, -4, 16, 0xfde68a);
        const eyeL = this.add.circle(-6, -6, 3, 0x1f2937);
        const eyeR = this.add.circle(6, -6, 3, 0x1f2937);
        const smile = this.add.arc(0, 0, 8, 0, 180, false, 0x1f2937);
        smile.setStrokeStyle(2, 0x1f2937);
        container.add([body, face, eyeL, eyeR, smile]);
        return container;
    }

    private createButton(
        x: number,
        y: number,
        label: string,
        onClick: () => void,
    ) {
        const container = this.add.container(x, y);
        const bg = this.add.rectangle(0, 0, 200, 60, 0x16a34a, 1);
        bg.setStrokeStyle(3, 0xffffff);
        bg.setInteractive({ useHandCursor: true });
        const text = this.add
            .text(0, 0, label, {
                fontFamily: "Baloo 2, Nunito, sans-serif",
                fontSize: "22px",
                color: "#ffffff",
                fontStyle: "bold",
            })
            .setOrigin(0.5);
        container.add([bg, text]);
        bg.on("pointerdown", onClick);
        bg.on("pointerover", () => bg.setFillStyle(0x15803d));
        bg.on("pointerout", () => bg.setFillStyle(0x16a34a));
        return container;
    }

    private setLight(color: LightColor) {
        this.light = color;
        this.redLamp.setFillStyle(color === "red" ? 0xef4444 : 0x991b1b);
        this.yellowLamp.setFillStyle(color === "yellow" ? 0xfacc15 : 0x78350f);
        this.greenLamp.setFillStyle(color === "green" ? 0x22c55e : 0x14532d);
        this.sceneEvents.onLightChange(color);
    }

    private scheduleNextLight() {
        // Random duration 3-7s as per spec
        const duration = Phaser.Math.Between(3000, 7000);
        this.lightTimer = this.time.delayedCall(duration, () => {
            const next: LightColor =
                this.light === "red"
                    ? "green"
                    : this.light === "green"
                        ? "yellow"
                        : "red";
            this.setLight(next);
            if (this.rounds < TOTAL_ROUNDS) this.scheduleNextLight();
        });
    }

    private handleCross() {
        if (this.locked) return;

        if (this.light === "green") {
            this.locked = true;
            this.score += 10;
            this.sceneEvents.onScore(this.score);
            this.sceneEvents.onMessage("Giỏi lắm! Bé qua đường khi đèn xanh.");
            this.walkAcross(true);
        } else {
            // gentle penalty
            this.score = Math.max(0, this.score - 5);
            this.sceneEvents.onScore(this.score);
            this.sceneEvents.onMessage("Mình chờ đèn xanh rồi hãy qua nhé.");
            this.tweens.add({
                targets: this.character,
                x: this.character.x + 12,
                duration: 90,
                yoyo: true,
                repeat: 2,
            });
        }
    }

    private walkAcross(success: boolean) {
        const { width, height } = this.scale;
        this.tweens.add({
            targets: this.character,
            x: width - 150,
            duration: 1400,
            ease: "Sine.easeInOut",
            onComplete: () => {
                this.rounds += 1;
                if (this.rounds >= TOTAL_ROUNDS) {
                    this.finish();
                    return;
                }
                // reset character to start for next round
                this.character.setPosition(this.startX, height - 150);
                this.locked = false;
                this.setLight("red");
            },
        });
        void success;
    }

    private finish() {
        this.lightTimer?.remove();
        this.sceneEvents.onMessage("Hoàn thành! Bé là người qua đường an toàn.");
        this.sceneEvents.onFinish(this.score);
    }
}
