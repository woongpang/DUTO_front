console.log("상세게시글 js 로드됨")

let postId

// update
async function updatePosts(url) {
    const urlParams = new URLSearchParams(url);
    const postId = urlParams.get("post_id");
    let token = localStorage.getItem("access")
    

    const title = document.getElementById('post-title').value
    const img = document.getElementById('post-image').value
    const content = document.getElementById('post-content').value
    console.log(title, img, content)

    const response = await fetch(`${backend_base_url}/posts/${postId}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        method:'PUT',
        body: JSON.stringify ({
            'title': title,
            'image': img,
            'content': content
        })
    })
    console.log(response.status)

    if (response.status == 200) {
        alert("글 작성 완료")
        window.location.replace('index.html')
    } else if (title == ''  || img || '' || content == '' ) {
        alert("빈칸을 입력해 주세요.")
    }
}

// delete
async function deletePosts(postId) {
    if(confirm("작성하신 게시물을 삭제하시겠습니까?")) {
        let token = localStorage.getItem("access")

        const response = await fetch(`${backend_base_url}/posts/${postId}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": postId
            })
        })

        if (response.status == 204) {
            alert("게시글 삭제 완료!")
            loadComments(postId);
        } else {
            alert(response.statusText)
        }
    } else {
        loadPosts(postId);
    }
}


async function loadComments(postId) {
    const response = await getComments(postId);
    const payload = JSON.parse(localStorage.getItem("payload"));
    const currentUserId = payload.username;
    console.log(currentUserId)

    const commentsList = document.getElementById("comments-list");
    commentsList.innerHTML = "";

    response.forEach((comment) => {
        let buttons = '';
        console.log(comment.user)
        // 로그인한 사용자가 댓글 작성자와 일치하는 경우
        if (currentUserId === comment.user) {
            buttons = `
            <div class="col d-grid gap-2 d-md-flex justify-content-end p-2">
                <button type="button" class="btn btn-primary" onclick="modifyComment(${postId}, ${comment.id})">수정</button>
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
    console.log(postId)

    const response = await getPost(postId);
    console.log(response)

    const postTitle = document.getElementById("post-title")
    const postContent = document.getElementById("post-content")
    const postImage = document.getElementById("post-image")

    postTitle.innerText = response.title
    postContent.innerText = response.content
    const newImage = document.createElement("img")

    if (response.image) {
        newImage.setAttribute("src", `${backend_base_url}${response.image}`)
    } else {
        newImage.setAttribute("src", "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2")
    }
    newImage.setAttribute("class", "img-fluid")

    postImage.appendChild(newImage)


}

window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    postId = urlParams.get("post_id");
    console.log(postId)

    await loadPosts(postId);
    await loadComments(postId);
}