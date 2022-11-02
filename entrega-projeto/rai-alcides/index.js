const main = document.getElementById('main-content')
const input = document.querySelector('.search-input')
const button = document.querySelector('.search-button')

button.addEventListener("click", (event) => {
   event.preventDefault()
   const username = input.value.trim()
   username ? getGitHubUser(username) : alert("Digite uma usuária(o) válida(o)")
   getGitHubUser(username)
   input.value = ""
})

getGitHubUser = async (user) => {
   try {
     const response = await fetch(`https://api.github.com/users/${user}`)
     const userData = await response.json()
      if (response.status == 404) {
        renderUserNotFound()
      } else if (response.status = 200){
        createCard(userData)
      }
     
     
   } catch (error) {
    console.error('capiturei um erro:', error) 
   }
}

createCard = (user) => {
    const {avatar_url, name, login, bio, followers, public_repos } = user
    main.innerHTML = `
      <div class="card">
       <img class="profile-img" src=${avatar_url} alt="">
       <h2 class="profile-title">${name}</h2>
       <h4 class="profile-subtitle">${login}</h4>
       <p class="profile-description">${bio ? bio : ""}</p>
       <div class="profile-infos">
         <div class="info-box">
           <img src="../../assets/people_outline.png" alt="">
           <p>${followers}</p>
         </div>
         <a class="link-repositorio">
          <div class="info-box">
           <img src="../../assets/Vector.png" alt="">
           <p>${public_repos}</p>
         </div>
        </a>
       </div>
      </div>
   `
   const linkRepositores = document.querySelector(".link-repositorio")

   linkRepositores.addEventListener('click', (evento) => {
       evento.preventDefault()
       getRepositorios(login)
   })
   
}

getRepositorios = async (user) => {
    try {
        const response = await fetch(`https://api.github.com/users/${user}/repos`)
        const repos = await response.json()
        console.log(repos)
         if (repos.length > 0) {
           creatRepositoresCard(repos)
         } else {
            renderNotFoundRepositores(user)
         }
         
      } catch (error) {
       console.error('capiturei um erro:', error) 
      }
}


creatRepositoresCard = (repos) => {
   let reposList = document.createElement('div')
   reposList.setAttribute('class', 'repositores-List')
   main.appendChild(reposList)

   repos.forEach(repositore => {
    const {name, description, language, stargazers_count } = repositore
    console.log(reposList)
    return reposList.innerHTML += `
    <div class="repository">
    <h2 class="repository-title">${name}</h2>
    <p class="repository-description">${description}</p>
    <div class="repository-details">
      <p class="repository-text">${language}</p>
      <p class="repository-icon">
        <img src="../../assets/star.png" alt="">
       ${stargazers_count}</p>
    </div>
  </div>
    `
   })
}

renderNotFoundRepositores = (username) => main.innerHTML +=  `
<div class="not-foud-reposirore">
<h2 class="not-foud-subtitulo">${username} não possui repositório público ainda.</h2>
</div>
`

renderUserNotFound = () => {
  return main.innerHTML = `
  <div class="not-foud">
    <h2 class="not-foud-title">Usuária não encontrada</h2>
    <h4 class="not-foud-subtitulo">Pesquise novamente</h4>
    <img class="not-found-img" src="../../assets/notfound.png" alt="">
  </div>
  
  `
}



    