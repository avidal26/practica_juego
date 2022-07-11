var context, canvas
var primeraCarta= true
var cartaPrimera, cartaSegunda
var colorDelante= "yellow"
var colorCanvas= "pink"
var colorAtras="pink"
var inicioX= 45
var inicioY= 50
var cartaMargen= 30
var cartaLon= 30
var cartaAncho= cartaLon * 4
var cartaLargo= cartaLon * 4
var cartas_array= new Array()
var igual=false
function Carta(x, y, ancho, largo, info){
	this.x=x
	this.y=y
	this.ancho=ancho
	this.largo=largo
	this.dibuja=dibujaCarta
	this.info= info
}
function dibujaCarta(){
	context.fillStyle= colorAtras
	context.fillRect ( this.x, this.y, this.ancho, this.largo)
}
function tablero(){
	var i
	var carta
	var x= inicioX
	var y= inicioY
	for(i=0;i<6;i++){
		//-- Primera fila de cartas--//
		carta=new Carta (x,y,cartaAncho,cartaLargo,i)
		cartas_array.push(carta)
		carta.dibuja()
		//-- Segunda fila de cartas--//
		carta= new Carta(x, y+ cartaAncho+ cartaMargen, cartaAncho, cartaLargo, i)
		cartas_array.push(carta)
		carta.dibuja()
		//-- Aumnetamos e valoor de x--//
		x += cartaAncho+cartaMargen
	}
}
function barajear(){
	var i,j,k
	var temporal
	var lon = cartas_array.length
	for(j=0; j<lon*3;j++){
		i= Math.floor(Math.random()* lon)
		k= Math.floor(Math.random()* lon)
		temporal= cartas_array[i].info
		cartas_array[i].info= cartas_array[k]
		cartas_array[k].info= temporal
	}
}
function ajusta(xx, yy){
	var posCanvas= canvas.getBoundingClientRect()
	var x= xx-posCanvas.left
	var y= yy-posCanvas.top
	return{x:x,y:y}
}
function selecciona(e){
var pos= ajusta(e.clientX, e.clientY)
//alert(pos.x+","+pos.y)
for(var i=0;i<cartas_array.length;i++){
	var carta= cartas_array[i]
	if(carta.x>0){
		if((pos.x>carta.x) &&(pos.x<carta.x+carta.ancho)&&(pos.y>carta.y)&&(pos.y<carta.y+carta.largo)){
			if((primeraCarta)||(i!=cartaPrimera))break
		}
	}
}
if(i<cartas_array.length){
	if(primeraCarta){
		cartaPrimera=i
		primeraCarta=false
		pinta(carta)
	}
	else{
		cartaSegunda= i
		pinta(carta)
		primeraCarta=true
		if(cartas_array[cartaPrimera].info==cartas_array[cartaSegunda].info){
		igual=true
	} else{
		igual=false
	}
		setTimeout(volteaCarta, 1000)
	}
}
}
function volteaCarta(){
	if(igual==false){
	cartas_array[cartaPrimera].dibuja()
	cartas_array[cartaSegunda].dibuja()
}else{
	context.clearRect(cartas_array[cartaPrimera].x,cartas_array[cartaPrimera].y,cartas_array[cartaPrimera].ancho, cartas_array[cartaPrimera].largo)
	context.clearRect(cartas_array[cartaSegunda].x,cartas_array[cartaSegunda].y,cartas_array[cartaSegunda].ancho, cartas_array[cartaSegunda].largo)
	cartas_array[cartaPrimera].x=-1
	cartas_array[cartaS].x=-1
}
}
function pinta(carta){
	context.fillStyle= colorDelante
	context.fillRect(carta.x,carta.y,carta.ancho,carta.largo)
	context.font="bold 40px comic"
	context.fillStyle="black"
	context.fillText(String(carta.info), carta.x+carta.ancho/2-10,carta.y+carta.largo/2+10)
}
window.onload= function(){
	canvas= document.getElementById ("myCanvas")
	if (canvas&&canvas.getContext){
		context=canvas.getContext("2d")
		if (context){
			canvas.addEventListener("click", selecciona, false)
			barajear()
			tablero()
		}else{
			alert ("ERROR tu navegador no resiste")
		}
	}
}



