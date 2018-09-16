iniPosX = 600
iniPosY = 50

class Node{
  constructor(value,color,right=null,left=null){
    this.value = value
    this.right = right
    this.left = left
    this.color = color
    this.x = 0
    this.y = 0
    this.moveX = 0
    this.moveY = 0
    this.father = null
  }

  move(){
    if(this.x<this.moveX){
      this.moveX = this.moveX - 10;
    }
    if(this.x>this.moveX){
      this.moveX = this.moveX + 10
    }
    if(this.y<this.moveY){
      this.moveY = this.moveY - 10
    }
    if(this.y>this.moveY){
      this.moveY = this.moveY + 10
    }
  }

  setRight(right){
    this.right = right
  }

  setLeft(left){
    this.left = left
  }

  setPos(x,y){    
    this.x = x
    this.y = y    
  }


  setFather(father){
    this.father = father
  }


}

var font,
  fontsize = 40

node_x = 720/2
node_y = 400/6

root = null;


function setup() {
  createCanvas(windowWidth,windowHeight);
  noStroke();
}

function draw() {
  background(100);
  drawTree(root);

}

function drawTree(a) {
  
  if(a == null){
    return 0
  }
  
  stroke(255);  
  if(a.left != null){
    fill('white');
    line(a.moveX, a.moveY, a.left.moveX, a.left.moveY);
  }
  if(a.right != null){
    fill('white');
    line(a.moveX, a.moveY, a.right.moveX, a.right.moveY);
  }

  a.move()
  fill(a.color)
  ellipse(a.moveX,a.moveY, 30, 30);
  drawTree(a.left)
  drawTree(a.right)
 
  fill('white');
  text(a.value, a.moveX-10, a.moveY+5);
 
}

function findHeight(node){

  if(node == null){
    return -1;
  }
  let lefth = findHeight(node.left);
  let righth = findHeight(node.right);
    if (lefth > righth) {
        return lefth + 1;
    } else {
        return righth + 1;
    }

}

function balanceFactor(node){
  return findHeight(node.right) - findHeight(node.left) 
}

function insere(key,father){
  if(root == null){
    root = new Node(key,"black")
    root.setPos(iniPosX,iniPosY)
    auxR = root
  }
  else{
    var auxR = root
    var nivel = 1
    while(true){
      if(auxR.value <= key && auxR.right !=null){
        auxR = auxR.right
      }
      else if(auxR.value <= key && auxR.right == null){
        let node = new Node(key,"black")
        node.setPos(auxR.x+(500/nivel),auxR.y+(100))
        node.setFather(auxR) 
        auxR.setRight(node)
        auxR = auxR.right
        break;
      } 
      if(auxR.value > key && auxR.left !=null){
        auxR = auxR.left
      }
      else if(auxR.value > key && auxR.left == null){
        let node = new Node(key,"black")
        node.setPos(auxR.x-(500/nivel),auxR.y+(100))
        node.setFather(auxR)
        auxR.setLeft(node)
        auxR = auxR.left
        break;
      } 
      nivel++;

  }
  }
  return auxR
}

function reRoot(node){
  aux = node
  while(aux.father != null){
    aux = aux.father
  }
  root = aux
}

function rightRotation(node){
  let nodeFather = node.father
  let leftNode = node.left
  node.left = leftNode.right
  if(node.left != null){
    leftNode.right.setFather(node)
  }
  leftNode.right = node
  leftNode.setFather(node.father)
  node.setFather(leftNode)
  
  if(nodeFather!=null){
    if(nodeFather.right == node){
      nodeFather.right = leftNode
    }
    else if(nodeFather.left == node){
      nodeFather.left = leftNode
    }
  }

  reRoot(node)
}

function leftRotation(node){
  let nodeFather = node.father
  let leftNode = node.right
  node.right = leftNode.left
  if(node.right != null){
    leftNode.left.setFather(node)
  }
  leftNode.left = node
  leftNode.setFather(node.father)
  node.setFather(leftNode)
  
  if(nodeFather!=null){
    if(nodeFather.left == node){
      nodeFather.left = leftNode
    }
    else if(nodeFather.right == node){
      nodeFather.right = leftNode
    }
  }

  reRoot(node)

}

function makeBalance(node){
  let balanceOfNode = balanceFactor(node);
    if (balanceOfNode < -1) {
        if (balanceFactor(node.left) > 0) {
            leftRotation(node.left);
        }
        rightRotation(node);
    } else if (balanceOfNode > 1) {
        if (balanceFactor(node.right) < 0) {
            rightRotation(node.right);
        }
        leftRotation(node);
    }
}

function printTree(node){
  if(node == null){
    return
  }
  console.log(node.value)
  printTree(node.left)
  printTree(node.right)
}

function search(node,value){
  if(node == null){
    alert("Erro")
    return null
  }
  if(node.value == value){
    return node
  }
  if(node.value <= value){
    return search(node.right,value)
  }

  if(node.value > value){
    return search(node.left,value)
  }
  
}

function updatePos(node,x,y,nivel=1){
  if(node == null){
   return
  } 
  node.setPos(x,y)
  updatePos(node.left, x-(80/nivel), y+(100), nivel+1)
  updatePos(node.right, x+(80/nivel), y+(100), nivel+1)
}

function findDisbalance(node){
  if(node == null){
    return;
  }
  if(balanceFactor(node)>1 || balanceFactor(node)<-1){
    makeBalance(node)
    return;
  }
  findDisbalance(node.father)
}

function keyPressed() {
  let node = insere(key,root,null)
  findDisbalance(node)
  updatePos(root,iniPosX,iniPosY)

}

function windowResized() {
  resizeCanvas(windowWidth,windowHeight);
  let auxL = root
  let auxR = root
  while(auxL.left != null){
    auxL = auxL.left
  }
  while(auxR.right != null){
    auxR = auxR.right
  }
  

}

