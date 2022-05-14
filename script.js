
let board = document.getElementById('board');
let arr = [];
let recovery=[]
let players = ['x','o']
let player = 'x'
let rows= 5
let myLength=0


for(i=0;i<rows*rows;i++){
    let elem=document.createElement('div')
    elem.className='cell';
    board.appendChild(elem)
    elem.id=i
    elem.onclick=click
}



function click (event) {
    // debugger
    let v = event.target;
    let id= event.target.id
    arr[id]=player
    recovery.push(id)
    v.innerText = player
    let myLength=arr.reduce((v,i)=>(i)?v+1:v,0);
    if (myLength>=rows){
    check()}
    v.classList.add('check')
    if(player == 'x'){
        player = 'o'
    }else{
        player = 'x'
    }
}


// let winTable=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
// [0,1,2,3],[4,5,6,7],[8,9,10,11],[12,13,14,15],[0,4,8,12],[1,5,9,13],[2,6,10,14],[3,7,11,15],[0,5,10,15],[3,6,9,12]]


let winTable2=[]
function winTable(){
for(i=0;i<rows*2+2;i+=rows){
    if(i<rows){
        let horizon=[]
        for(n=0;n<rows*rows;n++){
            horizon.push(n)
        }
        while (horizon.length) {
            winTable2.push(
              horizon.splice(0, rows)
            )
          }
        
    }
    if(i==rows){
        for(n=0;n<rows;n++){
           let z=range2(n,rows)
       winTable2.push(z)
        }
        
    }
    if (i==rows*2){
        let diagonal1 = range3(0,rows)
        winTable2.push(diagonal1)
        let diagonal2= range4(rows-1,rows)
        winTable2.push(diagonal2)

    }
}
}

winTable()



function check(){
    for(i of winTable2){
        let temp=[]
        for(n in i){
            
        temp.push(arr[i[n]])
        if (temp.length==rows){
        if(temp.every((element)=> element==player)){
            console.log(player+'  win')
        }
    }
    
}
}
}

        

      function range2(start,rows) {
        return Array(rows).fill().map((_, idx) => start + idx*rows)
      }

      function range3(start,rows) {
        return Array(rows).fill().map((_, idx) => start + idx*(rows+1))
      }

      function range4(start,rows) {
        return Array(rows).fill().map((_, idx) => start + idx*(rows-1))
      }

