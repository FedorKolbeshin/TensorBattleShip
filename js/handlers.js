/**
 * Created by fReDDy on 07.06.2016.
 */
var goodShoot=null,
    shipDestroyed=false,
    direction;
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded",function(){
        document.getElementById("accept").addEventListener("click",function(){
            generate();
            document.getElementById("ComputerField").innerHTML="Компьютер";
            document.getElementById("UserField").innerHTML=document.getElementById("playerName").value;
            document.getElementById("0").style.display="none";
            document.getElementById("1").style.display="none";
        });
        document.getElementById("start").addEventListener("click",function() {
            document.getElementById("status").innerHTML="<h2 style='font-style:italic;'>Ваш ход!</h2>";
            this.disabled=true;
            for (var i = 0; i < 100; i++) {
                var div = document.createElement('div');
                div.className = "cell";
                div.classList.add(i);
                availablePositions[i] = i;
                if (div.addEventListener) {
                    div.addEventListener("click", function () {
                        cellClickHandle(this);
                    });
                }
                document.getElementById("field").appendChild(div);
            }
        });


        function cellClickHandle(event){
            //делаем ход
            Move(compships,event);

            //если мы не попали, красим серым
            if (event.style.backgroundColor != "black") event.style.backgroundColor = "gray";

            /*
            если комп не попал по кораблю мы задаем рандомно координату из списка доступных
            и делаем соответствующий ход.
             */
            if (goodShoot === null)
            {
                var randomCoord=availablePositions.randomElement();
                availablePositions.splice(availablePositions.indexOf(randomCoord),1);
                Move(ships,document.getElementById(randomCoord));
                /*
                В итоге если мы не попали, то снова красим серым, иначе красим красным.
                Проверяем на то, уничтожили ли мы корабль или ранили, в первом случае мы обнуляем
                координату удачного попадания, чтобы снова стала рандомно выбираться, и ставим направление
                стрельбы компютера по умолчанию
                 */
                if (document.getElementById(randomCoord).style.backgroundColor != "black")
                    document.getElementById(randomCoord).style.backgroundColor = "green";
                else {
                    document.getElementById(randomCoord).style.backgroundColor = "red";
                    if (shipDestroyed)
                    {
                        goodShoot=null;
                        shipDestroyed=false;
                        direction=1;
                        return;
                    }
                    else {
                        goodShoot = randomCoord;
                        //чтобы не переходил на новую строчку, меняем направление на противоположное
                        if (goodShoot % 10 !=9) direction = 1;
                        else direction=-1;
                    }
                }
            }

            /*
            В противном случае мы будем ходить по ячейкам по такой схеме: вправо пока не упремся в стену, либо
            не окажется пустой ячейки. После идет влево по такому же принципу. Потом уже вверх, и в самом конце вниз.
            И так пока мы не уничтожим корабль
             */
            else {
                availablePositions.splice(availablePositions.indexOf(goodShoot+direction),1);
                Move(ships,document.getElementById(goodShoot+direction));
                if (document.getElementById(goodShoot+direction).style.backgroundColor != "black") {
                    document.getElementById(goodShoot + direction).style.backgroundColor = "green";
                    if (direction <10 && direction>0 && goodShoot % 10 != 0)
                    {
                        direction=-1;
                    }
                    else {
                        if (direction>=10)
                        {
                            direction=-10;
                        }
                        else
                        {
                            direction=10;
                        }
                    }
                }
                else {
                    document.getElementById(goodShoot + direction).style.backgroundColor = "red";
                    if (shipDestroyed)
                    {
                        goodShoot=null;
                        shipDestroyed=false;
                        direction=1;
                        document.getElementById("status").innerHTML="<h2 style='font-style:italic;'>Ходит игрок!</h2>";
                        return;
                    }
                    if ((goodShoot+direction) % 10 == 9)
                    {
                        direction=-1;
                        return;
                    }
                    if ((goodShoot+direction) % 10 == 0)
                    {
                        direction=10;
                        return;
                    }
                    if (Math.abs(direction) <10)
                    {
                        if (direction <0) direction--;
                        else direction++;
                    }
                    else
                    {
                        if (direction<0) direction-=10;
                        direction+=10;
                    }
                }

            }
        }

        /*
        Мы проходим по каждому кораблю из коллекции и смотрим, если
        в нем есть координата, равная координате, по которой мы (или компьютер)
        стреляем, значит мы показываем игроку что он попал и удаляем из обьекта
        корабль соответствующую координату. В самом конце вызываем проверку на то,
        есть ли в списке корабль без координат и соответственно удаляем его если
        найден
         */
        function Move (currentships,event){
            if (event == null) return;
            var position,moverType;
            for (var i = 0; i < currentships.length; i++) {
                if (event.classList[1] === undefined) {
                    moverType = "computer";
                    position = event.id;
                }
                else {
                    moverType = "human";
                    position = event.classList[1];
                }
                switch (currentships[i].type) {
                    case "4th":
                    {

                        if (currentships[i].first == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].first;
                        }
                        if (currentships[i].second == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].second;
                        }
                        if (currentships[i].third == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].third;
                        }
                        if (currentships[i].fourth == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].fourth;
                        }
                        break;
                    }
                    case "3rd":
                    {
                        if (currentships[i].first == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].first;
                        }
                        if (currentships[i].second == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].second;
                        }
                        if (currentships[i].third == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].third;
                        }
                        break;
                    }
                    case "2nd":
                    {
                        if (currentships[i].first == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].first;
                        }
                        if (currentships[i].second == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].second;
                        }
                        break;
                    }
                    case "1st":
                    {
                        if (currentships[i].first == position) {
                            event.style.backgroundColor = "black";
                            delete currentships[i].first;
                        }
                        break;
                    }
                }
                checkForCoordinantNull(currentships, currentships[i].type, i, moverType);
            }
        }

        /*
        Данная функция проверяет для каждого типа корабля, удалены ли все его координаты. и если
        удалены, тогда из списка кораблей соответствующего игрока удаляет данный корабль и сообщает
        об этом
         */
        function checkForCoordinantNull(currentShips,type,i,moverType){
            switch (type)
            {
                case "4th":
                {
                    if (currentShips[i].first === undefined &&
                        currentShips[i].second === undefined &&
                        currentShips[i].third === undefined &&
                        currentShips[i].fourth === undefined)
                    {
                        currentShips.splice(i,1);
                        if (moverType == "computer") shipDestroyed=true;
                    }
                    break;
                }
                case "3rd":
                {
                    if (currentShips[i].first === undefined &&
                        currentShips[i].second === undefined &&
                        currentShips[i].third === undefined)
                    {
                        currentShips.splice(i,1);
                        if (moverType == "computer") shipDestroyed=true;
                    }
                    break;
                }
                case "2nd":
                {
                    if (currentShips[i].first === undefined &&
                        currentShips[i].second === undefined)
                    {
                        currentShips.splice(i,1);
                        if (moverType == "computer") shipDestroyed=true;
                    }
                    break;
                }
                case "1st":
                {
                    if (currentShips[i].first === undefined)
                    {
                        currentShips.splice(i,1);
                        if (moverType == "computer") shipDestroyed=true;
                    }
                    break;
                }
            }
            if (currentShips.length == 0)
            {
                if (moverType == "computer")
                {
                    document.getElementById("status").innerHTML="<h2 style='font-style:italic;color:red;'>Игра завершена! Вы проиграли!</h2>";
                }
                else document.getElementById("status").innerHTML="<h2 style='font-style:italic;color:green;'>Игра завершена! Вы победили!</h2>";
            }
        }

    });
}

