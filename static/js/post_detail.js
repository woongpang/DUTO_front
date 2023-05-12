console.log("상세게시글 js 로드됨")  

let postId

async function loadComments(postId){
    const response = await getComments(postId);
    console.log(response)

    const commentsList = document.getElementById("comments-list")
    commentsList.innerHTML = ""

    response.forEach(comment => {

        commentsList.innerHTML += `
        <li class="media d-flex">
        <img class="mr-3" src="..." alt="profile img">
        <div class="media-body">
            <h5 class="mt-0 mb-1">${comment.user}</h5>
            ${comment.comment}
        </div>
        </li>
        `

    });

}

async function submitComment(){
    const commentElement = document.getElementById("new-comment")
    const newComment = commentElement.value
    const response = await postComment(postId, newComment)
    console.log(response)
    commentElement.value = ""

    loadComments(postId)
}

async function loadPosts(){
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

window.onload = async function (){
    const urlParams = new URLSearchParams(window.location.search);
    postId = urlParams.get("post_id");
    console.log(postId)

    await loadPosts(postId);
    await loadComments(postId);
}