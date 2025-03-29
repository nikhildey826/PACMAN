const canvas = document.querySelector('canvas')
console.log(canvas);

const c = canvas.getContext('2d')
canvas.width = innerWidth
canvas.height = innerHeight

class Boundary {
  static {
    Boundary.width = 40
    Boundary.height = 40
  }
  constructor({ position,image }) {
    this.position = position
    this.width = 40
    this.height = 40
    this.image=image
  }
  draw() {
    // c.fillStyle = 'blue'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)
    c.drawImage(this.image,this.position.x,this.position.y)
  }
}

class Player {
  constructor({ position, velocity }) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
  }
  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'yellow'
    c.fill()
    c.closePath()
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

  }
}
class Ghost {
  constructor({ position, velocity,color='red' }) {
    this.position = position
    this.velocity = velocity
    this.radius = 15
    this.color=color
  }
  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = this.color
    c.fill()
    c.closePath()
  }
  update() {
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

  }
}

class Pellet {
  constructor({ position }) {
    this.position = position
    this.radius = 4
  }
  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
    c.fillStyle = 'orange'
    c.fill()
    c.closePath()
  }
}


const pellets=[];
const boundaries = [];
const ghosts=[
  new Ghost({
    position:{
      x:0,
      y:0
    },
    velocity:{
      x:0,
      y:0    }
  })
]
const player = new Player({
  position: {
    x: Boundary.width + Boundary.width / 2,
    y: Boundary.height + Boundary.height / 2
  },
  velocity: {
    x: 0,
    y: 0
  }
})
const keys = {
  w: {
    pressed: false
  },
  a: {
    pressed: false
  },
  s: {
    pressed: false
  },
  d: {
    pressed: false
  }
}

let lastkey = ''
const map = [
['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
['|', ' ', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
['|', '.', 'A', ' ', 'L', '-', 'R', ' ', 'A', '.', '|'],
['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
['|', '.', 'T', '.', '.', 'A', '.', '.', 'T', '.', '|'],
['|', '.', '|', 'R', '.', '.', '.', 'L', '|', '.', '|'],
['|', '.', 'B', '.', '.', 'T', '.', '.', 'B', '.', '|'],
['|', '.', '.', '.', 'L', '*', 'R', '.', '.', '.', '|'],
['|', '.', 'T', '.', '.', 'B', '.', '.', 'T', '.', '|'],
['|', '.', 'T', '.', '.', '.', '.', '.', 'T', '.', '|'],
['|', '.', 'B', '.', 'T', '.', 'T', '.', 'B', '.', '|'],
['|', '.', 'B', '.', '4', '-', '3', '.', 'B', '.', '|'],
['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
['|', '.', 'A', ' ', 'L', '-', 'R', '.', 'A', '.', '|'],
['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3'],
]
function createImage(src){
  const image=new Image()
  image.src=src
  return image
}


map.forEach((row, i) => {
  row.forEach((symbol, j) => {
    switch (symbol) {
      case '-': boundaries.push(
        new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.height * i
          },
          image : createImage('./img/pipeHorizontal.png') 
        })
      )
        break;
      case '|': boundaries.push(
        new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.height * i
          },
          image : createImage('./img/pipeVertical.png')
        })
      )
        break;
      case '1': boundaries.push(
        new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.height * i
          },
          image : createImage('./img/pipeCorner1.png')
        })
      )
        break;
      case '2': boundaries.push(
        new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.height * i
          },
          image : createImage('./img/pipeCorner2.png')
        })
      )
        break;
      case '3': boundaries.push(
        new Boundary({
          position: {
            x: Boundary.width * j,
            y: Boundary.height * i
          },
          image : createImage('./img/pipeCorner3.png')
        })
      )
        break;
        case '4': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/pipeCorner4.png')
          })
        )
          break;
        case 'A': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/block.png')
          })
        )
          break;
        case 'R': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/capRight.png')
          })
        )
          break;
        case 'T': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/capTop.png')
          })
        )
          break;
        case 'L': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/capLeft.png')
          })
        )
          break;
        case 'B': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/capBottom.png')
          })
        )
          break;
        case 't': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/pipeConnectorTop.png')
          })
        )
          break;
        case 'b': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/pipeConnectorBottom.png')
          })
        )
          break;
        case 'r': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/pipeConnectorRight.png')
          })
        )
          break;
        case 'l': boundaries.push(
          new Boundary({
            position: {
              x: Boundary.width * j,
              y: Boundary.height * i
            },
            image : createImage('./img/pipeConnectorLeft.png')
          })
        )
          break;

                      case '*': boundaries.push(
                        new Boundary({
                          position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                          },
                          image : createImage('./img/pipeCross.png')
                        })
                      )
                      case '.':
                        pellets.push(
                         new Pellet({
                           position: {
                             x: Boundary.width * j + Boundary.width/2,
                             y: Boundary.height * i + Boundary.height/2
                           }
                         })
                       )
                         break;
                      
                      
                      
                  
    }
  })
})

