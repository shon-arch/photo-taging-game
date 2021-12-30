const game_image = document.getElementsByClassName("root-div")[0]

characters = new Set()
characters.add("Leo")
characters.add("Goku")
characters.add("Mike")

all_char = ["Leo", "Goku", "Mike"]


function startGame(){

    game_image.style.display = "block"
    document.getElementById("nav").style.display = "flex"
    document.getElementById("modal").style.display = "none"

    var countDownDate = new Date().getTime(); 

    var x = setInterval(function(){
    
    var now = new Date().getTime(); 
    var distance = now - countDownDate; 
    
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    document.getElementById("nav-h1").innerText = minutes + "m:" + seconds + "s ";
    
    } ,1000);
}




for(let x in all_char){
    img = document.createElement("img")
    img.classList.add("nav-image")
    img.src = "/static/images/" + all_char[x] + ".png"
    if(!characters.has(all_char[x])){
        img.classList.add("disabled")
    }
    document.getElementById("images").appendChild(img)
}








async function verify_answer(name, x_pos, y_pos){
    const existing_drop_down = game_image.getElementsByClassName("drop-down")
    game_image.removeChild(existing_drop_down[0]); 
    response = await fetch('/verify/'+name+'?'+'x_coordinate=' + String(x_pos) +'&y_coordinate=' + String(y_pos));
    result = await response.json()
    if(result['Message'] == 'success'){
           characters.delete(name)
    }
}

function generate_drop_down(event){
    const drop_down = document.createElement("ul")
    drop_down.classList.add("drop-down")

    let x_pos = event.layerX
    let y_pos = event.layerY

    for(let item of characters){
        option = document.createElement("li")
        option.innerText=item
        option.addEventListener("click", function(event) {verify_answer(event.target.innerText,x_pos,y_pos)})
        drop_down.appendChild(option)

    }

    drop_down.style.left = x_pos + "px"; 
    drop_down.style.top = y_pos + "px";

    return drop_down
}


game_image.addEventListener("click", function (event){
        if(event.target != document.getElementById("game_image"))return
        k=event
        const existing_drop_down = game_image.getElementsByClassName("drop-down")
        if(existing_drop_down.length !=0){
            game_image.removeChild(existing_drop_down[0]); 
        }
        game_image.appendChild(generate_drop_down(event)); 

})

