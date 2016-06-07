/**
 * Created by fReDDy on 07.06.2016.
 */
function ship(type){
    this.type=type;
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
        if (direction == 1 && (currentPosition-direction*i) % 10 == 6)
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
        removeFromSots(document.getElementById(coord-lineLength+1),availablePositions.indexOf(+coord-lineLength+1));
        console.log(availablePositions.indexOf(+coord-lineLength+1)+"---");
        removeFromSots(document.getElementById(+coord+lineLength+1),availablePositions.indexOf(+coord+lineLength+1));
        console.log(availablePositions.indexOf(+coord+lineLength+1)+"---");
    }
    if ((+coord-1) % lineLength !=lineLength-1 )
    {
        removeFromSots(document.getElementById(coord-1),availablePositions.indexOf(+coord-1));
        removeFromSots(document.getElementById(coord-lineLength-1),availablePositions.indexOf(coord-lineLength-1));
        console.log(availablePositions.indexOf(+coord-lineLength-1)+"---");
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
