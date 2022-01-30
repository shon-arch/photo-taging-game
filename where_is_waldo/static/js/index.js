const game_image = document.getElementsByClassName("root-div")[0]

characters = new Set()
all_char = []

user_data = {
    'startTime' : null, 
    'endTime': null,
    'level' : null
}

async function submitScore(){

    const data = {
        'username' : document.getElementById("user-name").value,
        'time' : user_data['endTime'] - user_data['startTime'], 
        'level' : user_data['level']
    }
    var head = { "Content-Type" : "application/json" };
    const options = {
        method: 'POST', 
        body: JSON.stringify(data), 
        headers : head
    }
    await fetch('/post_user', options)
    window.location.href = '/leaderboard'
}

function populate(characters_list, lvl){
    user_data.startTime = new Date().getTime(); 
    user_data.level = lvl; 
    characters_list.forEach(element => {
        characters.add(element['name']); 
        all_char.push(element['name']); 

        img = document.createElement("img")
        img.classList.add("nav-image")
        img.classList.add(element['name'])
        img.src = "/static/images/" + element['name'] + ".png"
        document.getElementById("images").appendChild(img)
    })
}

function startGame(){

    game_image.style.display = "block"
    document.getElementById("nav").style.display = "flex"
    document.getElementById("modal").style.display = "none"

}



async function verify_answer(name, x_pos, y_pos){
    const existing_drop_down = game_image.getElementsByClassName("drop-down")
    game_image.removeChild(existing_drop_down[0]); 
    response = await fetch('/verify/'+name+'?'+'x_coordinate=' + String(x_pos) +'&y_coordinate=' + String(y_pos));
    result = await response.json()
    message='Try again'
    success = false; 
    if(result['Message'] == 'success'){
            message = 'Yay! You found ' + name; 
            success= true; 
           document.getElementsByClassName(name)[0].classList.add("disabled")
           characters.delete(name)
    }
    await show_pop_up(message, success); 
    if(characters.size == 0){
        game_image.style.display = "none"
        document.getElementById("nav").style.display = "none"
        document.getElementById("user-modal").style.display = "block"
    }
}

function show_pop_up(message, success){
    const span = document.getElementById("status")
    span.textContent = message; 
    if(success)span.style.backgroundColor = "green"; 
    else span.style.backgroundColor = "red"; 
    span.style.marginTop = document.getElementById("nav").style.height; 
    setTimeout(function(){
        span.innerHTML=''; 
    },1500)

}

function generate_drop_down(event){
    const drop_down = document.createElement("ul")
    drop_down.classList.add("drop-down")

    let x_pos = event.layerX
    let y_pos = event.layerY

    let x_ratio = x_pos/event.target.width
    let y_ratio = (y_pos-140)/event.target.height

    for(let item of characters){
        option = document.createElement("li")
        option.innerText=item
        option.addEventListener("click", function(event) {
            user_data.endTime = new Date().getTime();  
            verify_answer(event.target.innerText,x_ratio,y_ratio)
        })
        drop_down.appendChild(option)

    }

    drop_down.style.left = x_pos + "px"; 
    drop_down.style.top = y_pos + "px";

    return drop_down
}


game_image.addEventListener("click", function (event){
        if(event.target != document.getElementById("game_image"))return 
        const existing_drop_down = game_image.getElementsByClassName("drop-down")
        if(existing_drop_down.length !=0){
            game_image.removeChild(existing_drop_down[0]); 
        }
        game_image.appendChild(generate_drop_down(event)); 

})

