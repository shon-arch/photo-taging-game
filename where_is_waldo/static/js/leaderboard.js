

async function generateRow(value){
    response = await fetch('/leaderboard_level?level=' + value)
    user_data = await response.json()
    generate(user_data)
}

function generate(user_data){
    const table_body = document.getElementById("user-data"); 
    table_body.innerHTML=''; 
    for(var i =0;i<user_data.length ; ++i){
        table_body.appendChild(createRow(user_data[i],i+1)); 
    }
}

function createRow(element, item_no){
    var outer_row = document.createElement("tr"); 
    serial_no = document.createElement("td")
    serial_no.textContent = item_no
    outer_row.appendChild(serial_no)
    for(var i = 0 ;i<element.length ; ++i){
        var inner_row = document.createElement("td")
        if(i!=1)
        inner_row.textContent = element[i]
        else {
            var minutes = Math.floor(element[i]/(1000*60)); 
            element[i]-=(minutes*1000*60); 
            var seconds = Math.floor(element[i]/(1000)); 
            inner_row.textContent = minutes + ":" + seconds; 
        }
        outer_row.appendChild(inner_row)
    }
    return outer_row; 
}