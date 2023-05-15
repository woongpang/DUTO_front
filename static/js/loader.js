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
        intro.innerText = `${payload_parse.username}`

        let navbarRight = document.getElementById("navbar-right")
        let newLi = document.createElement("li")
        newLi.setAttribute("class", "nav-item")

        let logoutBtn = document.createElement("button")
        logoutBtn.setAttribute("class", "nav-link btn")
        logoutBtn.setAttribute("style", "font-size: 25px; margin: 80px 30px 0 10px;")
        logoutBtn.innerText = "Logout"
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

        const newCardStar = document.createElement("div")
        newCardStar.setAttribute("class", "rating")
        newCardStar.setAttribute("id", "star")
        newCard.appendChild(newCardStar)

        const newCardinputStar1 = document.createElement("input")
        newCardinputStar1.setAttribute("class", "rate_radio")
        newCardinputStar1.setAttribute("type", "checkbox")
        newCardinputStar1.setAttribute("value", "1")
        newCardinputStar1.setAttribute("id", "rating1")
        newCardinputStar1.setAttribute("disabled", "")
        newCardStar.appendChild(newCardinputStar1)

        const newCardlabel1 = document.createElement("label")
        newCardlabel1.setAttribute("for", "rating1")
        newCardStar.appendChild(newCardlabel1)

        const newCardinputStar2 = document.createElement("input")
        newCardinputStar2.setAttribute("class", "rate_radio")
        newCardinputStar2.setAttribute("type", "checkbox")
        newCardinputStar2.setAttribute("value", "2")
        newCardinputStar2.setAttribute("id", "rating2")
        newCardinputStar2.setAttribute("disabled", "")
        newCardStar.appendChild(newCardinputStar2)

        const newCardlabel2 = document.createElement("label")
        newCardlabel2.setAttribute("for", "rating2")
        newCardStar.appendChild(newCardlabel2)

        const newCardinputStar3 = document.createElement("input")
        newCardinputStar3.setAttribute("class", "rate_radio")
        newCardinputStar3.setAttribute("type", "checkbox")
        newCardinputStar3.setAttribute("value", "3")
        newCardinputStar3.setAttribute("id", "rating3")
        newCardinputStar3.setAttribute("disabled", "")
        newCardStar.appendChild(newCardinputStar3)

        const newCardlabel3 = document.createElement("label")
        newCardlabel3.setAttribute("for", "rating3")
        newCardStar.appendChild(newCardlabel3)

        const newCardinputStar4 = document.createElement("input")
        newCardinputStar4.setAttribute("class", "rate_radio")
        newCardinputStar4.setAttribute("type", "checkbox")
        newCardinputStar4.setAttribute("value", "4")
        newCardinputStar4.setAttribute("id", "rating4")
        newCardinputStar4.setAttribute("disabled", "")
        newCardStar.appendChild(newCardinputStar4)

        const newCardlabel4 = document.createElement("label")
        newCardlabel4.setAttribute("for", "rating4")
        newCardStar.appendChild(newCardlabel4)

        const newCardinputStar5 = document.createElement("input")
        newCardinputStar5.setAttribute("class", "rate_radio")
        newCardinputStar5.setAttribute("type", "checkbox")
        newCardinputStar5.setAttribute("value", "5")
        newCardinputStar5.setAttribute("id", "rating5")
        newCardinputStar5.setAttribute("disabled", "")
        newCardStar.appendChild(newCardinputStar5)

        const newCardlabel5 = document.createElement("label")
        newCardlabel5.setAttribute("for", "rating5")
        newCardStar.appendChild(newCardlabel5)

        //원래 별 띄우기
        for (let i = 1; i <= post.star; i++) {
            document.getElementById(`rating${i}`).checked = true
            console.log(`rating${i}`)
        }
    });

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
    const post_id = urlParams.get("post_id");
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

// 팔로잉 버튼 클릭 시 아래 url로 이동시킴
function handlefollowing(user_id) {
    window.location.href = `${frontend_base_url}/users/profile.html?user_id=${user_id}`;
}
