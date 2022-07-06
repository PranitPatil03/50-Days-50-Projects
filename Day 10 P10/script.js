const APIURL='https://api.github.com/users/'

const form=document.getElementById('form')
const search=document.getElementById('search')
const main=document.getElementById('main')

async function getUser(username){
    try{
        const {data} = await axios(APIURL+username)

        createUserCard(data)
        getReops(username)
    }
    catch(err){
        if(err.response.status == 404){
            createErrorCard('No profile with this username')
        }
    }
}

async function getReops(username){
    try{
        const {data} = await axios(APIURL+username+'/repos?sort=created')

        addReposTocard(data)
    }
    catch(err){
            createErrorCard('Problem fetching repos')
    }
}

function createErrorCard(msg){
    const cardHTML=
    `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    `
    main.innerHTML=cardHTML
}

function addReposTocard(repos){
    const reposEl=document.getElementById('repos')

    repos
        .slice(0,6)
        .forEach(repo=>{
        const repoEl =document.createElement('a')
        repoEl.classList.add('repo')
        repoEl.href=repo.html_url
        repoEl.target='_blank'
        repoEl.innerText=repo.name

        reposEl.appendChild(repoEl)
    })
}

function createUserCard(user){
    const cardHTML=` 
    <div class="card">

        <div>
            <img src="${user.avatar_url}" alt="${user.name}" class="avatar" width="80px" height="80px">
        </div>

        <div class="user-info">
            <h2>${user.name}</h2>
            <p>${user.bio}</p>

            <ul>
                <li>${user.followers} <strong>followers</strong></li>
                <li>${user.following} <strong>following</strong></li>
                <li>${user.public_repos} <strong>Repos</strong></li>
            </ul>

            <div id="repos"> </div>
        </div>
    </div>`

    main.innerHTML=cardHTML
}

form.addEventListener('submit',(e)=>{
    e.preventDefault()

    const user = search.value

    if(user){
        getUser(user)

        search.value =''
    }
})