const cardTop = document.querySelector('#cardTop').content
const contenido = document.querySelector('#contenido')
const fragment = document.createDocumentFragment()
const btnBuscar = document.getElementById('buscador')

const buscar_canales = document.getElementById('buscador-canales')
const buscar_episodios = document.getElementById('buscador-episodios')

const MX = document.getElementById('MX')
const US = document.getElementById('US')
const SP = document.getElementById('ES')
const BR = document.getElementById('BR')
const UK = document.getElementById('UK')
const FR = document.getElementById('FR')
const GM = document.getElementById('GE')
const CA = document.getElementById('CA')

const cardCanal = document.querySelector('#cardChannel').content
const fragment_canales = document.createDocumentFragment()
const contenido_canales = document.querySelector('#contenido-canales')


const cardEpisodio = document.querySelector('#cardEpisode').content
const fragment_episodios = document.createDocumentFragment()
const contenido_episodios = document.querySelector('#contenido-episodios')

let categories = []
let canales = []
let episodios = []
let pais = 'mx'
document.addEventListener('DOMContentLoaded', () => {
    loadCategories()
})

MX.addEventListener('click', () => {
    pais = 'mx'
})

US.addEventListener('click', () => {
    pais = 'us'
})

SP.addEventListener('click', () => {
    pais = 'sp'
})

BR.addEventListener('click', () => {
    pais = 'br'
})

UK.addEventListener('click', () => {
    pais = 'uk'
})

FR.addEventListener('click', () => {
    pais = 'fr'
})

GM.addEventListener('click', () => {
    pais = 'gm'
})

CA.addEventListener('click', () => {
    pais = 'ca'
})

const loadCategories = () => {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0e39151c7amsh86c23fd0ad07af8p1ebb07jsne2d4140fe256',
            'X-RapidAPI-Host': 'podcast-api1.p.rapidapi.com'
        }
    };

    fetch('https://podcast-api1.p.rapidapi.com/categories', options)
        .then(response => response.json())
        .then(response => {
            categories = response.data
            creaCards()
            console.log('Categorias', categories)
        })
        .catch(err => console.error(err))
}

// Funciones para el menu de carrusel
function App() { }
window.onload = function (event) {
    var app = new App()
    window.app = app
}

App.prototype.processingButton = function (event) {
    const btn = event.currentTarget
    const carruselList = event.currentTarget.parentNode
    const track = event.currentTarget.parentNode.querySelector('.track')
    const carrusel = track.querySelectorAll('.carrusel')
    const carruselWidth = carrusel[0].offsetWidth
    const trackWidth = track.offsetWidth
    const listWidth = carruselList.offsetWidth
    track.style.left == "" ? leftPosition = track.style.left = 0 : leftPosition = parseFloat(track.style.left.slice(0, -2) * -1)
    btn.dataset.button == "button-prev" ? prevAction(leftPosition, carruselWidth, track) : nextAction(leftPosition, trackWidth, listWidth, carruselWidth, track)
}

let prevAction = (leftPosition, carruselWidth, track) => {
    if (leftPosition > 0) {
        track.style.left = `${-1 * (leftPosition - carruselWidth)}px`
    }
}

let nextAction = (leftPosition, trackWidth, listWidth, carruselWidth, track) => {
    if (leftPosition < (trackWidth - listWidth)) {
        track.style.left = `${-1 * (leftPosition + carruselWidth)}px`
    }
}

const creaCards = () => {
    categories.forEach((item) => {
        console.log(item)
        cardTop.querySelector('img').setAttribute('src', item.image_url)
        cardTop.querySelector('.category-name').textContent = item.name
        cardTop.querySelector('button').setAttribute('value', item.id)
        const clone = cardTop.cloneNode(true)
        fragment.appendChild(clone)
    })
    contenido.appendChild(fragment)
}

const creaCanales = () => {
    canales.forEach((item) => {
        console.log(item)
        cardCanal.querySelector('img').setAttribute('src', item.big_cover_url)
        cardCanal.querySelector('.card-title').textContent = item.title
        cardCanal.querySelector('.card-text').textContent = item.description
        cardCanal.querySelector('button').setAttribute('value', item.cid)
        const clone = cardCanal.cloneNode(true)
        fragment_canales.appendChild(clone)
    })
    contenido_canales.appendChild(fragment_canales)
}

