// console.log('%c HI', 'color: firebrick')

const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
const breedUrl = "https://dog.ceo/api/breeds/list/all";

document.addEventListener('click', function(event) {
    clickedOn = event.target;
    if (clickedOn.className === "breed-list") {
        console.log(clickedOn.id);
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
            document.getElementById('dog-image-container').appendChild(img);
        })
    })
    loadBreed();
})

function loadBreed() {
    fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        // let breedList = (data.message);
        for (breed in data.message) {
            let breedList = document.createElement('li');
            breedList.textContent = breed;
            breedList.setAttribute('id', breed);
            breedList.setAttribute('class', 'breed-list');
            document.getElementById('dog-breeds').appendChild(breedList);
        }
    })
}