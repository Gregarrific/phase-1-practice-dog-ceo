const imgUrl = 'https://dog.ceo/api/breeds/image/random/4';
const breedUrl = 'https://dog.ceo/api/breeds/list/all';
let highlight = 'dog-breeds';
// Event Listeners
document.addEventListener('click', function(event) {
    clickedOn = event.target;
    if (clickedOn.className === "breed-list") {
        let oldHighlight = document.getElementById(highlight);
        oldHighlight.setAttribute('style', 'color:black');
        clickedOn.setAttribute('style', 'color:red');
        highlight = clickedOn.id;
    }
})
document.addEventListener('DOMContentLoaded', function(){
    fetch(imgUrl)
    .then(response => response.json())
    .then(data => {
        data.message.forEach(element => {
            let img = document.createElement('img');
            img.src = element;
            let title = element.replace('https://images.dog.ceo/breeds/', '');
            title = title.substr(0, title.indexOf('/'));
            img.title = title;
            img.setAttribute('style', 'width: 300px');
            document.getElementById('dog-image-container').appendChild(img);
        })
    })
    loadBreed();
})
document.addEventListener('change', function(event) {
    const input = document.getElementById('breed-dropdown').value;
    loadBreed(input);
})
// Functions
function loadBreed(input) {
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        refreshList();
        for (breed in data.message) {
            if (typeof input === 'undefined' || input === "all") {
                let breedList = document.createElement('li');
                breedList.textContent = breed;
                breedList.setAttribute('id', breed);
                breedList.setAttribute('class', 'breed-list');
                document.getElementById('dog-breeds').appendChild(breedList);
            } else if (breed.charAt(0) === input.charAt(0)) {
                console.log(breed.charAt(0));
                let breedList = document.createElement('li');
                breedList.textContent = breed;
                breedList.setAttribute('id', breed);
                breedList.setAttribute('class', 'breed-list');
                document.getElementById('dog-breeds').appendChild(breedList);
            }
        }
    })
}
function refreshList() {
    const parent = document.getElementById('dog-breeds');
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}