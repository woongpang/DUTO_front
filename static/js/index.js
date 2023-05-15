// 전체게시글 리스트 보기
window.onload = async function loadPosts() {
    posts = await getAllPosts()
    console.log(posts)
    const post_list = document.getElementById("post-list")
    postList(posts, post_list);   

    // posts.forEach(post=>{
    //     //원래 별 띄우기
    // for (let i = 1; i <= post.star; i++) {
    //     document.getElementById(`rating${i}`).checked = true;
    // }
    // })
}