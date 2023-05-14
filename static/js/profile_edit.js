
window.onload = async function() {
  const payload = localStorage.getItem("payload")
  const payload_parse = JSON.parse(payload)
  let token = localStorage.getItem("access")

  const my_profile_edit = await fetch(`${backend_base_url}/users/${payload_parse.user_id}/`,{
        headers:{
            "Authorization" : `Bearer ${token}`
        },
        method:"GET",
  })
  console.log(my_profile_edit)
  const myprofile_response = await my_profile_edit.json()
  console.log(myprofile_response)
    

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
      "Authorization" : `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
      method: 'PUT',
      body: JSON.stringify({
        name: name,
        age: age,
        introduction: introduction
      })
    })
    console.log(my_profile_modify)
}
