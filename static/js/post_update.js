checkNotLogin();

window.onload = async function loadUpdatePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    const exist_post = await getPost(postId);

    // 원래 제목 띄우기
    const updateTitle = document.getElementById("update-title")
    updateTitle.value = exist_post.title

    // 원래 내용 띄우기
    const updateContent = document.getElementById("update-content")
    updateContent.value = exist_post.content

    // 원래 이미지 불러오기
    const updateImage = document.getElementById("update-image")
    updateImage.files[0] = exist_post.image

    //원래 별 띄우기
    for (let i = 1; i <= exist_post.star; i++) {
        document.getElementById(`rating${i}`).checked = true;
    }
}