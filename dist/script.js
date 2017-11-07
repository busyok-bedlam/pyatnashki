"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

//CHECK OUR ELEMENTS FOR NEIGBOUR BEGIN
var findRow = function findRow(elem) {
	var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
	return Math.ceil(elem / step);
};
var oneRow = function oneRow(elem1, elem2) {
	var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : findRow;
	return callback(elem1) === callback(elem2);
};
var findCol = function findCol(elem) {
	var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
	return elem % step || step;
};
var oneCol = function oneCol(elem1, elem2) {
	var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : findCol;
	return callback(elem1) === callback(elem2);
};
var detextXelem = function detextXelem(elem) {
	var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : findRow;
	var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
	return elem - step * (callback(elem) - 1);
};
var detextYelem = function detextYelem(elem) {
	var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 4;
	return Math.ceil((elem - 4) / 4) + 1;
};
var isNeigbour = function isNeigbour(cell1, cell2) {
	return oneRow(cell1, cell2) ? Math.abs(detextXelem(cell1) - detextXelem(cell2)) === 1 ? true : false : oneCol(cell1, cell2) ? Math.abs(detextYelem(cell1) - detextYelem(cell2)) === 1 ? true : false : false;
};
//CHECK OUR ELEMENTS FOR NEIGBOUR END


//OUR COORDS
var findMouseCoords = function findMouseCoords(event) {
	return { x: event.clientX, y: event.clientY };
};

//FIND INDEX OF OUR ELEMENT BEGIN
var isEqualElem = function isEqualElem(elem, arrayElem) {
	return elem.x >= arrayElem.x && elem.x < arrayElem.x + arrayElem.w && elem.y >= arrayElem.y && elem.y < arrayElem.y + arrayElem.h ? true : false;
};
var findIndexElem = function findIndexElem(elem, array) {
	var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : isEqualElem;

	var list = [];
	array.forEach(function (item) {
		return list.push(callback(elem, item));
	});
	return list.indexOf(true) + 1;
};
//FIND INDEX OF OUR ELEMENT END

var swap = function swap(el1, el2) {
	return _extends({}, el1, { id: el2.id });
};

var swapElem = function swapElem(array, ind1, ind2) {
	var timeArray = [].concat(_toConsumableArray(array));
	timeArray.push(timeArray[ind1]);
	timeArray[ind1] = _extends({}, timeArray[ind1], { id: timeArray[ind2].id });
	timeArray[ind2] = _extends({}, timeArray[ind2], { id: timeArray[timeArray.length - 1].id });
	timeArray.pop();
	return timeArray;
	// array.push(array[ind1]);
	// array[ind1] = array[ind2];
	// array[ind2] = array[array[array.length-1]];
	// array.pop();
};

var Elem = function Elem(x, y, id) {
	var w = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
	var h = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 50;

	_classCallCheck(this, Elem);

	this.x = x;
	this.y = y;
	this.h = h;
	this.w = w;
	this.id = id;
};

//XOR OPERATOR


var toBit = function toBit(elem) {
	return isNaN(elem / elem) ? 0 : 1;
};
var XOR = function XOR(elem1, elem2) {
	var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : toBit;
	return callback(elem1) ^ callback(elem2) ? true : false;
};

//DRAW PART BEGIN
var drawBoard = function drawBoard(ctx, width, height) {
	var step = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

	for (var count = 1; count < 4; count++) {
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(step * count, 0);
		ctx.lineTo(step * count, height);
		ctx.stroke();

		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.moveTo(0, step * count);
		ctx.lineTo(width, step * count);
		ctx.stroke();
	}
};

var drawElem = function drawElem(ctx, elem) {
	var step = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 25;

	ctx.beginPath();
	ctx.lineWidth = 1;
	ctx.strokeRect(elem.x, elem.y, elem.w, elem.h);
	ctx.font = "italic 10pt Arial";
	ctx.fillText(elem.id, elem.x + step, elem.y + step);
};

