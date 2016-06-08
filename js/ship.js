/**
 * Created by fReDDy on 07.06.2016.
 */
function ship(type){
    this.type=type;
}

ship.prototype.setCoord= function(coord,lineLength) {
    console.log("этап "+1);
    if (this.min != null) {
        console.log("этап "+2);
        var top=Math.abs(+coord - this.max) % lineLength == 0 && Math.abs(+coord - this.min) % lineLength == 0
            && Math.abs(+coord - this.min) <= (+this.type.slice(0,1)-1) * lineLength
            && Math.abs(+coord - this.max) <= (+this.type.slice(0,1)-1) * lineLength;
        if (Math.abs(+coord - this.min) <= +this.type.slice(0,1)-1
            && Math.abs(+coord - this.max) <= +this.type.slice(0,1)-1
                && Math.floor(+this.min/10) == Math.floor(+coord/10)
            || top) {
            console.log("этап "+3);
            if (this.first!=null && this.second!=null && this.third!=null && this.fourth!=null) {
                clearBorders(this.first,lineLength);
                clearBorders(this.second,lineLength);
                clearBorders(this.third,lineLength);
                clearBorders(this.fourth,lineLength);
                return false;
            }
            if (this.first!=null && this.second!=null && this.third!=null) {
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
            else if (this.first!=null && this.second!=null) {
                if (this.type == "2nd") {
                    clearBorders(this.first,lineLength);
                    clearBorders(this.second,lineLength);
                    return false;
                }
                this.setMinMax(coord);
                if (this.first!=coord && this.second != coord) this.third = coord;
                return true;
            }
            else if (this.first != null) {
                console.log("этап "+4);
                if (this.type == "1st") {
                    console.log("этап "+5);
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
    var checkResult=this.checkForPositionAvailability(coord,lineLength);
    if (checkResult) {
        this.first = coord;
        this.min = coord;
        this.max = coord;
        return true;
    }
    return "сюда нельзя!";
};
ship.prototype.checkForPositionAvailability= function (currentPosition,lineLength){
    if (this.checkCurrentDirect(currentPosition,lineLength) || this.checkCurrentDirect(currentPosition,1)) {
        return true;
    } else return false;
};
ship.prototype.checkCurrentDirect=function (currentPosition,direction){
    var counter=0;

    for (var i=1;i<+this.type.slice(0,1);i++)
    {
        if (direction == 1 && (+currentPosition+direction*i) % 10 == 0)
        {
            break;
        }
        if (availablePositions.indexOf(+currentPosition+direction*i) != -1)
            counter++;
        else break;
    }

    for (var i=1;i<+this.type.slice(0,1);i++)
    {
        if (direction == 1 && (currentPosition-direction*i) % 10 == 9)
        {
            break;
        }
        if (availablePositions.indexOf(currentPosition-direction*i) != -1)
            counter++;
        else break;
    }
    if (counter<+this.type.slice(0,1)-1)
    {
        return false;
    }
    else return true;
};
ship.prototype.setMinMax = function(coord)
{
    if (this.min>coord) this.min=coord;
    if (this.max<coord) this.max=coord;
};
function clearBorders(coord,lineLength){
    if ((+coord+1) % lineLength !=0 )
    {
        removeFromSots(document.getElementById(+coord+1),availablePositions.indexOf(+coord+1));
        removeFromSots(document.getElementById(coord-lineLength+1),availablePositions.indexOf(coord-lineLength+1));
        removeFromSots(document.getElementById(+coord+lineLength+1),availablePositions.indexOf(+coord+lineLength+1));
    }
    console.log((-1) % lineLength);
    if ((+coord-1) % lineLength != lineLength-1 && +coord!=0)
    {
        removeFromSots(document.getElementById(coord-1),availablePositions.indexOf(+coord-1));
        removeFromSots(document.getElementById(coord-lineLength-1),availablePositions.indexOf(coord-lineLength-1));
        removeFromSots(document.getElementById(+coord+lineLength-1),availablePositions.indexOf(+coord+lineLength-1));
    }
    removeFromSots(document.getElementById(+coord+lineLength),availablePositions.indexOf(+coord+lineLength));
    removeFromSots(document.getElementById(+coord-lineLength),availablePositions.indexOf(+coord-lineLength));
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
