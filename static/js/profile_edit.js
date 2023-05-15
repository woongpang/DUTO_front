
window.onload = async function () {
  const payload = localStorage.getItem("payload")
  const payload_parse = JSON.parse(payload)
  let token = localStorage.getItem("access")

  const my_profile_edit = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/`, {
    headers: {
      "Authorization": `Bearer ${token}`
    },
    method: "GET",
  })

  const myprofile_response = await my_profile_edit.json()
  console.log(myprofile_response)

  const profile_username = document.getElementById("username")
  profile_username.setAttribute("value", `${myprofile_response.username}`)
  const profile_email = document.getElementById("email")
  profile_email.setAttribute("value", `${myprofile_response.email}`)
  const profile_name = document.getElementById("name")
  profile_name.setAttribute("value", `${myprofile_response.name}`)
  const profile_age = document.getElementById("age")
  profile_age.setAttribute("value", `${myprofile_response.age}`)
  const profile_introduction = document.getElementById("introduction")
  profile_introduction.setAttribute("value", `${myprofile_response.introduction}`)

};

async function handleUpdateButton() {
  const payload = localStorage.getItem("payload")
  const payload_parse = JSON.parse(payload)
  let token = localStorage.getItem("access")

  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const introduction = document.getElementById('introduction').value;

  const my_profile_modify = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/`, {
    headers: {
      "Authorization": `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    method: 'PUT',
    body: JSON.stringify({
      name: name,
      age: age,
      introduction: introduction
    })
  })
  window.location.replace(`${frontend_base_url}/users/profile.html`)
  console.log(my_profile_modify)
}
