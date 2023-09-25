
const usuarios = () => {
    fetch('https://jsonplaceholder.typicode.com/users/')
    .then((response) => response.json())
    .then((response) => {
        pagination = document.querySelector('.pagination')
        
        let contador = 1

        const previus_li = document.createElement('li')
        previus_li.className = 'page-item'
        previus_li.addEventListener('click', function(e) {
            if (contador > 1){
                contador = contador - 1
                const usuario_seleccionado = response[contador]
                obtenerPostsUsuario(usuario_seleccionado);
            }
        });

        const a_previus_li = document.createElement('a')
        a_previus_li.className = 'page-link'
        a_previus_li.textContent = 'Anterior'

        pagination.appendChild(previus_li)
        previus_li.appendChild(a_previus_li)

        response.forEach(element => {
            const user_item = document.createElement('li')
            user_item.className = 'page-item'

            const a_user_item = document.createElement('a')
            a_user_item.className = 'page_link'
            a_user_item.textContent = contador

            a_user_item.addEventListener('click', function(e) {
                
                const usuario_seleccionado = response[e.target.text-1]
                obtenerPostsUsuario(usuario_seleccionado);
                
                
            });

            pagination.appendChild(user_item)
            user_item.appendChild(a_user_item)

            contador ++
        });

        const next_li = document.createElement('li')
        next_li.className = 'page-item'
        next_li.addEventListener('click', function(e) {
            console.log(contador)
            if (contador < 10){
                contador = Number(contador) + 1
                const usuario_seleccionado = response[contador]
                obtenerPostsUsuario(usuario_seleccionado);

            }
        });


        const a_next_li = document.createElement('a')
        a_next_li.className = 'page-link'
        a_next_li.textContent = 'Siguiente'

        pagination.appendChild(next_li)
        next_li.appendChild(a_next_li)
    })
}
usuarios()

function obtenerPostsUsuario(usuario) {
    fetch(`https://jsonplaceholder.typicode.com/users/${usuario.id}/posts`)
    .then((response) => response.json())
    .then((response) => {
        const tweets_feed = document.querySelector('.tweets_feed');

        // Limpiar todos los tweets existentes antes de agregar los nuevos
        while (tweets_feed.firstChild) {
            tweets_feed.removeChild(tweets_feed.firstChild);
        }
        response.forEach((element) => {
            const tweets = document.querySelector('.tweets')
            const tweets_feed = document.querySelector('.tweets_feed')
        
            const tweet_feed = document.createElement('div')
            tweet_feed.className = 'tweet_feed'
        
            const user = document.createElement('div')
            user.className = 'user'
            tweet_feed.appendChild(user)
        
            const name_user = document.createElement('strong')
            name_user.className = 'name_user'
            name_user.textContent = usuario.name
        
            const username_user = document.createElement('span')
            username_user.className = 'username_user'
            username_user.textContent = ' @' + usuario.username + ' email ' + usuario.email
        
            const title_tweet = document.createElement('h3')
            title_tweet.className = 'title_tweet'
            title_tweet.textContent = element.title
            tweet_feed.appendChild(title_tweet)
        
            const body_tweet = document.createElement('p')
            body_tweet.className = 'body_tweet'
            body_tweet.textContent = element.body
            tweet_feed.appendChild(body_tweet)

            const boton_commentarios = document.createElement('button')
            boton_commentarios.className = 'btn btn-primary'
            boton_commentarios.textContent = 'Comentarios'
            boton_commentarios.setAttribute('type', 'button');
            boton_commentarios.setAttribute('data-toggle', 'modal');
            boton_commentarios.setAttribute('data-target', '#exampleModal'); 

            tweet_feed.appendChild(boton_commentarios)
        
            user.appendChild(name_user)
            user.appendChild(username_user)
        
            
            
            
        
            boton_commentarios.addEventListener('click', function(e) {
                const post = element
                const user = usuario   
                comments(post, user)
            });

            tweets_feed.appendChild(tweet_feed)
            tweets.appendChild(tweets_feed)
        })
        
        
    })
}

function comments(post, usuario){
    fetch(`https://jsonplaceholder.typicode.com/posts/${post.id}/comments`)
    .then((response) => response.json())
    .then((response) => {
        console.log(response)
        // No se me ocurrió como mostrar los comentarios pero aparecen en consola

    })
}