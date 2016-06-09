/**
 * Created by fReDDy on 07.06.2016.
 */

/*обьект корабль, который будет хранить в себе тип
и координаты в зависимости от его типа*/
function ship(type){
    this.type=type;
}

//данный метод будет задавать координаты для обьекта, чистить границы вокруг корабля если он достроен
ship.prototype.setCoord= function(coord,lineLength) {

    if (this.min!=null) {
        /*проверка, в одну ли линию расположены координаты корабля и координата, по которой мы хотим
        достроить корабль*/
        var top=Math.abs(+coord - this.max) % lineLength == 0 && Math.abs(+coord - this.min) % lineLength == 0
            && Math.abs(+coord - this.min) <= (+this.type.slice(0,1)-1) * lineLength
            && Math.abs(+coord - this.max) <= (+this.type.slice(0,1)-1) * lineLength;
        if (Math.abs(+coord - this.min) <= +this.type.slice(0,1)-1
            && Math.abs(+coord - this.max) <= +this.type.slice(0,1)-1
                && Math.floor(+this.min/10) == Math.floor(+coord/10)
            || top) {

            //если достроили 4-х палубник, чистим границы и на выходе сообщаем что корабль достроен
            if (this.first!=null && this.second!=null && this.third!=null && this.fourth!=null) {
                clearBorders(this.first,lineLength);
                clearBorders(this.second,lineLength);
                clearBorders(this.third,lineLength);
                clearBorders(this.fourth,lineLength);
                return false;
            }

            //если достроили 3-х палубник, чистим границы и на выходе сообщаем что корабль достроен
            if (this.first!=null && this.second!=null && this.third!=null) {
                if (this.type == "3rd") {
                    clearBorders(this.first,lineLength);
                    clearBorders(this.second,lineLength);
                    clearBorders(this.third,lineLength);
                    return false;
                }
                this.setMinMax(coord);
                if (this.first!=coord && this.second != coord && this.third != coord) this.fourth = coord;
                return true;
            }

            //если достроили 2-х палубник, чистим границы и на выходе сообщаем что корабль достроен
            if (this.first!=null && this.second!=null) {
                if (this.type == "2nd") {
                    clearBorders(this.first,lineLength);
                    clearBorders(this.second,lineLength);
                    return false;
                }
                this.setMinMax(coord);
                if (this.first!=coord && this.second != coord) this.third = coord;
                    return true;
            }

            //если построили однопалубник, также чистим границы
            else if (this.first != null) {
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

//проверка на доступность места вставки: если доступных ячеек в данной области меньше,
//чем размер корабля, то мы не даем строить корабль на данной позиции
ship.prototype.checkForPositionAvailability= function (currentPosition,lineLength){
    if (this.checkCurrentDirect(currentPosition,lineLength) || this.checkCurrentDirect(currentPosition,1)) {
        return true;
    } else return false;
};

/*проверяем направление для строительства корабля на нужное количество ячеек:
если от первой ячейки корабля сумма ячеек сверху(слева) и снизу(справа)
удовлетворяет размерам корабля, то все хорошо*/
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

/*данная функция необходима для проверки на то, являются ли все ячейки на одном уровне,
а также не превышает ли вставляемая координата длину всего корабля*/
ship.prototype.setMinMax = function(coord)
{
    if (this.min>coord) this.min=coord;
    if (this.max<coord) this.max=coord;
};

/*
Функция, которая чистит границы вокруг конкретной ячейки
 */
function clearBorders(coord,lineLength){
    if ((+coord+1) % lineLength !=0 )
    {
        removeFromSots(document.getElementById(+coord+1),availablePositions.indexOf(+coord+1));
        removeFromSots(document.getElementById(coord-lineLength+1),availablePositions.indexOf(coord-lineLength+1));
        removeFromSots(document.getElementById(+coord+lineLength+1),availablePositions.indexOf(+coord+lineLength+1));
    }

    if ((+coord-1) % lineLength != lineLength-1 && +coord!=0)
    {
        removeFromSots(document.getElementById(coord-1),availablePositions.indexOf(+coord-1));
        removeFromSots(document.getElementById(coord-lineLength-1),availablePositions.indexOf(coord-lineLength-1));
        removeFromSots(document.getElementById(+coord+lineLength-1),availablePositions.indexOf(+coord+lineLength-1));
    }
    removeFromSots(document.getElementById(+coord+lineLength),availablePositions.indexOf(+coord+lineLength));
    removeFromSots(document.getElementById(+coord-lineLength),availablePositions.indexOf(+coord-lineLength));
}

//удаляет ячейку из списка доступных для заполнения и красит границу ячейки в серый цвет
function removeFromSots(div,index){
    if (index!=-1)
        availablePositions.splice(index,1);
    if (!div) return;
    if (div.style.backgroundColor != "black")
    {
        div.style.backgroundColor="gray";
    }

}
