/**
let mainBox= document.querySelector(".main");

function resizeCanvas(){
    const ratioWidth = 3; 
    const ratioHeight = 4;
    const longestSideScreenRatio = 1;
    const canvasAspectRatio = ratioWidth / ratioHeight;
    const windowAspectRatio = window.innerWidth / window.innerHeight;
    let canvasWidth = 0; 
    let canvasHeight = 0;

    if(windowAspectRatio > canvasAspectRatio){
      canvasHeight = ( (window.innerHeight * longestSideScreenRatio) > 768)? 761: window.innerHeight * longestSideScreenRatio;
      canvasWidth = (canvasHeight / ratioHeight) * ratioWidth;
    } else {
      canvasWidth = ( (window.innerWidth * longestSideScreenRatio) > 576)? 576: window.innerWidth * longestSideScreenRatio;
      canvasHeight = (canvasWidth / ratioWidth) * ratioHeight;
    }
    //console.log(window.innerWidth)

    //set canvas DOM height & width
    mainBox.style.width = `${canvasWidth}px`;
    mainBox.style.height = `${canvasHeight}px`;
}

window.addEventListener("resize", resizeCanvas)
**/
window.addEventListener("load", function(){
     var gameRound = 1;
     
     const round = document.getElementById("round");

     const charactersBox = document.getElementById("charactersBox");
     const Xhtml = document.getElementById("x");
     const Ohtml = document.getElementById("o");
     const startButton = document.getElementById("start");
     const characterError = document.getElementById("characterError");
     const gameStatus = document.getElementById("gameStatus");
     var winnerDeclared = false;
     
     const statusMessages = [
         "Draw!!",
         "Bot wins",
         "You win",
         "Your turn",
         "Bot's turn'",
         "You're first play"
     ];
     
     function updateGameStatus(statusIndex){
         gameStatus.innerHTML = statusMessages[statusIndex];
     }

     class Player{
              constructor(character,score, characterHTML, scoreHTML, tiles, axis, prospectTiles, targetAxis, targetTiles){
                 this.character = character;
                 this.score = score;
                 this.characterHTML = characterHTML;
                 this.scoreHTML = scoreHTML;
                 this.tiles = tiles;
                 this.axis = axis;
                 this.prospectTiles= prospectTiles;
                this.targetAxis = targetAxis;
                this.targetTiles= targetTiles;            
             }
             updateScore(){
             this.score += 1;
             this.scoreHTML.innerHTML = this.score;
             }
          }
          
class Character {
              constructor(letter, color){
                  this.letter = letter
                  this.color = color
              }
          }
          
          var X = new Character("X", "#DD3C3C");
          var O = new Character("O", "#3CDD8C")
          var none = new Character("s", "#4169E1");
     
          var person = new Player(none, 0, document.getElementById("personCharacter"), document.getElementById("personScore"), [], [], [], [], []);
          var bot = new Player(none, 0,
document.getElementById("botCharacter"), document.getElementById("botScore"), [], [], [], [], []);

const players = [person, bot];
const characters = [X,O];

     
     function setCharacter(player, character){
        opponentIndex = Math.abs(players.indexOf(player)-1);
        opponent = players[opponentIndex]; 
        opponentCharacterIndex = Math.abs(characters.indexOf(character)-1);
        opponentCharacter = characters[opponentCharacterIndex];
        
        
        player.character = character;
        opponent.character = opponentCharacter;
        
        player.characterHTML.innerHTML = character.letter;       player.characterHTML.style.background = character.color;
              opponent.characterHTML.innerHTML = opponentCharacter.letter;     opponent.characterHTML.style.background = opponentCharacter.color;
              
}
    
    Xhtml.addEventListener("click", function(){
        characterError.innerHTML = "";
        setCharacter(person, X)
        Xhtml.style.border=` solid 2px ${Xhtml.style.color}`
        Ohtml.style.border="none"
    });
    Ohtml.addEventListener("click", function(){
        characterError.innerHTML = "";
        setCharacter(person, O)
        Ohtml.style.border=` solid 2px ${Ohtml.style.color}`
        Xhtml.style.border="none"
    });
    
    
     
     var newTile;
     
     var opponentIndex;
     var opponent;   
     var opponentCharacterIndex;
     var opponentCharacter;
     
     var playTimeout;
     var restartTimeout;
     var timeout;
     
     var randomIndex;
     
     var gameOn = true;
     var controlsActive = true;
     var startNextRound = false;
    
       
     const tile1 = document.getElementById("tile1");
     const tile2 = document.getElementById("tile2");
     const tile3 = document.getElementById("tile3");
     const tile4 = document.getElementById("tile4");
     const tile5 = document.getElementById("tile5");
     const tile6 = document.getElementById("tile6");
     const tile7 = document.getElementById("tile7");
     const tile8 = document.getElementById("tile8");
     const tile9 = document.getElementById("tile9");
     
     
     const row1 = [tile1,tile2,tile3];
     const row2 = [tile4,tile5,tile6];
     const row3 = [tile7,tile8,tile9];
     const col1 = [tile1,tile4,tile7];
     const col2 = [tile2,tile5,tile8];
     const col3 = [tile3,tile6,tile9];
     const cross1 = [tile1,tile5,tile9];
     const cross2 = [tile3,tile5,tile7];
     
     const gameTiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
     
     const gameAxis =[row1, row2, row3, col1, col2, col3, cross1, cross2];
     
     var freeTiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
     
     
     function updateRound(){
         gameRound+=1;
         round.innerHTML = gameRound;
     }
     
     function resetParameters(){                
         person.tiles = [];
         person.axis = [];
         person.prospectTiles = [];
         person.targetAxis = [];
         person.targetTiles = [];
                         
         bot.tiles = [];
         bot.axis = [];
         bot.prospectTiles = [];
         bot.targetAxis = [];
         bot.targetTiles = [];
     }
     
     function toggleNextTurn(){
         startNextRound = !startNextRound;
         console.log("newTurn");
     }
     
     function initialize(){ 
         toggleNextTurn();
         freeTiles = [tile1, tile2, tile3, tile4, tile5, tile6, tile7, tile8, tile9];
         gameStatus.innerHTML = ""
         winnerDeclared = false;
         for(element of gameTiles){
                 element.innerHTML = "";
                 element.style.background = "#313135"
         }
         resetParameters();
     }
     
     function reStart(){
         controlsActive = false;
         restartTimeout = setTimeout(function(){
                 initialize();                        
                 start();
             }, 2000);
     }
     
     function checkEnd(){
         if(freeTiles.length == 0){
             updateRound();   
             if(winnerDeclared == false){
                 //Draw
                 updateGameStatus(0);
             }
             reStart();                  
         }
    }
     //check
     
      function removeTile(tile){
         var removeIndex = freeTiles.indexOf(tile);
         freeTiles.splice(removeIndex, 1);
     }
     
     function selectTile(array){
         randomIndex = Math.floor(Math.random()*(array.length-0))+0;
         newTile = array[randomIndex]
         bot.tiles.push(newTile);
         newTile.innerHTML = bot.character.letter;
         newTile.style.color = bot.character.color;
         removeTile(newTile);  
         
     }
     
     function assess(){
        if(bot.targetTiles.length > 0){
        selectTile(bot.targetTiles);
        }else if(person.targetTiles.length > 0){
        selectTile(person.targetTiles);       
        }else if(bot.prospectTiles.length > 0){
        selectTile(bot.prospectTiles);       
        }else if(freeTiles.length > 0){
        selectTile(freeTiles);       
        }
    }

    function updateAxis(player,tile){
        player.axis = []
        for(axis of gameAxis){
           if(axis.includes(tile) && (!player.axis.includes(axis)) ){
               player.axis.push(axis)
           }
        }
    };
    
    function updateProspectTiles(player){       
        player.prospectTiles = [];
        for(tile of player.tiles){
            for(axis of gameAxis){
                if(axis.includes(tile) && (!opponent.axis.includes(axis)) && tile!=tile5){
                
                    for(element of axis){
                        if( (!player.prospectTiles.includes(element)) && element != tile && freeTiles.includes(element) && (!opponent.tiles.includes(element)) ){
                            player.prospectTiles.push(element);
                        }
                    }
                }
            }
        }
    }
    
    function updateTargetTiles(player){
        player.targetTiles = [];
        for(axis of player.targetAxis){
            for(tile of axis){
                if( freeTiles.includes(tile) && (!player.tiles.includes(tile)) && (!opponent.tiles.includes(tile)) ){
                    player.targetTiles.push(tile);
                }
            }
        }
    }
    
    function checkTargets(player){
        player.targetAxis = []
        for(axis of gameAxis){
            qtyOfTakenTiles = 0;
            for(element of player.tiles){
                if(axis.includes(element) && (! opponent.axis.includes(axis)) ){
                    qtyOfTakenTiles++
                }
            }
            if(qtyOfTakenTiles == 2 && (!player.targetAxis.includes(axis)) && (!opponent.tiles.includes(element)) ){
                player.targetAxis.push(axis);                
            }else if(qtyOfTakenTiles == 3){
                winnerDeclared = true;
                for(element of axis) {
                    element.style.backgroundColor = player.character.color
                    element.style.color = "#FFFFFF";                    
                }
                if(player == bot){
                    updateGameStatus(1);
                }else{
                    updateGameStatus(2);
                }
                player.updateScore();
                updateRound();
                gameOn = false;               
                reStart();
            }           
            
        }
    }
    
    function updateParameters(player){
        opponentIndex = Math.abs(players.indexOf(player)-1);
        opponent = players[opponentIndex];        
        updateProspectTiles(player);
        checkTargets(player);
        updateTargetTiles(player);
    }
        
    
    function start(){
        gameOn = true;
        if(startNextRound){
            updateGameStatus(4);
            randomIndex = Math.round(Math.random());
            setCharacter(bot, characters[randomIndex]);
            botPlay();
            controlsActive = true;           
        }else{
            updateGameStatus(3);
            charactersBox.style.visibility = "visible";
            controlsActive = true;            
        }
    }
    
    function personPlay(tile){
        if(controlsActive == true && freeTiles.includes(tile)){           
            tile.innerHTML = person.character.letter;
            tile.style.color = person.character.color;
            person.tiles.push(tile)
            removeTile(tile);
            updateParameters(person);          
            updateParameters(bot);
            if(winnerDeclared == false){
                updateGameStatus(4)
            }
            checkEnd();
            botPlay();                
            
        }
    }
    
    function botPlay(){
        controlsActive = false;
        if(freeTiles.length>0 && gameOn == true){
            playTimeout = setTimeout(function(){
                assess();
                updateParameters(bot);
                controlsActive = true;
                if(winnerDeclared == false){
                    updateGameStatus(3)
                }
                checkEnd();               
            }, 1000);
                     
        }
    }
    
    startButton.addEventListener("click", function(){
        if(person.character != none){
            charactersBox.style.visibility = "hidden";
        }else{
            characterError.style.display = "block";
            timeout = setTimeout(function(){
                characterError.style.display = "none";
            }, 1500)
            
        }
    })
    
    tile1.addEventListener("click", function(){
        personPlay(tile1);
    });
    
    tile2.addEventListener("click", function(){
        personPlay(tile2);
    });
    
    tile3.addEventListener("click", function(){
        personPlay(tile3);
    });
    
    tile4.addEventListener("click", function(){
        personPlay(tile4);
    });
    
    tile5.addEventListener("click", function(){
        personPlay(tile5);
    });
    
    tile6.addEventListener("click", function(){
        personPlay(tile6);
    });
    
    tile7.addEventListener("click", function(){
        personPlay(tile7);
    });
    
    tile8.addEventListener("click", function(){
        personPlay(tile8);
    });
    
    tile9.addEventListener("click", function(){
        personPlay(tile9);
    });
               
})          

