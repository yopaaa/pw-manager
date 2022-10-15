
const urlParams = new URLSearchParams(location.search);

const search = {}
for (const [key, value] of urlParams) {
  search[key] = value
}


const path = `${location.origin}/api/find/${search.id}`


const name = document.querySelector('#name')
const email = document.querySelector('#email')
const site = document.querySelector('#site')
const password = document.querySelector('#password')
const notes = document.querySelector('#note')
const id = document.querySelector('#id')



fetchApi(path, (data) => {
  name.value = data.user_name;
  email.value = data.email
  site.value = data.site
  password.value = data.password
  notes.innerHTML = data.notes 
  id.value = data.id

});

