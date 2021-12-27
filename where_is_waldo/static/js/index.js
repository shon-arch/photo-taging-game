const game_image = document.getElementsByClassName("root-div")[0]

characters = new Set()
characters.add("c1")
characters.add("c2")
characters.add("c3")

function verify_answer(event){
    const existing_drop_down = game_image.getElementsByClassName("drop-down")
    game_image.removeChild(existing_drop_down[0]); 
    fetch('/verify?'+event.target.innerText).then(function(response){
        if(response){
           characters.delete(event.target.innerText)
        }
    })
}

function generate_drop_down(event){
    const drop_down = document.createElement("ul")
    drop_down.classList.add("drop-down")

    for(let item of characters){
        option = document.createElement("li")
        option.innerText=item
        option.addEventListener("click", verify_answer)
        drop_down.appendChild(option)

    }

    drop_down.style.left = event.layerX + "px"; 
    drop_down.style.top = event.layerY + "px";

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

