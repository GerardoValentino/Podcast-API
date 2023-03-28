const cardTop = document.querySelector('#cardTop').content
const contenido = document.querySelector('#contenido')
const fragment = document.createDocumentFragment()
const btnBuscar = document.getElementById('buscador')

const cardCanal = document.querySelector('#cardChannel').content
const fragment_canales = document.createDocumentFragment()
const contenido_canales = document.querySelector('#contenido-canales')

let categories = []
let canales = []
document.addEventListener('DOMContentLoaded', () => {
    loadCategories()
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
    console.log('Entra a la funcion window.onload')
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
        const clone = cardCanal.cloneNode(true)
        fragment_canales.appendChild(clone)
    })
    contenido_canales.appendChild(fragment_canales)
}


btnBuscar.addEventListener('keyup', () => {
    console.log('tecla', btnBuscar.value) // Cuando es un input es value; cuando es una etiqueta div, p... es textContent
})

function cargarCategoria(id) {
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': '0e39151c7amsh86c23fd0ad07af8p1ebb07jsne2d4140fe256',
            'X-RapidAPI-Host': 'podcast-api1.p.rapidapi.com'
        }
    };

    fetch(`https://podcast-api1.p.rapidapi.com/top_channels/v2?category_id=${id}&country=us`, options)
        .then(response => response.json())
        .then(response => {
            console.log('Respuesta', response.data)
            canales = response.data.list
            creaCanales()
        })
        .catch(err => console.error(err));
}

