/**
 * Created by fReDDy on 04.06.2016.
 */
//создаем свою функцию для массива для выбора случайного элемента
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};
var
    obj,
    shipAdding=false,
    availablePositions=[],
    ships=[],
    compships=[];

//определяем функцию indexOf, если она не поддерживается браузером изначально
if (!('indexOf' in Array.prototype)) {
    Array.prototype.indexOf= function(find, i /*opt*/) {
        if (i===undefined) i= 0;
        if (i<0) i+= this.length;
        if (i<0) i= 0;
        for (var n= this.length; i<n; i++)
            if (i in this && this[i]===find)
                return i;
        return -1;
    };
}

//генерируем первоначальное поле
function generate(){
    for (var i=0;i<100;i++) {
        var div = document.createElement('div');
        div.className="cell";
        div.id =i;
        availablePositions[i]=i;
        document.getElementById("playerLayout").appendChild(div);
    }
    generateShips(compships);
    availablePositions=[];
    for (var i=0;i<document.getElementById("playerLayout").children.length;i++)
    {
        availablePositions[i]=i;
        document.getElementById(i).style.backgroundColor="deepskyblue";
    }
    generateShips(ships);

}

//функция, которая генерирует корабли
function generateShips (currentShipMassive){
    obj=new ship("4th");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("3rd");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("3rd");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("2nd");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("2nd");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("2nd");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("1st");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("1st");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("1st");
    ComputerConstruct(obj,currentShipMassive);
    obj=new ship("1st");
    ComputerConstruct(obj,currentShipMassive);
}

/*
Функция, которая строит корабль в соответствии с указанным типом и
указанной коллекции кораблей(игрок или компьютер)
 */
function ComputerConstruct(obj,shipMassive) {
    var getRandomCoord=availablePositions.randomElement();
    var succeded = obj.setCoord(getRandomCoord,10);
    document.getElementById(getRandomCoord).style.backgroundColor="black";
    if (succeded == true) {
        if (obj.type.slice(0,1) != 1) {
            if (obj.checkCurrentDirect(getRandomCoord, 1))
                buildShip(getRandomCoord, 1, obj);
                else buildShip(getRandomCoord,10,obj);
        }
        obj.setCoord(getRandomCoord,10);
        shipMassive.push(obj);
    }
}

/*
функция, которая, отталкиваясь от указанной координаты, строит корабль вверх или вниз
или влево или вправо в зависимости от направления
 */
function buildShip (getRandomCoord,direction,obj)
{
    var cursor=+getRandomCoord+direction;
    while (availablePositions.indexOf(cursor) != -1 && cursor % 10 != 0)
    {
        var succeded=obj.setCoord(cursor,10);
        if (succeded) {
            document.getElementById(cursor).style.backgroundColor = "black";
            cursor+=direction;
        }
        console.log((cursor-getRandomCoord)/direction);
        if ((cursor-getRandomCoord)/direction > obj.type.slice(0,1)-1) return;
    }
    var cellsRemaining=(obj.type.slice(0,1))-(cursor-getRandomCoord)/direction;
    var cursor=getRandomCoord-direction;
    while (cellsRemaining != 0)
    {
        var succeded=obj.setCoord(cursor,10);
        if (succeded)
        {
            document.getElementById(cursor).style.backgroundColor = "black";
            cursor-=direction;
            cellsRemaining--;
        }
    }
}
