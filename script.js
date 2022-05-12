let arr = [['1','2','3'],['4','5','6'],['7','8','9']];
let board = document.getElementById('board');
let players = ['x','o']


for(i of arr){
    for (n of i){
        let elem = document.createElement('div')
        elem.innerText = n
        elem.className = 'cell';
        board.appendChild(elem)
        elem.onclick = click
    }
}

let player = 'x'
function click (event) {
    let v = event.target;
    v.innerText = player
    v.classList.add('check')
    if(player == 'x'){
        player = 'o'
    }else{
        player = 'x'
    }
}

function win(){

}
