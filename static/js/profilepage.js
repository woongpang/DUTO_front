

// html 화면에 사용자 이름을 띄우는 방법. 
// payload_parse는 payloada만 하면 str형태로 가져오는데 이를 object 형태로 가져오기 위함이다.
window.onload = () => {
    
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

    const my_respose = fetch(`${backend_base_url}/users/${payload_parse.user_id}/`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        },
        method:"GET",
    })

    const my_json_response = my_respose.json()
    
    for (let obj of my_json_response.followings) {
        if(obj == payload_parse.user_id){
            let sameid = obj
            console.log("같은게 있음")
        }
    }

    if(sameid==payload_parse.user_id){
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
    console.log(response.status)
    if(response.status == 200){
        const response_json =  await response.json()
        console.log(response_json)

        localStorage.setItem("followstate", response_json)
        location.reload()
    }
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
    console.log(response.status)
    if(response.status == 201){
        localStorage.removeItem("followstate")
        location.reload()
    }
    
    // const username = document.getElementById("followuser")
    // username.remove()
}