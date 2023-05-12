console.log("index.js 로딩됨")

// 게시글 리스트 보기
window.onload = async function loadPosts() {
    posts = await getPosts()
    console.log(posts)

    const post_list = document.getElementById("post-list")

    posts.forEach(post => {
        const newCol = document.createElement("div");
        newCol.setAttribute("class", "col")
        newCol.setAttribute("onclick", `postDetail(${post.pk})`)

        const newCard = document.createElement("div")
        newCard.setAttribute("class", "card h-100")
        newCard.setAttribute("id", post.pk)
        newCol.appendChild(newCard)

        const postImage = document.createElement("img")
        postImage.setAttribute("class", "card-img-top")
        if (post.image) {
            postImage.setAttribute("src", `${backend_base_url}${post.image}`)
        } else {
            postImage.setAttribute("src", "https://cdn11.bigcommerce.com/s-1812kprzl2/images/stencil/original/products/426/5082/no-image__12882.1665668288.jpg?c=2")
        }
        newCard.appendChild(postImage)

        const newCardBody = document.createElement("div")
        newCardBody.setAttribute("class", "card-body")
        newCard.appendChild(newCardBody)

        const newCardTile = document.createElement("h5")
        newCardTile.setAttribute("class", "card-title")
        newCardTile.innerText = post.title
        newCardBody.appendChild(newCardTile)

        post_list.appendChild(newCol)
    });
}