console.log("상세게시글 js 로드됨")

let postId

function handlefollowing(user_id) {
    window.location.href = `${frontend_base_url}/users/profile.html?user_id=${user_id}`;
}

async function loadComments(postId) {
    const response = await getComments(postId);
    const payload = JSON.parse(localStorage.getItem("payload"));
    const currentUserId = payload.username;


    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";

    response.forEach((comment) => {
        let buttons = '';
        console.log(comment.user)
        // 로그인한 사용자가 댓글 작성자와 일치하는 경우
        if (currentUserId === comment.user) {
            buttons = `
            <div class="col d-grid gap-2 d-md-flex justify-content-end p-2">
                <button type="button" class="btn btn-primary" onclick="modifyComment(${postId}, ${comment.id}, '${comment.comment}')">수정</button>
                <button type="button" class="btn btn-primary" onclick="deleteComment(${postId}, ${comment.id})">삭제</button>
            </div>
            `;
        }

        commentsList.innerHTML += `
        <li class="media d-flex mt-2 mb-2 mr-2 border border-dark">
            <img class="img-thumbnail" src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288879.jpg" alt="profile img" width="50" height"50">
            <div class="media-body">
                <h6 class="mt-1 mb-1 ms-1 me-1">${comment.user}</h6>
                <span class="mt-1 mb-1 ms-1 me-1">${comment.comment}</span>
            </div>
            ${buttons}
        </li>
        `;
    });
}

// 댓글 등록
async function submitComment() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    console.log(`댓글 내용: ${newComment}`)
    const response = await createComment(postId, newComment)
    console.log(response)
    commentElement.value = ""

    loadComments(postId)
}


async function loadPosts() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    const payload = JSON.parse(localStorage.getItem("payload"));
    const currentUserId = payload.username;
    
    const response = await getPost(postId);

    // const postUserid = document.getElementById("post-user")
    // postUserid.setAttribute("onclick", `handleProfile(${response.id})`)

    const postuser = document.getElementById("post-user")
    const postTitle = document.getElementById("post-title")
    const postContent = document.getElementById("post-content")
    const postImage = document.getElementById("post-image")
    const editButton = document.getElementById("edit-button")
    const deleteButton = document.getElementById("delete-button")

    postuser.innerHTML = response.user
    postTitle.innerText = response.title
    postContent.innerText = response.content

    if (response.user_id === currentUserId) {
        editButton.style.display = "block";
        deleteButton.style.display = "block";
    } else {
        editButton.style.display = "none";
        deleteButton.style.display = "none";
    }

    const newImage = document.createElement("img")

    if (response.image) {
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    } else {
        newImage.setAttribute("src", "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2")
    }
    newImage.setAttribute("class", "img-fluid")

    postImage.appendChild(newImage)
}

//댓글 삭제
async function deleteComment(postId, commentId) {
    if (confirm("정말 삭제하시겠습니까?")) {
        let token = localStorage.getItem("access")

        const response = await fetch(`${backend_base_url}/posts/${postId}/comments/${commentId}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": commentId,
            })
        })

        if (response.status == 204) {
            alert("댓글 삭제 완료!")
            loadComments(postId);
        } else {
            alert(response.statusText)
        }
    } else {
        loadComments(postId);
    }
}


window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    
    const response = await getPost(postId);
    // 팔로우 기능

    // const followBtn = document.createElement("button")
    // followBtn.innerText = "팔로우"
    // profileBox.append(followBtn)

    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)

    const profileBox = document.getElementById("following")
    let newdiv = document.createElement("div")
    newdiv.setAttribute("style", "font-size: 20px; margin: 20px") 
    profileBox.appendChild(newdiv)

    let token = localStorage.getItem("access")


    const my_respose = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        },
        method:"GET",
    })
    
    const my_json_response = await my_respose.json()
    console.log("1", my_json_response)
    console.log("2", my_json_response.followings)
    console.log("3", payload_parse.username)
    console.log("4", my_json_response.id)

    let sameid = null;
    my_json_response.followings.forEach((obj) => {
        if (obj == response.user) {
            sameid = obj;
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

    if (response.user!=payload_parse.username){
        if(sameid){
            let unfollowButton = document.createElement("button")
            unfollowButton.setAttribute("class", "nav-link btn")
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
            followButton.setAttribute("class", "nav-link btn")
            followButton.setAttribute("onclick", "follow()")
            followButton.innerText = "follow"
            newdiv.appendChild(followButton)
        } 
    }
    
    const count = document.getElementById("count")


    let count_like = 1
    for (let obj in response.like) {
        console.log(response.like)
        count_like += Number(obj)
    }

    count.innerText = `${count_like}개`

    const exist_post = await getPost(postId);
    console.log(exist_post)

    for (let i = 1; i <= exist_post.star; i++) {
        document.getElementById(`rating${i}`).checked = true;
    }

    await loadPosts(postId);
    await loadComments(postId);

    
}