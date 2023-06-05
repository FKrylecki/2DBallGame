    var RectangleID = document.getElementById("RectangleID");
    var BallID = document.getElementById("BallID");
    var BoardID = document.getElementById("BoardID");
    var timer = document.getElementById("timer");

    var enemies = [];
    var DragValue;
    var Points = 0;
    var speed = 1;
    var timeLimit = 60;

    BallID.vh = speed;
    BallID.vw = speed;

            var endTime = Date.now() + timeLimit*1000;
            updateTime();
            var timerInterval = setInterval(updateTime, 100);
            
            function updateTime() {
                var timeLeft = endTime - Date.now();
                if(timeLeft <= 0) {
                    endGame();
                    timeLeft = 0;
                }
                timer.textContent = (timeLeft/1000).toFixed(1);
            }

            function ChangeCurrentPoints() {
                document.getElementById('PointsID').firstChild.data = Points;	
            }

            function CollisionForRectangle() {
                var RIDx = RectangleID.x.baseVal.value;
                var RIDy = RectangleID.y.baseVal.value;
                var RIDw = RectangleID.width.baseVal.value;

                var BIDcx = BallID.cx.baseVal.value;
                var BIDcy = BallID.cy.baseVal.value;
                var BIDcr = BallID.r.baseVal.value;

                if ((BIDcy + BIDcr > RIDy && BIDcy < RIDy) && (BIDcx > RIDx && BIDcx < RIDx + RIDw)) 
                {
                    BallID.vw = -speed;
                }
            }
   
            function CollisionForPoints() {
                for (var i = enemies.length - 1; i >= 0; i--) {
                    var enemy = enemies[i];
                    if (enemy == null) continue;

                        var Ex = enemy.cx.baseVal.value;
                        var Ey = enemy.cy.baseVal.value;
                        var Er = enemy.r.baseVal.value;

                        var Bx = BallID.cx.baseVal.value;
                        var By = BallID.cy.baseVal.value;
                        var Br = BallID.r.baseVal.value;

                        var Xchange = Ex-Bx;
                        var Ychange = Ey-By;
                        var dimension = Math.sqrt((Xchange*Xchange)+(Ychange*Ychange));

                        if (dimension <= (Er+Br)) { 
                                BallID.vw = -speed;
                                BoardID.removeChild(enemy);
                                enemies[i] = null;
                                BallID.vh = Xchange < 0 ? speed : -speed;
                                BallID.vw = Ychange < 0 ? speed : -speed;
                                Points++;
                                return;
                        }
                }
            }

            function ModesEasy() {
                speed = 1;
            }

            function ModesMedium() {
                speed = 2;
            }

            function ModesHard() {
                speed = 3;
            }
    
            function FillingTheBoard() {
                while (BoardID.hasChildNodes()) 
                {
                    BoardID.removeChild(BoardID.lastChild);
                }

                for (var i = 0; i < 19; i++) {
                    for (var j = 0; j < 4; j++) {
                        var enemy = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                        enemy.r.baseVal.value = 10;

                        enemy.style.fill = "#3124a8";

                        enemy.cx.baseVal.value = i*20+20;
                        enemy.cy.baseVal.value = j*25+15;
                
                        enemies.push(enemy);
                        BoardID.appendChild(enemy);
                     }
                }
            }

            function ChangeGameState() {
                BallID.cx.baseVal.value += BallID.vh;
                BallID.cy.baseVal.value += BallID.vw;

                Field();
                ChangeCurrentPoints();
                CollisionForRectangle();
                CollisionForPoints();
            }
    
            function Field() {
                var Br = BallID.r.baseVal.value;
                var Bx = BallID.cx.baseVal.value;
                var By = BallID.cy.baseVal.value;

                if (Bx - Br <= 0) 
                {
                    BallID.vh = speed;
                }
                
                if (Bx + Br >= 400) 
                {
                    BallID.vh = -speed;
                }

                if (By + Br >= 300) 
                {
                    endGame();
                } 
                else if (By - Br <= 0) 
                {
                BallID.vw = speed;
                }
            }
    
            function processKeys(e) {
                var RIDw = RectangleID.x.baseVal.value;

                switch (e.keyCode) {
                case 39 :
                    RIDw = RIDw + 5;
                    if (RIDw > 300) 
                    {
                        RIDw = 20;
                    }
                    RectangleID.x.baseVal.value = RIDw;
                break;

                case 37 :
                    RIDw = RIDw - 5;
                    if (RIDw < 10) 
                    {
                        RIDw = 290;
                    }
                    RectangleID.x.baseVal.value = RIDw;
                break;
                }
            }

            function endGame(){
                clearInterval(timerInterval);

                BallID.vw = 0;
                BallID.vh = 0;

                alert("Your Points are " + Points);

                location.reload(); 
            }

            window.addEventListener('keydown', processKeys, false);
            FillingTheBoard();
            setInterval('ChangeGameState()',15.0);
