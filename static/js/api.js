const frontend_base_url = "http://127.0.0.1:5501"
const backend_base_url = "http://127.0.0.1:8000"

window.onload = () => {
    console.log("api.js 로딩됨")
}

// 회원가입
async function handleSignin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value
    const passwordCheck = document.getElementById("password-check").value
    const email = document.getElementById("email").value
    const realname = document.getElementById("realname").value
    const age = document.getElementById("age").value
    const introduction = document.getElementById("introduction").value
    console.log(username, password)

    const response = await fetch(`${backend_base_url}/users/signup/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password1": password,
            "password2": passwordCheck,
            "email": email,
            "name": realname || '',
            "age": age || 7,
            "introduction": introduction || '',
        })
    })

    return response
}

// 로그인
async function handleLogin() {
    const username = document.getElementById("username").value
    const password = document.getElementById("password").value

    const response = await fetch(`${backend_base_url}/users/login/`, {
        headers: {
            'content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
            "username": username,
            "password": password
        })
    })

    return response
}

// 유저 정보 조회
async function getUser() {
    const payload = localStorage.getItem("payload")
    const payload_parse = JSON.parse(payload)
    let token = localStorage.getItem("access")
    const response = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
        method: "GET",
    })

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.statusText)
    }
}

// 뭐하는 애더라?
async function handleMock() {
    const response = await fetch(`${backend_base_url}/users/mock/`, {
        headers: {
            "Authorization": "Bearer " + localStorage.getItem("access")
        },
        method: 'GET',
    })
    console.log(response)
}

// 로그아웃
function handleLogout() {
    localStorage.removeItem("access")
    localStorage.removeItem("refresh")
    localStorage.removeItem("payload")
    window.location.replace(`${frontend_base_url}/`)
}

// 로그인 상태에서 로그인, 회원가입 페이지 접속 시 홈으로 이동하는 함수
function checkLogin() {
    const payload = localStorage.getItem("payload")
    if (payload) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

// 비로그인 상태에서 글쓰기 페이지 접속 시 홈으로 이동하는 함수
function checkNotLogin() {
    const payload = localStorage.getItem("payload")
    if (payload == null) {
        window.location.replace(`${frontend_base_url}/`)
    }
}

// 메인페이지 조회
async function getAllPosts() {
    const response = await fetch(`${backend_base_url}/posts/`)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는 데 실패했습니다")
    }
}

// 카테고리별 전체 게시글 조회
async function getPosts(categoryName) {
    const response = await fetch(`${backend_base_url}/posts/category/${categoryName}/`)
    console.log(response)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else {
        alert("불러오는 데 실패했습니다")
    }
}

// 카테고리별 팔로잉 게시글 조회
async function getFollowingPosts(categoryName) {
    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/posts/category/${categoryName}/followings/`, {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    console.log(response)

    if (response.status == 200) {
        const response_json = await response.json()
        return response_json
    } else if (response.status == 401) {
        alert("로그인이 필요한 페이지입니다")
    } else {
        alert("불러오는 데 실패했습니다")
    }
}

// 게시글 작성
async function createPost(url) {
    const urlParams = new URLSearchParams(url);
    const category = urlParams.get("category");
    const title = document.getElementById("title").value;
    const content = document.getElementById("content").value;
    const image = document.getElementById("image").files[0];
    const star = document.getElementById("star").getAttribute("value");


    const formdata = new FormData();

    formdata.append("category", category)
    formdata.append("title", title)
    formdata.append("content", content)
    formdata.append("image", image || '') // 이미지 안 올리면 폼데이터에 ''로 들어가게 함(이렇게 안 하면 undefined가 들어가서 400에러뜸)
    formdata.append("star", star)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/posts/`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formdata
    })

    if (response.status == 200) {
        alert("글 작성 완료!")
        window.location.replace(`${frontend_base_url}/`);
    } else if ((response.status == 400)) {
        alert("제목, 내용, 별점은 필수항목입니다")
    }
    else {
        alert(response.statusText)
    }
}

// 게시글 수정
async function updatePosts(url) {
    const urlParams = new URLSearchParams(url);
    const postId = urlParams.get("post_id");

    const title = document.getElementById('update-title').value
    const content = document.getElementById('update-content').value
    let img = document.getElementById('update-image').files[0]
    let star = document.getElementById('star').getAttribute('value')

    const formdata = new FormData();

    formdata.append("title", title)
    formdata.append("content", content)

    // 사진 새로 선택한 경우에만 formdata에 이미지 붙이기(안 하면 원래 데이터베이스에 이미지 그대로 있게 함)
    if (img) {
        formdata.append("image", img)
    }
    // 별을 새로 선택한 경우에만 formdata에 데이터 붙이기(클릭 안 한 경우 원래 데이터베이스에 star 값 그대로 있게 함)
    if (star) {
        formdata.append("star", star)
    }

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/posts/${postId}/`, {
        headers: {
            'Authorization': `Bearer ${token}`
        },
        method: 'PUT',
        body: formdata
    })

    if (response.status == 200) {
        alert("글 수정 완료")
        window.location.replace(`${frontend_base_url}/posts/post_detail.html?post_id=${postId}`)
    } else if (title == '' || content == '') {
        alert("빈칸을 입력해 주세요.")
    } else {
        alert(response.statusText)
    }
}

