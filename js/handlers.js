/**
 * Created by fReDDy on 07.06.2016.
 */
if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded",function(){
        document.getElementById("start").addEventListener("click",function(){
            var obj=new ship("4th");
            ComputerConstruct(obj);
            var obj=new ship("3rd");
            ComputerConstruct(obj);
            var obj=new ship("3rd");
            ComputerConstruct(obj);
            var obj=new ship("2nd");
            ComputerConstruct(obj);
            var obj=new ship("2nd");
            ComputerConstruct(obj);
            var obj=new ship("2nd");
            ComputerConstruct(obj);
            var obj=new ship("1st");
            ComputerConstruct(obj);
            var obj=new ship("1st");
            ComputerConstruct(obj);
            var obj=new ship("1st");
            ComputerConstruct(obj);
            var obj=new ship("1st");
            ComputerConstruct(obj);
        });
    });
}
else {function init() {
        document.getElementById("start").attachEvent("onclick", function () {
            console.log(document.getElementById("1st").disabled + "бугага");
            if (ships.length == 10) {
                alert("aga!");
            }
        });
}}
