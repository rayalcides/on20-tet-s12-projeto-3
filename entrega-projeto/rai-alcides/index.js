const main = document.getElementById('main-content')
const input = document.querySelector('.search-input')
const button = document.querySelector('.search-button')

button.addEventListener("click", (event) => {
   event.preventDefault()
   const username = input.value
   getGitHubUser(username)
})

getGitHubUser = async (user) => {
   try {
     const response = await fetch(`https://api.github.com/users/${user}`)
     const userData = await response.json()
     console.log(user)
     createCard(userData)
   } catch (error) {
    console.error('capiturei um erro:', error) 
   }
}

createCard = (user) => {
    const {avatar_url, name, login, bio, followers, public_repos, } = user
    main.innerHTML = `
      <div class="card">
      <img class="profile-img" src=${avatar_url} alt="">
      </div>
    `
}



// "avatar_url": "https://avatars.githubusercontent.com/u/87040904?v=4",
// "name": "Rai Alcides",
// "login": "rayalcides",
// 	"bio": "programadora iniciante do Front-end",
// 	"public_repos": 14,
// 	"followers": 3,