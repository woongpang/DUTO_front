console.log("loader 로드됨")

// navbar.html을 가져옴
// 로그인 되지 않은 상태에서는 글쓰기가 안 보이고, 로그인 된 상태라면 로그인이 안 보이고 로그아웃 버튼이 생김
async function injectNavbar() {
    fetch("/navbar.html").then(response => {
        return response.text()
    })
        .then(data => {
            document.querySelector("header").innerHTML = data;
        })

    let navbarHtml = await fetch("/navbar.html")
    let data = await navbarHtml.text()
    document.querySelector("header").innerHTML = data;

    const payload = localStorage.getItem("payload")
    if (payload) {
        const payload_parse = JSON.parse(payload)

        const intro = document.getElementById("intro")
        intro.innerText = `${payload_parse.name}님 안녕하세요!`

        let navbarRight = document.getElementById("navbar-right")
        let newLi = document.createElement("li")
        newLi.setAttribute("class", "nav-item")

        let logoutBtn = document.createElement("button")
        logoutBtn.setAttribute("class", "nav-link btn")
        logoutBtn.innerText = "로그아웃"
        logoutBtn.setAttribute("onclick", "handleLogout()")

        newLi.appendChild(logoutBtn)

        navbarRight.appendChild(newLi)

        let loginButton = document.getElementById("login-button")
        loginButton.style.display = "none"
    }
}

injectNavbar();

// 게시글 목록 UI
function postList(posts, post_list) {
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

// 전체게시글 리스트 보기
window.onload = async function loadPosts() {
    posts = await getAllPosts()
    const post_list = document.getElementById("post-list")
    console.log(posts)
    postList(posts, post_list);
}

// 공부 or 휴식 게시판 전체 게시글 보기 클릭 시 html에 있는 카테고리 이름을 가져와서 url에 카테고리명을 담아서 그 url로 이동시킴
function clickCategory(category_name) {
    window.location.href = `${frontend_base_url}/posts/post_list.html?category=${category_name}`
}

// 공부 or 휴식 게시판 팔로잉 게시글 보기 클릭 시 html에 있는 카테고리 이름을 가져와서 url에 카테고리명을 담아서 그 url로 이동시킴
function clickFollowingPosts(category_name) {
    window.location.href = `${frontend_base_url}/posts/post_list.html?category=${category_name}&q=followings`
}

// url에 게시글 pk값을 담기 위한 작업
function postDetail(post_id) {
    window.location.href = `${frontend_base_url}/posts/post_detail.html?post_id=${post_id}`
}

function postUpdate(url) {
    const urlParams = new URLSearchParams(url);
    console.log(url)
    // console.log(urlParams)
    const post_id = urlParams.get("post_id");
    // console.log(post_id)
    window.location.href = `${frontend_base_url}/posts/post_update.html?post_id=${post_id}`
}

// 카테고리명을 pk값으로 바꿔주는 작업
function handlePostButton(url) {
    const urlParams = new URLSearchParams(url);
    const postCategory = urlParams.get("category");
    if (postCategory == "study") {
        category_pk = 1
    } else if (postCategory == "rest") {
        category_pk = 2
    }
    window.location.href = `${frontend_base_url}/posts/post_create.html?category=${category_pk}`
}