var drawContext = function drawContext(ctx, arr) {
	var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : drawElem;

	arr.forEach(function (item) {
		callback(ctx, item);
	});
};
//DRAW PART END
var draw = function draw(ctx, array, width, height) {
	ctx.clearRect(0, 0, width, height);
	drawBorder(ctx, width, height);
	drawBoard(ctx, width, height);
	drawContext(ctx, array);
};
var drawBorder = function drawBorder(ctx, width, height) {
	ctx.lineWidth = 1;
	ctx.strokeRect(0, 0, width, height);
};
var drawCheckedElem = function drawCheckedElem(element, ctx) {
	ctx.beginPath();
	ctx.lineWidth = 3;
	ctx.strokeRect(element.x, element.y, element.w, element.h);
};
var calCulate = function calCulate() {};

//OUR GAME

(function () {
	var w = 50,
	    h = 50,
	    step = 10;
	var gameField = [new Elem(0, 0, 4), new Elem(50, 0, 6), new Elem(100, 0, 3), new Elem(150, 0, 7), new Elem(0, 50, ""), new Elem(50, 50, 1), new Elem(100, 50, 14), new Elem(150, 50, 12), new Elem(0, 100, 9), new Elem(50, 100, 2), new Elem(100, 100, 11), new Elem(150, 100, 5), new Elem(0, 150, 10), new Elem(50, 150, 13), new Elem(100, 150, 8), new Elem(150, 150, 15)];
	var canvas = document.getElementById('canvas');
	var ctx = canvas.getContext('2d');
	var width = canvas.width = 200,
	    height = canvas.height = 200,
	    swapArray = [],
	    indexArray = [],
	    checkElem = void 0,
	    winFlag = false;

	ctx.beginPath();
	ctx.clearRect(0, 0, width, height);
	ctx.lineWidth = 1;
	ctx.strokeRect(0, 0, 200, 200);
	drawBoard(ctx, width, height);
	drawContext(ctx, gameField);

	// drawContext(ctx,gameField);


	var drawPole = function drawPole() {
		ctx.clearRect(0, 0, width, height);
		ctx.beginPath();
		ctx.lineWidth = 1;
		ctx.strokeRect(0, 0, 200, 200);
		drawBoard(ctx, width, height);
		drawContext(ctx, gameField);
		// ctx.beginPath();
	};
	var handleFunc = function handleFunc(event) {
		if (winFlag) return;
		event.preventDefault();

		var checkCoords = findMouseCoords(event);
		var index = findIndexElem(checkCoords, gameField) - 1;
		checkElem = gameField[index];
		swapArray.push(checkElem);
		indexArray.push(gameField.indexOf(checkElem));
		// drawCheckedElem(checkElem,ctx);	
		console.log(swapArray);
		console.log(indexArray);

		// alert(findIndexElem(checkElem,gameField))
		// swapArray =  swapArray.length<2?swapArray.push()
		if (swapArray.length == 2) {
			if (XOR(swapArray[0].id, swapArray[1].id)) {
				if (isNeigbour(indexArray[0] + 1, indexArray[1] + 1)) {
					gameField = swapElem(gameField, indexArray[0], indexArray[1]);
				}
			}
			// alert()
			swapArray = [];
			indexArray = [];
		}
		console.log(gameField);

		drawPole();
		// ctx.clearRect(0,0,width,height);
		// drawBoard(ctx,width,height);
		// drawContext(ctx,gameField);
		// ctx.lineWidth = 1;
		// ctx.strokeRect(0,0,200,200);

		if (swapArray.length === 1) drawCheckedElem(checkElem, ctx);
	};
	canvas.addEventListener('click', handleFunc);
})();

// const ppp = ()=>{
// 	return 5>3?
// 			3>1? "double true" :
// 				 "double lie"
// 			: "lol"
// }