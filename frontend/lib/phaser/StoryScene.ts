import Phaser from "phaser";
import type { CharacterAction, SceneBg } from "@/lib/traffic-content";

export type StorySceneInit = {
    sceneBg: SceneBg;
    accent: string;
    onReady: () => void;
};

// Generic interactive story scene used by all 5 mini games.
// Renders a contextual background + a friendly character (Bé An) that
// performs actions (walk, look, stop, celebrate...) driven from React.
export class StoryScene extends Phaser.Scene {
    private cfg!: StorySceneInit;
    private character!: Phaser.GameObjects.Container;
    private speechBubble!: Phaser.GameObjects.Container;
    private speechText!: Phaser.GameObjects.Text;
    private trafficLight?: {
        red: Phaser.GameObjects.Arc;
        yellow: Phaser.GameObjects.Arc;
        green: Phaser.GameObjects.Arc;
    };
    private baseX = 150;
    private baseY = 300;
    private vehicles: Phaser.GameObjects.Container[] = [];

    constructor() {
        super({ key: "StoryScene" });
    }

    init(data: StorySceneInit) {
        this.cfg = data;
        this.vehicles = [];
    }

    create() {
        const { width, height } = this.scale;
        this.baseY = height - 150;

        this.drawBackground(width, height);
        this.character = this.createCharacter(this.baseX, this.baseY);
        this.speechBubble = this.createSpeechBubble(width);
        this.hideSpeech();

        this.idleBob();
        this.cfg.onReady();
    }

    // ---------- Backgrounds ----------
    private drawBackground(width: number, height: number) {
        // Sky gradient base
        this.add.rectangle(width / 2, height / 2, width, height, 0xbfe3f5);
        // Sun
        this.add.circle(width - 70, 70, 34, 0xffe27a).setAlpha(0.9);

        switch (this.cfg.sceneBg) {
            case "intersection":
                this.drawIntersection(width, height);
                break;
            case "sidewalk":
                this.drawSidewalk(width, height);
                break;
            case "school-zone":
                this.drawSchoolZone(width, height);
                break;
            case "road-with-signs":
                this.drawRoadWithSigns(width, height);
                break;
            case "neighborhood":
                this.drawNeighborhood(width, height);
                break;
        }
    }

    private drawGround(width: number, height: number) {
        this.add.rectangle(width / 2, height - 40, width, 80, 0x7ec850); // grass
        this.add.rectangle(width / 2, height - 110, width, 130, 0x6b7280); // road
    }

    private drawCrosswalk(width: number, height: number) {
        for (let i = 0; i < 6; i++) {
            this.add.rectangle(width / 2 - 140 + i * 56, height - 110, 30, 110, 0xffffff, 0.95);
        }
    }

    private drawIntersection(width: number, height: number) {
        this.drawGround(width, height);
        this.drawCrosswalk(width, height);
        // traffic light pole
        this.add.rectangle(width - 110, height - 250, 10, 200, 0x374151);
        this.add.rectangle(width - 110, height - 360, 50, 140, 0x1f2937).setStrokeStyle(3, 0x000000);
        const red = this.add.circle(width - 110, height - 405, 16, 0x7f1d1d);
        const yellow = this.add.circle(width - 110, height - 360, 16, 0x78350f);
        const green = this.add.circle(width - 110, height - 315, 16, 0x14532d);
        this.trafficLight = { red, yellow, green };
        this.setLight("red");
    }

    private drawSidewalk(width: number, height: number) {
        this.drawGround(width, height);
        this.drawCrosswalk(width, height);
        // curb
        this.add.rectangle(width / 2, height - 175, width, 12, 0xe5e7eb);
    }

    private drawSchoolZone(width: number, height: number) {
        this.drawGround(width, height);
        this.drawCrosswalk(width, height);
        // school building
        this.add.rectangle(width - 120, height - 250, 150, 130, 0xfcd34d).setStrokeStyle(3, 0xb45309);
        this.add.triangle(width - 120, height - 320, 0, 40, 75, 0, 150, 40, 0xb45309);
        this.add.text(width - 175, height - 250, "TRƯỜNG", {
            fontFamily: "Baloo 2, sans-serif",
            fontSize: "18px",
            color: "#7c2d12",
            fontStyle: "bold",
        });
    }

