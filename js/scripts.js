var Game = function() {
  const LEFT = 0,
  MIDDLE = 1,
  RIGHT = 2,
  DEMO = 0,
  JASON = 1,
  MOM = 2;

  var speed = 6,
  fps = 60,
  snow = null,
  container = null,
  rand = 100,
  trees = [],
  presents = [],
  viewHeight = 0,
  treeIndex = 0,
  sleigh = null,
  sleighPosition = MIDDLE,
  gameStarted = false,
  gameUser = null,
  score = 0;

  return {
    init: function() {
      container = document.getElementById("container");
      sleigh = document.getElementById("sleigh");
      viewHeight = parseInt(getComputedStyle(container)['height'].replace("px",""));
      Game.addSnow();
      Game.randomInterval();
      Game.animateStuff();
      Game.listenForInput();
    },
    listenForInput: function() {
      document.onkeydown = function(e) {
        e = e || window.event;
        switch(e.which || e.keyCode) {
          case 37: // left
          Game.moveLeft();
          break;

          case 39: // right
          Game.moveRight();
          break;

          default: return;
        }
        e.preventDefault();
      };

      document.getElementById("start-demo").addEventListener("click", function() {
        Game.startGame(DEMO);
      });

      document.getElementById("start-jason").addEventListener("click", function() {
        Game.startGame(JASON);
      });

      document.getElementById("start-mom").addEventListener("click", function() {
        Game.startGame(MOM);
      });
    },
    startGame: function(user) {
      gameStarted = true;
      document.getElementById("overview").style.display = "none";
    },
    moveLeft: function() {
      switch (sleighPosition) {
        case LEFT:
        // do nothing, because we're already on the left
        break;

        case MIDDLE:
        sleighPosition = LEFT;
        sleigh.classList.add("left");
        break;

        case RIGHT:
        sleighPosition = MIDDLE;
        sleigh.classList.remove("right");
        break;

        default: return;
      }
    },
    moveRight: function() {
      switch (sleighPosition) {
        case LEFT:
        sleighPosition = MIDDLE;
        sleigh.classList.remove("left");
        break;

        case MIDDLE:
        sleighPosition = RIGHT;
        sleigh.classList.add("right");
        break;

        case RIGHT:
        // do nothing, because we're already on the right
        break;

        default: return;
      }

    },
    randomInterval: function() {
      rand = Math.round(Math.random() * (1000 - 500)) + 500 - speed * 15;
      setTimeout(function() {
        Game.addTree();

        if(rand % 3 == 0 && gameStarted) {
          Game.addPresent();
        }

        Game.randomInterval();
      }, rand);
    },
    addPresent: function() {
      var present = document.createElement("div");
      var pos = Math.round(Math.random() * (3 - 1) + 1);

      present.classList.add("present");

      switch (pos) {
        case 1:
        present.style.left = "95px";
        present.classList.add("left");
        break;

        case 2:
        present.style.left = "330px";
        break;

        case 3:
        present.style.right = "95px";
        present.classList.add("right");
        break;
      }

      document.getElementById("path").appendChild(present);
      presents.push(present);
    },
    addTree: function() {
      var tree = document.createElement("div");
      var isLeft = Math.round(Math.random()) % 2 == 0;
      var offset = Math.round(Math.random() * (250)) + 500 / 2000;
      if(offset > 250) {
        offset = 250;
      }

      tree.setAttribute("id", "tree-" + treeIndex++);
      tree.classList.add("tree");

      if(isLeft) {
        tree.style.left = offset + "px";
      } else {
        tree.style.right = offset + "px";
      }

      container.appendChild(tree);
      trees.push(tree);
    },
    addSnow: function() {
      snow = document.createElement("div");
      snow.classList.add("snow");
      container.appendChild(snow);
    },
    animateStuff: function() {
      setTimeout(function() {
        requestAnimationFrame(Game.animateStuff);
        Game.redrawAssets();
      }, 1000 / fps);
    },
    redrawAssets: function() {
      // animate the snow
      var snowTop = parseInt(getComputedStyle(snow)['top'].replace("px",""));
      snowTop += 0.5 * speed;

      if(snowTop <= 1000) {
        snow.style.top = snowTop + "px";
      } else {
        snow.style.top = "0px";
      }

      // animate the trees
      trees.forEach(function(tree, i){
        var treeTop = parseInt(getComputedStyle(tree)['top'].replace("px",""));
        treeTop += 0.5 * speed;

        tree.style.top = treeTop + "px";

        if(treeTop > viewHeight + 100) {
          tree.parentNode.removeChild(tree);
          trees.splice(i, 1);
        }
      });

      // animate the presents
      presents.forEach(function(present, i){
        var presentTop = parseInt(getComputedStyle(present)['top'].replace("px",""));
        presentTop += 0.5 * speed;

        present.style.top = presentTop + "px";

        if(presentTop > viewHeight + 100) {
          present.parentNode.removeChild(present);
          presents.splice(i, 1);
          return;
        }

        if(presentTop > (viewHeight - 220) && presentTop < (viewHeight - 200)) {
          var presentPos = null;
          if(present.classList.contains("left")) {
            presentPos = LEFT;
          } else if(present.classList.contains("right")) {
            presentPos = RIGHT;
          } else {
            presentPos = MIDDLE;
          }

          if(presentPos == sleighPosition) {
            present.parentNode.removeChild(present);
            presents.splice(i, 1);

            score++;
            document.getElementById("score").innerHTML = score;

            // speed up slightly
            if(speed < 30) {
              speed += 1;
              document.getElementById("speed").innerHTML = speed * 2 + "mph";
            }
          }
        }
      });
    }
  }
}();

Game.init();
