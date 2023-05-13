checkNotLogin();

window.onload = async function loadUpdatePost() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    console.log(postId)

    const response = await getPost(postId);
    console.log(response)

    // 원래 제목 띄우기
    const updateTitle = document.getElementById("update-title")
    updateTitle.value = response.title

    // 원래 내용 띄우기
    const updateContent = document.getElementById("update-content")
    updateContent.value = response.content

    // 원래 이미지 불러오기
    const updateImage = document.getElementById("update-image")
    updateImage.files[0] = response.image

    //원래 별 띄우기
    const updateStar = document.getElementById(`rating${response.star}`)
    const star = updateStar.getAttribute("value")
    for (let i = 1; i <= star; i++) {
        document.getElementById(`rating${i}`).checked = true;
    }
}