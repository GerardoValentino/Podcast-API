let categories = []
document.addEventListener('DOMContentLoaded', () => {
    loadCategories();
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
            console.log('Categorias', categories)
        })
        .catch(err => console.error(err));
} 




// Funciones para el menu de carrusel
function App() {}
window.onload = function(event) {
    var app = new App()
    window.app = app
}

App.prototype.processingButton = function(event) {
    const btn = event.currentTarget
    const carruselList = event.currentTarget.parentNode
    const track = event.currentTarget.parentNode.querySelector('#track')
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
