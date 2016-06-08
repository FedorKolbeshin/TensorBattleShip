/**
 * Created by fReDDy on 04.06.2016.
 */
Array.prototype.randomElement = function () {
    return this[Math.floor(Math.random() * this.length)]
};
    var shipAdding=false;
var availablePositions=[];
var ships=[];
var compships=[];
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

function generate(){
    for (var i=0;i<100;i++) {
        var div = document.createElement('div');
        div.className="lol";
        div.style.backgroundColor = "deepskyblue";
        div.style.float = "left";
        div.style.width = "50px";
        div.style.height = "50px";
        div.style.border = "2px solid red";
        div.id =i;
        availablePositions[i]=i;
        if (div.addEventListener) {
            div.addEventListener("click", function () {
                if (availablePositions.indexOf(+this.id) == -1) return;
                var succeded = obj.setCoord(this.id,10);
                console.log(obj.min+" "+obj.max);
                if (succeded == true) {
                    this.style.backgroundColor = "black";
                }
                else if (succeded == false) {
                    shipAdding=false;
                    ships.push(obj);
                    if (+checkShipType(obj.type) < +getTypeShipCount(obj.type))
                    {
                        document.querySelectorAll("button.ship[id='"+obj.type+"']")[0].removeAttribute("disabled");
                    }
                    obj=null;
                }
            });
        }
        else div.attachEvent("onclick",function(event){
            if (availablePositions.indexOf(+event.srcElement.id) == -1) return;
            var succeded = obj.setCoord(event.srcElement.id,10);
            if (succeded == true) {
                event.srcElement.style.backgroundColor = "black";
            }
            else if (succeded == false) {
                shipAdding=false;
                ships.push(obj);
                var count=checkShipType(obj.type);
                console.log("мы тут");
                console.log(count);
                if (+checkShipType(obj.type) < +getTypeShipCount(obj.type))
                {
                    document.querySelectorAll("button.ship[id='"+obj.type+"']")[0].removeAttribute("disabled");
                }
                obj=null;
            }
        });
        //document.getElementById("playerLayout").appendChild(div);
        document.getElementById("compLayout").appendChild(div);
    }

    function getTypeShipCount (type){
        switch (type)
        {
            case "4th":
            {
                return 1;
                break;
            }
            case "3rd":
            {
                return 2;
                break;
            }
            case "2nd":
            {
                return 3;
                break;
            }
            case "1st":
            {
                return 4;
                break;
            }
        }

    }
}
function ComputerConstruct(obj) {
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
        compships.push(obj);
    }
}
function buildShip (getRandomCoord,direction,obj)
{
    var cursor=+getRandomCoord+direction;
    while (availablePositions.indexOf(cursor) != -1 && cursor % 10 != 0)
    {
        var succeded=obj.setCoord(cursor,10);
        if (succeded) {
            document.getElementById(cursor).style.backgroundColor="black";
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
            document.getElementById(cursor).style.backgroundColor="black";
            cursor-=direction;
            cellsRemaining--;
        }
    }
}
