﻿/// <reference path="../objects/plane.ts" />
/// <reference path="../objects/bullet.ts" />
/// <reference path="../objects/boss.ts" />
/// <reference path="../objects/bossscoreboard.ts" />


module managers {
    // Collision Manager Class
    export class bossCollision {

        // class variables
        private boss: objects.Boss;
        private plane: objects.Plane;
        private poos = [];
        private scoreboard: objects.BossScoreboard;

        constructor(plane: objects.Plane, boss: objects.Boss, poos, scoreboard: objects.BossScoreboard) {
            this.boss = boss;
            this.scoreboard = scoreboard;
            this.plane = plane;
            this.poos = poos;
        }

        // Utility method - Distance calculation between two points
        private distance(p1: createjs.Point, p2: createjs.Point): number {
            var result: number = 0;
            var xPoints: number = 0;
            var yPoints: number = 0;

            xPoints = p2.x - p1.x;
            xPoints = xPoints * xPoints;

            yPoints = p2.y - p1.y;
            yPoints = yPoints * yPoints;

            result = Math.sqrt(xPoints + yPoints);

            return result;
        }

        // check collision between plane and any cloud object
        private planeAndPoo(poo: objects.Poo) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();
            p1.x = this.plane.image.x;
            p1.y = this.plane.image.y;
            p2.x = poo.image.x;
            p2.y = poo.image.y;
            if (this.distance(p1, p2) < ((this.plane.height / 2) + (poo.height / 2))) {
                createjs.Sound.play("thunder");
                this.scoreboard.plane_hp -= 5;
                poo.reset();
            }
        }

        // check collision between bullet and cloud
        private planeAndBoss(boss: objects.Boss, plane: objects.Plane) {
            var p1: createjs.Point = new createjs.Point();
            var p2: createjs.Point = new createjs.Point();

            p1.x = plane.image.x;
            p1.y = plane.image.y;

            p2.x = boss.image.x;
            p2.y = boss.image.y;

            if (this.distance(p1, p2) < ((plane.height / 2) + (boss.height / 2))) {
                createjs.Sound.play("thunder");
                this.scoreboard.plane_hp -= 10;
            }
        }


        // Utility Function to Check Collisions
        update() {

            for (var count = constants.POO_NUM; count >= 0; count--) {
                this.planeAndPoo(this.poos[count]);
            }

            this.planeAndBoss(this.boss, this.plane);
        }
    }
} 