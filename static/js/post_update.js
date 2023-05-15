checkNotLogin();

window.onload = async function loadUpdatePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    const exist_post = await getPost(postId);

    // 수정창에 기존 내용 보이게
    const updateTitle = document.getElementById("update-title")
    updateTitle.value = exist_post.title

    const updateContent = document.getElementById("update-content")
    updateContent.value = exist_post.content

    for (let i = 1; i <= exist_post.star; i++) {
        document.getElementById(`rating${i}`).checked = true;
    }
}