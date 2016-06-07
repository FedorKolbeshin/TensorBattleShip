/**
 * Created by fReDDy on 07.06.2016.
 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded",function(){
        document.getElementById("start").addEventListener("click",function(){
            console.log(document.getElementById("1st").disabled);
            if (ships.length == 10)
            {
                alert("aga!");
            }
        });
    });
}
function init() {
        document.getElementById("start").attachEvent("onclick", function () {
            console.log(document.getElementById("1st").disabled + "бугага");
            if (ships.length == 10) {
                alert("aga!");
            }
        });
}
