// let arr = [['1','2','3'],['4','5','6'],['7','8','9']];
let board = document.getElementById('board');
let players = ['x','o']
let arr = []
let recovery = []
let player = 'x'
// let winTable = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];

for (i=0; i<9;i++){
    let elem = document.createElement('div')
    elem.className = 'cell';
    board.appendChild(elem);
    elem.id = i
    elem.onclick = click
}
function click (event) {
    let v = event.target;
    let id = event.target.id
    arr[id] = player
    recovery.push(id)
    v.innerText = player;
    v.classList.add('check');
    check()
    player=='x'? player = 'o': player = 'x'
}



let winTable = [[0, 1, 2],[3, 4, 5],[6, 7, 8],[0, 3, 6],[1, 4, 7],[2, 5, 8],[0, 4, 8],[2, 4, 6]];
function check(){
    for(i of winTable){
        let temp = []
        temp.push(arr[i[0]])
        temp.push(arr[i[1]])
        temp.push(arr[i[2]])
        if(temp.every((element) => element == player)){
        console.log(player + 'win');
    }
}}



// let a = arr[i[0]]
// let b = arr[i[1]]
// let c = arr[i[2]]
// if(!a || !b|| !c){
// }else if(a==b && b==c){
//     console.log(player +' win');
// }