    private drawRoadWithSigns(width: number, height: number) {
        this.drawGround(width, height);
        // sign pole with circle sign
        this.add.rectangle(width - 130, height - 230, 8, 150, 0x374151);
        this.add.circle(width - 130, height - 320, 34, 0xffffff).setStrokeStyle(6, 0xdc2626);
        this.add.rectangle(width - 130, height - 320, 44, 8, 0xdc2626);
    }

    private drawNeighborhood(width: number, height: number) {
        this.drawGround(width, height);
        // houses
        this.add.rectangle(110, height - 220, 120, 110, 0xfca5a5).setStrokeStyle(3, 0x991b1b);
        this.add.triangle(110, height - 290, 0, 40, 60, 0, 120, 40, 0x991b1b);
        // parked motorbike hint
        this.add.rectangle(width - 150, height - 130, 90, 36, 0x60a5fa).setStrokeStyle(3, 0x1e3a8a);
    }

    private setLight(color: "red" | "yellow" | "green") {
        if (!this.trafficLight) return;
        this.trafficLight.red.setFillStyle(color === "red" ? 0xef4444 : 0x7f1d1d);
        this.trafficLight.yellow.setFillStyle(color === "yellow" ? 0xfacc15 : 0x78350f);
        this.trafficLight.green.setFillStyle(color === "green" ? 0x22c55e : 0x14532d);
    }

    // ---------- Character ----------
    private createCharacter(x: number, y: number) {
        const c = this.add.container(x, y);
        const shadow = this.add.ellipse(0, 46, 60, 16, 0x000000, 0.15);
        const body = this.add.ellipse(0, 10, 46, 56, parseInt(this.cfg.accent.replace("#", "0x")));
        body.setStrokeStyle(3, 0xffffff);
        const head = this.add.circle(0, -34, 26, 0xfde68a).setStrokeStyle(3, 0xffffff);
        const eyeL = this.add.circle(-8, -36, 4, 0x1f2937);
        const eyeR = this.add.circle(8, -36, 4, 0x1f2937);
        const smile = this.add.arc(0, -28, 9, 0, 180, false);
        smile.setStrokeStyle(3, 0x1f2937);
        const armL = this.add.ellipse(-26, 8, 12, 30, 0xfde68a).setStrokeStyle(2, 0xffffff);
        const armR = this.add.ellipse(26, 8, 12, 30, 0xfde68a).setStrokeStyle(2, 0xffffff);
        c.add([shadow, armL, armR, body, head, eyeL, eyeR, smile]);
        c.setData("armL", armL);
        c.setData("armR", armR);
        c.setData("head", head);
        return c;
    }

    private idleBob() {
        this.tweens.add({
            targets: this.character,
            y: this.baseY - 6,
            duration: 900,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut",
        });
    }

    // ---------- Speech bubble ----------
    private createSpeechBubble(width: number) {
        const c = this.add.container(width / 2, 60);
        const bg = this.add.graphics();
        bg.fillStyle(0xffffff, 1);
        bg.lineStyle(3, 0x0f172a, 1);
        bg.fillRoundedRect(-260, -34, 520, 68, 18);
        bg.strokeRoundedRect(-260, -34, 520, 68, 18);
        const text = this.add
            .text(0, 0, "", {
                fontFamily: "Nunito, sans-serif",
                fontSize: "18px",
                color: "#0f172a",
                fontStyle: "bold",
                align: "center",
                wordWrap: { width: 490 },
            })
            .setOrigin(0.5);
        this.speechText = text;
        c.add([bg, text]);
        c.setDepth(50);
        return c;
    }

    say(message: string) {
        this.speechText.setText(message);
        this.speechBubble.setVisible(true);
        this.speechBubble.setScale(0.9);
        this.tweens.add({
            targets: this.speechBubble,
            scale: 1,
            duration: 220,
            ease: "Back.easeOut",
        });
    }

    private hideSpeech() {
        this.speechBubble.setVisible(false);
    }

