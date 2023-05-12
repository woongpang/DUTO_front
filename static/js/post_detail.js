console.log("상세게시글 js 로드됨")

let postId

async function loadComments(postId) {
    const response = await getComments(postId);
    console.log(response)

    const commentsList = document.getElementById("comments-list")
    commentsList.innerHTML = ""

    response.forEach(comment => {

        commentsList.innerHTML += `
        <li class="media d-flex mt-2 mb-2 mr-2 border border-dark">
        <img class="img-thumbnail" src="https://img.freepik.com/free-photo/cute-ai-generated-cartoon-bunny_23-2150288879.jpg" alt="profile img" width="50" height"50">
        <div class="media-body">
            <h6 class="mt-1 mb-1 ms-1 me-1">${comment.user}</h6>
            <span class="mt-1 mb-1 ms-1 me-1">${comment.comment}</span>
        </div>
        <div class="col d-grid gap-2 d-md-flex justify-content-end p-2">
            <button type="button" class="btn btn-primary" onclick="modifyComment(${postId}, ${comment.id})">수정</button>
            <button type="button" class="btn btn-primary" onclick="deleteComment(${postId}, ${comment.id})">삭제</button>
        </div>
        </li>
        `

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
    // commentId = urlParams.get("comment_id");
    console.log(postId)
    // console.log(commentId)

    await loadPosts(postId);
    await loadComments(postId);
}