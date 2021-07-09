AFRAME.registerComponent("paintball", {
    init: function () {
      this.shootPaintball();
    },
    shootPaintball: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var paintball = document.createElement("a-entity");
  
          paintball.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          paintball.setAttribute("material", "color", "multcolor");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          paintball.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          paintball.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          //set the paintball as the dynamic entity
          paintball.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
          });
  
          //add the collide event listener to the paintball
          paintball.addEventListener("collide", this.removePaintball);
  
          scene.appendChild(paintball);
  
          //shooting sound
          this.shootSound();
        }
      });
    },
    removePaintball: function (e) {
      //paintball element
      var element = e.detail.target.el;
  
      //element which is hit
      var elementHit = e.detail.body.el;
  
      //Create paint splash
    var paint = document.createElement("a-entity");
    var pos = element.getAttribute("position")
    var rotate = elementHit.getAttribute("rotation")

    //set the position, rotation, scale
    paint.setAttribute("position", {
      x: pos.x,
      y: pos.y,
      z: pos.z,
    });
    paint.setAttribute("rotation", {
      x: rotate.x,
      y: rotate.y,
      z: rotate.z,
    });
    paint.setAttribute("scale", {
      x: 2,
      y: 2,
      z: 2,
    });

    //choose the paint splash image randomly
    var colorNum = parseInt(Math.random() * 7 + 2)

    paint.setAttribute("material", {
      opacity: 1,
      transparent: true,
      src: "./images/paint splash-0" + colorNum + ".png"
    });

    paint.setAttribute("geometry", {
      primitive: "plane",
      width: 0.5,
      height: 0.5
    });
    scene.appendChild(paint)
        //remove event listener
        element.removeEventListener("collide", this.removePaintball);
  
        //remove the paintball from the scene
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
    },
    shootSound: function () {
      var entity = document.querySelector("#sound1");
      entity.components.sound.playSound();
    },
  });
  
  