    // ---------- Actions (called from React) ----------
    playAction(action: CharacterAction) {
        const armL = this.character.getData("armL") as Phaser.GameObjects.Ellipse;
        const armR = this.character.getData("armR") as Phaser.GameObjects.Ellipse;

        switch (action) {
            case "stop":
                this.setLight("red");
                this.tweens.add({ targets: armR, angle: -120, duration: 250, yoyo: false });
                this.bounce();
                break;
            case "cross-road": {
                this.setLight("green");
                const { width } = this.scale;
                this.tweens.add({
                    targets: this.character,
                    x: width - 180,
                    duration: 1600,
                    ease: "Sine.easeInOut",
                    onComplete: () => this.celebrate(),
                });
                this.walkWobble();
                break;
            }
            case "walking": {
                const { width } = this.scale;
                this.tweens.add({
                    targets: this.character,
                    x: Math.min(this.character.x + 160, width - 180),
                    duration: 1200,
                    ease: "Sine.easeInOut",
                });
                this.walkWobble();
                break;
            }
            case "look-left":
                this.tweens.add({ targets: this.character, x: this.character.x - 18, duration: 220, yoyo: true, repeat: 1 });
                break;
            case "look-right":
                this.tweens.add({ targets: this.character, x: this.character.x + 18, duration: 220, yoyo: true, repeat: 1 });
                break;
            case "look-both":
                this.tweens.add({ targets: this.character, x: this.character.x - 16, duration: 180, yoyo: true, repeat: 3 });
                break;
            case "put-helmet":
                this.addHelmet();
                this.bounce();
                break;
            case "celebrate":
                this.celebrate();
                break;
            case "wave":
                this.tweens.add({ targets: armR, angle: -150, duration: 200, yoyo: true, repeat: 2 });
                break;
            case "point":
                this.tweens.add({ targets: armR, angle: -80, duration: 250 });
                break;
            case "read-sign":
            case "thinking":
                this.tweens.add({ targets: this.character, angle: -4, duration: 300, yoyo: true, repeat: 1 });
                break;
            default:
                this.bounce();
        }
        void armL;
    }

    private addHelmet() {
        const head = this.character.getData("head") as Phaser.GameObjects.Arc;
        const helmet = this.add.arc(0, -46, 30, 180, 360, false, 0xef4444);
        helmet.setStrokeStyle(3, 0xffffff);
        this.character.add(helmet);
        void head;
    }

    private bounce() {
        this.tweens.add({
            targets: this.character,
            scaleY: 0.9,
            scaleX: 1.1,
            duration: 150,
            yoyo: true,
            ease: "Quad.easeOut",
        });
    }

    private walkWobble() {
        this.tweens.add({
            targets: this.character,
            angle: 5,
            duration: 200,
            yoyo: true,
            repeat: 6,
            ease: "Sine.easeInOut",
            onComplete: () => this.character.setAngle(0),
        });
    }

    private celebrate() {
        const armL = this.character.getData("armL") as Phaser.GameObjects.Ellipse;
        const armR = this.character.getData("armR") as Phaser.GameObjects.Ellipse;
        this.tweens.add({ targets: [armL, armR], angle: -140, duration: 250, yoyo: true, repeat: 3 });
        this.tweens.add({
            targets: this.character,
            y: this.baseY - 40,
            duration: 280,
            yoyo: true,
            repeat: 2,
            ease: "Quad.easeOut",
        });
        // confetti
        for (let i = 0; i < 14; i++) {
            const colors = [0xef4444, 0x22c55e, 0xfacc15, 0x3b82f6, 0xa855f7];
            const conf = this.add.rectangle(
                this.character.x,
                this.baseY - 40,
                8,
                8,
                colors[i % colors.length],
            );
            this.tweens.add({
                targets: conf,
                x: this.character.x + Phaser.Math.Between(-120, 120),
                y: this.baseY - 40 - Phaser.Math.Between(40, 160),
                angle: Phaser.Math.Between(0, 360),
                alpha: 0,
                duration: 900,
                ease: "Quad.easeOut",
                onComplete: () => conf.destroy(),
            });
        }
    }

    resetCharacter() {
        this.character.setPosition(this.baseX, this.baseY);
        this.character.setAngle(0);
    }
}
