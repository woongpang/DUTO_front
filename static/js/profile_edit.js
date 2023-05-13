
window.onload = function() {
  fetch('/api/users/profile')
    .then(response => response.json())
    .then(data => {
      document.getElementById('username').innerText = data.username;
      document.getElementById('email').innerText = data.email;
      document.getElementById('name').value = data.name;
      document.getElementById('age').value = data.age;
      document.getElementById('introduction').value = data.introduction;
    })
    .catch(error => console.error(error));
};

function handleUpdateButton() {
  const name = document.getElementById('name').value;
  const age = document.getElementById('age').value;
  const introduction = document.getElementById('introduction').value;

  fetch('/api/users/profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        age: age,
        introduction: introduction
      })
    })
    .then(response => response.json())
    .then(data => {
      document.getElementById('name').value = data.name;
      document.getElementById('age').value = data.age;
      document.getElementById('introduction').value = data.introduction;
      alert('프로필이 수정되었습니다.');
    })
    .catch(error => console.error(error));
}
