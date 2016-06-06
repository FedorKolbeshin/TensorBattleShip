/**
 * Created by fReDDy on 04.06.2016.
 */
var availablePositions=[];
var ships=[];
function ship(type){
    this.type=type;
}
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
ship.prototype.setCoord= function(coord,lineLength) {
    if (this.min) {
        var top=Math.abs(+coord - this.max) % lineLength == 0 && Math.abs(+coord - this.min) % lineLength == 0
            && Math.abs(+coord - this.min) <= (+this.type.slice(0,1)-1) * lineLength
            && Math.abs(+coord - this.max) <= (+this.type.slice(0,1)-1) * lineLength;
        if (Math.abs(+coord - this.min) <= +this.type.slice(0,1)-1 && Math.abs(+coord - this.max) <= +this.type.slice(0,1)-1
            || top) {
            if (this.first && this.second && this.third && this.fourth) {
                clearBorders(this.first,lineLength);
                clearBorders(this.second,lineLength);
                clearBorders(this.third,lineLength);
                clearBorders(this.fourth,lineLength);
                return false;
            }
            if (this.first && this.second && this.third) {
                if (this.type == "3rd") {
                    clearBorders(this.first,lineLength);
                    clearBorders(this.second,lineLength);
                    clearBorders(this.third,lineLength);
                    console.dir(this);
                    return false;
                }
                this.setMinMax(coord);
                if (this.first!=coord && this.second != coord && this.third != coord) this.fourth = coord;
                return true;
            }
            else if (this.first && this.second) {
                if (this.type == "2nd") {
                    clearBorders(this.first,lineLength);
                    clearBorders(this.second,lineLength);
                    return false;
                }
                this.setMinMax(coord);
                if (this.first!=coord && this.second != coord) this.third = coord;
                return true;
            }
            else if (this.first) {
                if (this.type == "1st") {
                    clearBorders(this.first,lineLength);
                    removeFromSots(document.getElementById(+coord),availablePositions.indexOf(+coord));
                    return false;
                }
                this.setMinMax(coord);
                if (coord!=this.first) this.second = coord;
                return true;
            }
        }
        console.log("иди лесом");
        return "повтор";
    }
    this.first = coord;
    this.min = coord;
    this.max = coord;
    return true;
};
function clearBorders(coord,lineLength){
    if ((+coord+1) % lineLength !=0 ) removeFromSots(document.getElementById(+coord+1),availablePositions.indexOf(+coord+1));
    if ((+coord-1) % lineLength !=lineLength-1 ) removeFromSots(document.getElementById(+coord-1),availablePositions.indexOf(+coord-1));
    removeFromSots(document.getElementById(+coord+7),availablePositions.indexOf(+coord+7));
    removeFromSots(document.getElementById(+coord-7),availablePositions.indexOf(+coord-7));
}
function removeFromSots(div,index){
    if (index!=-1)
        availablePositions.splice(index,1);
    if (!div) return;
    if (div.style.backgroundColor != "black")
    {
        div.style.backgroundColor="gray";
    }

}
ship.prototype.setMinMax = function(coord)
{
    if (this.min>coord) this.min=coord;
    if (this.max<coord) this.max=coord;
};

function generate(){
    alert("opa!!!");
    for (var i=0;i<49;i++) {
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
                var succeded = obj.setCoord(this.id,7);
                console.log(obj.min+" "+obj.max);
                if (succeded == true) {
                    this.style.backgroundColor = "black";
                }
                else if (succeded == false) {
                    ships.push(obj);
                    if (+checkShipType(obj.type) < +getTypeShipCount(obj.type))
                    {
                        document.querySelectorAll("button.ship[id='"+obj.type+"']")[0].removeAttribute("disabled");
                    }
                    obj=null;
                }
            });
        }
        // if (difference<=3 || difference>3 && max-coord%linelenth==0 && min-coord%linelength==0)
        else div.attachEvent("onclick",function(event){
            if (availablePositions.indexOf(+event.srcElement.id) == -1) return;
            console.log(availablePositions.indexOf(+event.srcElement.id));
            console.log(obj.min+" "+obj.max);
            var succeded = obj.setCoord(event.srcElement.id,7);
            if (succeded == true) {
                event.srcElement.style.backgroundColor = "black";
            }
            else if (succeded == false) {
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
        document.getElementById("playerLayout").appendChild(div);
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
