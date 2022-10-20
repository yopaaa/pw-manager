const searchBar = document.getElementById('searchBar')


searchBar.addEventListener('keyup', (e)=>{
  const query = e.target.value.toLowerCase()
  const resultSearch = resultDataApi.filter(datas => {
    return datas.key.includes(query)
  })
    displayCharacters(resultSearch,htmlTable)
})


// fetchApi(`${location.origin}/api`, (datas) => {
// });