function circleCollapseWithRectangle({circle,rectangle}){
return(
  circle.position.y - circle.radius + circle.velocity.y <= rectangle.position.y + rectangle.height &&    
  circle.position.x + circle.radius + circle.velocity.x >= rectangle.position.x  &&                       
  circle.position.x - circle.radius + circle.velocity.x <= rectangle.position.x + rectangle.width &&                                                                                  
circle.position.y + circle.radius + circle.velocity.y >= rectangle.position.y  
)                        
}
function animate() {
  requestAnimationFrame(animate)
  c.clearRect(0,0,canvas.width,canvas.height)

  
  for(let i=pellets.length-1 ; 0<i ; i--){
    const Pellet =  pellets[i]
    Pellet.draw()
    if(Math.hypot(Pellet.position.x-player.position.x , Pellet.position.y-player.position.y)
    < player.radius+Pellet.radius){
    pellets.splice(i,1)
    score += 10 
    scoreEl.innerHTML = score
  }
  }
  boundaries.forEach(boundary => {
    boundary.draw()

    if(
        circleCollapseWithRectangle({
          circle: player,
          rectangle : boundary
        })                                                            
    ){
      player.velocity.x=0
      player.velocity.y=0
    }
  });

  player.update()
  ghosts.forEach(ghost =>{
    ghost.update()
  })
  // player.velocity.y = 0
  // player.velocity.x = 0
  if (keys.w.pressed && lastkey === 'w') {
   for(let i=0 ; i<=boundaries.length ;i++){
    const boundary = boundaries[i]
    if(
      circleCollapseWithRectangle({
        circle: {...player ,
         velocity: {
          x : 0,
          y: -5
         }
        },
        rectangle : boundary
      })                                                            
  ){
    player.velocity.y=0
    break
  }
  else{
      player.velocity.y=-5
  }
   }
}
  else if (keys.a.pressed && lastkey === 'a') {
    for(let i=0 ; i<=boundaries.length ;i++){
      const boundary = boundaries[i]
      if(
        circleCollapseWithRectangle({
          circle: {...player ,
           velocity: {
            x : -5,
            y: 0
           }
          },
          rectangle : boundary
        })                                                            
    ){
      player.velocity.x=0
      break
    }
    else{
        player.velocity.x=-5
    }
     }
 }
  else if (keys.s.pressed && lastkey === 's') {
    for(let i=0 ; i<=boundaries.length ;i++){
      const boundary = boundaries[i]
      if(
        circleCollapseWithRectangle({
          circle: {...player ,
           velocity: {
            x : 0,
            y : 5
           }
          },
          rectangle : boundary
        })                                                            
    ){
      player.velocity.y=0
      break
    }
    else{
        player.velocity.y=5
    }
     }
  }
  else if (keys.d.pressed && lastkey === 'd') {
    for(let i=0 ; i<=boundaries.length ;i++){
      const boundary = boundaries[i]
      if(
        circleCollapseWithRectangle({
          circle: {...player ,
           velocity: {
            x : 5,
            y: 0
           }
          },
          rectangle : boundary
        })                                                            
    ){
      player.velocity.x=0
      break
    }
    else{
        player.velocity.x=5
    }
     }
  }
}
animate();


addEventListener('keydown', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = true
      lastkey = 'w'
      break
    case 'a':
      keys.a.pressed = true
      lastkey = 'a'
      break
    case 'd':
      keys.d.pressed = true
      lastkey = 'd'
      break
    case 's':
      keys.s.pressed = true
      lastkey = 's'
      break
  }
  console.log(keys.w.pressed);
  
})
addEventListener('keyup', ({ key }) => {
  switch (key) {
    case 'w':
      keys.w.pressed = false
      break
    case 'a':
      keys.a.pressed = false
      break
    case 'd':
      keys.d.pressed = false
      break
    case 's':
      keys.s.pressed = false
      break
  }
})
