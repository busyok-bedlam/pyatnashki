
//CHECK OUR ELEMENTS FOR NEIGBOUR BEGIN
const findRow = (elem,step = 3) => Math.ceil(elem/step)
const oneRow = (elem1,elem2,callback = findRow) => callback(elem1)===callback(elem2);
const findCol = (elem,step = 3)=>elem%step || step;
const oneCol = (elem1,elem2,callback=findCol) => callback(elem1)===callback(elem2);
const detextXelem =(elem,callback=findRow,step=3) =>(elem-step*(callback(elem)-1));
const detextYelem = (elem,step=3)=>(Math.ceil((elem-3)/3)+1);
const isNeigbour = (cell1,cell2)=> {
	return 	oneRow(cell1,cell2) ? 
				Math.abs(detextXelem(cell1)-detextXelem(cell2)) === 1 ?
					true:
					false 
				:oneCol(cell1,cell2) ?
					Math.abs(detextYelem(cell1)-detextYelem(cell2)) === 1 ?
						true:
						false
					:false
}
//CHECK OUR ELEMENTS FOR NEIGBOUR END


//OUR COORDS
const findMouseCoords = event=>({x:event.clientX,y:event.clientY});



//FIND INDEX OF OUR ELEMENT BEGIN
const isEqualElem = (elem,arrayElem)=>{
	return elem.x>=arrayElem.x
	 && elem.x<(arrayElem.x+arrayElem.w)
	  && elem.y>=arrayElem.y
	   && elem.y<(arrayElem.y+arrayElem.h) ? true : false;
}
const findIndexElem = (elem,array,callback=isEqualElem)=>{
	const list = [];
	array.forEach(item=>list.push(callback(elem,item)));
	return list.indexOf(true)+1;
}
//FIND INDEX OF OUR ELEMENT END

const swapElem = (array,ind1,ind2) => {
	const timeArray = [...array];
	timeArray.push(timeArray[ind1]);
	timeArray[ind1] = timeArray[ind2];
	timeArray[ind2] = timeArray[timeArray.length-1];
	timeArray.pop();
	return timeArray;
}

class Elem {
	constructor(x,y,id,w=50,h=50){
		this.x = x;
		this.y = y;
		this.h = h;
		this.w = w;
		this.id = id;
	}
}

//DRAW PART BEGIN
const drawBoard = (ctx,width,height,step = 50)=>{
	for(let count = 1;count<4;count++){
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(step*count,0);
		ctx.lineTo(step*count,height);
		ctx.stroke()	
		
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(0,step*count);
		ctx.lineTo(width,step*count);
		ctx.stroke()
	}
}

const drawElem = (ctx,elem,step = 25)=>{
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeRect(elem.x,elem.y,elem.w,elem.h);
	ctx.font = "italic 10pt Arial";
	ctx.fillText(elem.id,elem.x+step,elem.y+step)
}

const drawContext =(ctx,arr,callback=drawElem)=>{
	arr.forEach( item =>{callback(ctx,item)})
}
//DRAW PART END
const draw = (ctx,array)=>{
	drawBoard(ctx);
	drawContext(ctx,array);
}
const drawCheckedElem = (element,ctx)=> {
	ctx.beginPath()
	ctx.lineWidth = 3;
	ctx.strokeRect(element.x,element.y,element.w,element.h);
}
const calCulate = ()=>{

}
(function(){
	const w =50,h=50,step =10;
	const gameField = [
		new Elem(0,	 0,  4),
		new Elem(50, 0,  6),
		new Elem(100,0,  3),
		new Elem(150,0,  7),
		new Elem(0,  50, ""),
		new Elem(50, 50, 1),
		new Elem(100,50, 14),
		new Elem(150,50, 12),
		new Elem(0,  100,9),
		new Elem(50, 100,2),
		new Elem(100,100,11),
		new Elem(150,100,5),
		new Elem(0,  150,10),
		new Elem(50, 150,13),
		new Elem(100,150,8),
		new Elem(150,150,15)
		]

	const canvas = document.getElementById('canvas');
	const ctx = canvas.getContext('2d');
	let width = canvas.width = 200,
	height = canvas.height = 200;
	const handleFunc = event =>{
		event.preventDefault();
		canvas.addEventListener('click',(event)=>{event.preventDefault();alert("ddd");return;})
		calCulate();
		draw(ctx,gameField);
		// alert(findIndexElem(findMouseCoords(event),gameField));
		return;
	}
	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeRect(0,0,200,200)
	console.log(gameField)
	drawBoard(ctx,width,height);
	// 	ctx.beginPath();
	// ctx.lineWidth = 3;
	// ctx.rect(50,0,50,50);
	// ctx.stroke()
	drawContext(ctx,gameField)
	canvas.addEventListener('click',handleFunc);
	drawCheckedElem(gameField[3],ctx);
})()





// const ppp = ()=>{
// 	return 5>3?
// 			3>1? "double true" :
// 				 "double lie"
// 			: "lol"
// }
