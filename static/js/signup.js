async function handleSigninButton() {
    const response = await handleSignin();
    // 이메일 유효성 검사 필요(현재는 이메일 형식 아니어도 가입됨)
    // 필수항목, 선택항목 구분 필요(현재는 다 채워넣어야 함)
    if (response.status == 201) {
        alert("회원가입을 축하합니다!")
        window.location.replace(`${frontend_base_url}/users/login.html`)
    } else if (response.status == 400) {
        alert("값을 제대로 입력해 주십시오")
    } else {
        alert(`${response.statusText}`)
    }
}

checkLogin();