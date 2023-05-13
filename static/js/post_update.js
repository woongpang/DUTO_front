checkNotLogin();

window.onload = async function loadUpdatePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    console.log(postId)

    const response = await getPost(postId);
    console.log(response)
    
    const updateTitle = document.getElementById("update-title")
    const updateContent = document.getElementById("update-content")
    const updateStar = document.getElementById("star").getAttribute("value")

    updateTitle.value = response.title
    updateContent.value = response.content
    updateStar = response.star
}