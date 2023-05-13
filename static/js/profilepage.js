

// html 화면에 사용자 이름을 띄우는 방법. 
// payload_parse는 payloada만 하면 str형태로 가져오는데 이를 object 형태로 가져오기 위함이다.
window.onload = async function () {
    
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)

    const followstate = localStorage.getItem("followstate")
    // const followstate_parse = JSON.parse(followstate)

    const intro = document.getElementById("intro")
    intro.innerText = `${payload_parse.username}`

    let follow = document.getElementById("follow")
    let newdiv = document.createElement("div")
    newdiv.setAttribute("style", "margin:0 30% 0 30%;") 
    
    follow.appendChild(newdiv)

    let token = localStorage.getItem("access")

    const my_respose = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        },
        method:"GET",
    })


    const my_json_response = await my_respose.json()
    console.log(my_json_response)
    console.log(my_json_response.followings)
    console.log(payload_parse.user_id)

    let sameid = null;
    my_json_response.followings.forEach((obj) => {
        if (obj == payload_parse.user_id) {
            sameid = obj;
            console.log(obj);
            return sameid;
        }
    });
    // for (let obj in my_json_response.followings) {
    //     if(obj == payload_parse.user_id){
    //         sameid = obj
    //         console.log(obj)
    //         return sameid
    //     }
    // }

    console.log(sameid)
    if(sameid){
        let unfollowButton = document.createElement("button")
        unfollowButton.setAttribute("class", "nav-link")
        unfollowButton.setAttribute("onclick", "unfollow()")
        unfollowButton.innerText = "unfollow"
        newdiv.appendChild(unfollowButton)
        // const follower = document.getElementById("follower")
        // const newDiv = document.createElement("div")
        // newDiv.innerHTML = payload_parse.username
        // newDiv.setAttribute("id", "followuser")
        // follower.append(newDiv)
    }
    else{
        let followButton = document.createElement("button")
        followButton.setAttribute("class", "nav-link")
        followButton.setAttribute("onclick", "follow()")
        followButton.innerText = "follow"
        newdiv.appendChild(followButton)
    }   
    

    let navbarRight = document.getElementById("navbar-right")
    let newLi = document.createElement("li")
    newLi.setAttribute("class", 'nav-item')

    let logoutBtn = document.createElement("button")
    logoutBtn.setAttribute("class", "nav-link btn")
    logoutBtn.setAttribute("onclick", "handleLogout()")
    logoutBtn.innerText = "Logout"

    newLi.appendChild(logoutBtn)
    navbarRight.appendChild(newLi)

    let loginButton = document.getElementById("login-button")
    loginButton.style.display = "none"


    
}


async function follow(){
    let token = localStorage.getItem("access")
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)

    const response = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/follow/`,{
        method: 'POST',
        headers:{
            "Authorization" : `Bearer ${token}`
        },
        body:`${payload_parse.user_id}`
    })
    location.reload()
    console.log(response.status)
}

async function unfollow(){

    let token = localStorage.getItem("access")
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)

    const response = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/follow/`,{
        method: 'POST',
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    })
    location.reload()
    console.log(response.status)
    
    // const username = document.getElementById("followuser")
    // username.remove()
}