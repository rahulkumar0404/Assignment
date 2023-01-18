var elements = [];

window.onload = function(){
    if(JSON.parse(localStorage.getItem("todo-elements")) != null){
        elements = JSON.parse(localStorage.getItem("todo-elements"));
        console.log(elements);
        display();
    }
   
    
}

function addElement () {
    if(document.querySelector(".addtext").value.trim() != ""){
       elements.push(document.querySelector(".addtext").value.trim()) ;
       if(localStorage.getItem("todo-elements") == null){
        localStorage.setItem("todo-elements", JSON.stringify(elements));
       }
       else{
        localStorage.setItem("todo-elements", JSON.stringify(elements));
       }
       display();
    }  
    document.querySelector(".addtext") = ""
}

function display (){
    document.querySelector(".list").innerHTML = "";
    for(var i=0; i<elements.length; i++){
        document.querySelector(".list").innerHTML +=
      "<center><div class='element'>" +
      elements[i] +
      "<img class = 'tick' src = '../Todos/resources/check.jpg' onclick='strike(" +
      i +
      ")'><img class= 'trash' src = '../Todos/resources/delete.png' onclick='del(" +
      i +
      ")'></div></center>";
    }
}

function del (index){
    elements.splice(index,1);
    if(localStorage.getItem("todo-elements") == null){
        localStorage.setItem("todo-elements", JSON.stringify(elements));
    }
    else{
    localStorage.setItem("todo-elements", JSON.stringify(elements));
    }
    display();
}

function strike(index) {
    if(elements[index].includes("<strike>")){
        elements[index] = elements[index].replace("<strike>","");
        elements[index] = elements[index].replace("</strike>","");
    }
    else{
        elements[index] = "<strike>"+ elements[index] + "</strike>";
    }
    if(localStorage.getItem("todo-elements") == null){
        localStorage.setItem("todo-elements", JSON.stringify(elements));
    }
    else{
        localStorage.setItem("todo-elements", JSON.stringify(elements));
    }
    display();
}