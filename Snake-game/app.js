const canvas = document.querySelector('#canvas');
const pen = canvas.getContext('2d')

const cs = 57;
const W = '1200';
const H = '632';
let food = null;
let score = 0;

const snake = {
    init_len: 5,
    dir : 'right',
    cells: [],
    createSnake: function(){
        for(let i=0; i<this.init_len; i++){
            this.cells.push({
                x:i,
                y:0
            });
        }
    },

    drawSnake: function(){
        for(let cell of this.cells){
            pen.fillRect(cell.x*cs,cell.y*cs,cs-1,cs-1);
        }
    },
    updateSnake: function(){
        // get the value of last cells
        const head_x = this.cells[this.cells.length-1].x;
        const head_y = this.cells[this.cells.length-1].y;

        if(head_x === food.x && head_y === food.y){
            food  = getRandomfood();
            score++;
        }else{
            this.cells.shift();
        }


        let next_x ;
        let next_y ;
       
        if(this.dir === 'down'){
            next_x = head_x;
            next_y = head_y+1;
            if(next_y*cs>H){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over`,100,100);
                clearInterval(id);
            }

        }else if(this.dir=== 'up'){
            next_x = head_x;
            next_y = head_y-1;
            if(next_y*cs<0){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over`,100,100);
                clearInterval(id);
            }
        }else if(this.dir === 'left'){
            next_x = head_x-1;
            next_y = head_y;
            if(next_x*cs<0){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over`,100,100);
                clearInterval(id);
            }
        }else {
            next_x = head_x+1;
            next_y = head_y;
            if(next_x*cs>W){
                pen.fillStyle = 'red';
                pen.fillText(`Game Over`,100,100);
                clearInterval(id);
            }
        }

        // push the new cells after the head inside the cells array
        this.cells.push({
            x:next_x,
            y:next_y
        });

    }

}




// intialize the game
function init(){
    snake.createSnake();

    food = getRandomfood();

    function keypressed(e){

        if(e.key === 'ArrowDown'){
            snake.dir = 'down';
        }else if(e.key === 'ArrowUp'){
            snake.dir = 'up';
        }else if(e.key === 'ArrowLeft'){
            snake.dir = 'left';
        }else if(e.key === 'ArrowRight') {
            snake.dir = 'right';
        }
        console.log(snake.dir);
    }

    document.addEventListener('keydown',keypressed);
}


// update the game
function update(){
    snake.updateSnake();
}

// draw the game
function draw(){
    pen.clearRect(0,0,W,H);
    pen.font = '40px sans-serif';
    pen.fillText(`Score${score}`,100,50);
    pen.fillStyle = 'blue';    
    pen.fillRect(food.x*cs,food.y*cs,cs,cs);
    pen.fillStyle = 'yellow';
    snake.drawSnake();
}

// game loop

function game_loop(){
    draw();
    update();  
}

function getRandomfood(){

    const foodX = Math.round(Math.random()*(W-cs)/cs);
    const foodY = Math.round(Math.random()*(H-cs)/cs);

    food = {
        x: foodX,
        y:foodY
    }
    return food;
}


init();
const id = setInterval(game_loop,100);