const creaEpisodios = () => {
    episodios.forEach((item) => {
        console.log(item)
        cardEpisodio.querySelector('img').setAttribute('src', item.big_cover_url)
        cardEpisodio.querySelector('.card-title').textContent = item.title
        cardEpisodio.querySelector('.card-text').textContent = item.description
        const clone = cardEpisodio.cloneNode(true)
        fragment_episodios.appendChild(clone)
    })
    contenido_episodios.appendChild(fragment_episodios)
}

buscar_canales.addEventListener('keyup', () => {
    const channels = buscar_canales.value.toLowerCase()
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b23bd04d11mshc686e5ab012ef2bp148079jsnf0649d868bf8',
            'X-RapidAPI-Host': 'podcast-api1.p.rapidapi.com'
        }
    };
    
    fetch(`https://podcast-api1.p.rapidapi.com/search_channel/v2?keyword=${channels}`, options)
        .then(response => response.json())
        .then(response => {
            canales = response.data.channel_list
            console.log('Canales encontrados', canales)
            const filtro = canales.filter((canal) => {
                return canal.title.toLowerCase().startsWith(channels)
            })
            contenido_canales.innerHTML = ''
            if(filtro.length > 0) {
                filtro.forEach((item) => { // Cada vez que lea un elemento del arreglo se guardara en "song"
                    cardCanal.querySelector('img').setAttribute('src', item.big_cover_url)
                    cardCanal.querySelector('.card-title').textContent = item.title
                    cardCanal.querySelector('.card-text').textContent = item.description
                    cardCanal.querySelector('button').setAttribute('value', item.cid)
                        
                    const clone = cardCanal.cloneNode(true)
                    fragment_canales.appendChild(clone) 
                })
                contenido_canales.appendChild(fragment_canales) 
            }
        })
        .catch(err => console.error(err));
})

buscar_episodios.addEventListener('keyup', () => {
    const episodes = buscar_episodios.value.toLowerCase()
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b23bd04d11mshc686e5ab012ef2bp148079jsnf0649d868bf8',
            'X-RapidAPI-Host': 'podcast-api1.p.rapidapi.com'
        }
    };
    
    fetch(`https://podcast-api1.p.rapidapi.com/search_episode?keyword=${episodes}`, options)
        .then(response => response.json())
        .then(response => {
            console.log('Episodios encontrados', response)
            episodios = response.data
            const filtro_ep = episodios.filter((ep) => {
                return ep.title.toLowerCase().startsWith(episodes)
            })
            contenido_episodios.innerHTML = ''
            if (filtro_ep.length > 0) {
                filtro_ep.forEach((item) => {
                    cardEpisodio.querySelector('img').setAttribute('src', item.big_cover_url)
                    cardEpisodio.querySelector('.card-title').textContent = item.title
                    cardEpisodio.querySelector('.card-text').textContent = item.description
        
                    const clone_ep = cardEpisodio.cloneNode(true)
                    fragment_episodios.appendChild(clone_ep)
                })
                contenido_episodios.appendChild(fragment_episodios)
            }
        })
        .catch(err => console.error(err));
})

function cargarCategoria(id) {
    contenido_canales.innerHTML = ''
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b23bd04d11mshc686e5ab012ef2bp148079jsnf0649d868bf8',
            'X-RapidAPI-Host': 'podcast-api1.p.rapidapi.com'
        }
    };

    fetch(`https://podcast-api1.p.rapidapi.com/top_channels/v2?category_id=${id}&country=${pais}`, options)
        .then(response => response.json())
        .then(response => {
            console.log('Respuesta', response.data)
            canales = response.data.list
            creaCanales()
        })
        .catch(err => console.error(err));
}

function cargarCanal(id) {
    contenido_episodios.innerHTML = ''
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b23bd04d11mshc686e5ab012ef2bp148079jsnf0649d868bf8',
            'X-RapidAPI-Host': 'podcast-api1.p.rapidapi.com'
        }
    };
    
    fetch(`https://podcast-api1.p.rapidapi.com/episode_list/v2?cid=${id}`, options)
        .then(response => response.json())
        .then(response => {
            console.log('Lista episodios', response.data)
            episodios = response.data.episode_list
            console.log('Arreglo', episodios)
            creaEpisodios()
        })
        .catch(err => console.error(err));
}