//게시글 삭제

async function deletePosts(postId) {
    if (confirm("작성하신 게시물을 삭제하시겠습니까?")) {
        let token = localStorage.getItem("access")
    }

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/posts/${postId}/`, {
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        method: 'DELETE',
    })

    if (response.status == 204) {
        alert("게시글 삭제 완료!")
        window.location.replace(`${frontend_base_url}/`)
    } else {
        alert(response.statusText)
    }
}


// 상세 게시글 조회
async function getPost(postId) {
    const response = await fetch(`${backend_base_url}/posts/${postId}/`)

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.statusText)
    }
}


// 댓글 조회
async function getComments(postId) {
    const response = await fetch(`${backend_base_url}/posts/${postId}/comments/`,)

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else {
        alert(response.statusText)
    }
}

// 댓글 작성
async function createComment(postId, newComment) {

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/posts/${postId}/comments/`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
            "comment": newComment,
        })
    }
    )

    if (response.status == 200) {
        response_json = await response.json()
        return response_json
    } else if (response.status == 401) {
        alert("로그인한 사용자만 댓글을 등록할 수 있습니다")
    } else {
        alert(response.statusText)
    }
}

// 댓글 수정
async function modifyComment(postId, commentId, currentComment) {
    let newComment = prompt("수정할 댓글을 입력하세요.", currentComment); // 수행할 댓글 수정 내용을 입력 받고, 기존 댓글 내용을 보여줍니다.

    if (newComment !== null) { // 수정 내용이 null 이 아닌 경우
        let token = localStorage.getItem("access");

        const response = await fetch(`${backend_base_url}/posts/${postId}/comments/${commentId}/`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "comment": newComment
            })
        });

        if (response.status == 200) {
            alert("댓글 수정이 완료되었습니다!");
            loadComments(postId); // 댓글 목록을 다시 로드합니다.
        } else {
            alert(response.statusText);
        }
    } else { // 수정 내용이 null 인 경우
        loadComments(postId);
    }
}


//댓글 삭제
async function deleteComment(postId, commentId) {
    if (confirm("정말 삭제하시겠습니까?")) {
        let token = localStorage.getItem("access")

        const response = await fetch(`${backend_base_url}/posts/${postId}/comments/${commentId}/`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                "id": commentId,
            })
        })

        if (response.status == 204) {
            alert("댓글 삭제 완료!")
            loadComments(postId);
        } else {
            alert(response.statusText)
        }
    } else {
        loadComments(postId);
    }
}

// 팔로우
async function follow() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");

    const response_post = await getPost(postId);
    console.log(response_post.user)

    let token = localStorage.getItem("access")

    const response = await fetch(`${backend_base_url}/users/${response_post.user}/follow/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: `${response_post.user}`
    })
    location.reload()
}

// 언팔로우
async function unfollow() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");

    const response_post = await getPost(postId);
    let token = localStorage.getItem("access")

    await fetch(`${backend_base_url}/users/${response_post.user}/follow/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
    location.reload()
}

// 좋아요 누르기
async function likeClick() {
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get("post_id");
    const post = await getPost(postId);

    let token = localStorage.getItem("access")
    let clickLike = document.getElementById("like")
    let clickDislike = document.getElementById("dislike")

    const response = await fetch(`${backend_base_url}/posts/${postId}/likes/`, {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const response_json = await response.json()

    //좋아요 하트 색 변경
    if (response_json == "좋아요") {
        clickLike.setAttribute("style", "display:flex;")
        clickDislike.setAttribute("style", "display:none;")
        count.innerText = `좋아요 ${post.like.length + 1}개`
    } else if (response_json == "좋아요 취소") {
        clickLike.setAttribute("style", "display:none;")
        clickDislike.setAttribute("style", "display:flex;")
        count.innerText = `좋아요 ${post.like.length - 1}개`
    }

    // 좋아요 개수 보이기
    // const count = document.getElementById("count")
    // count.innerText = `좋아요 ${post.like.length}개`
}