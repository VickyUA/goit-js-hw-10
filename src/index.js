import { fetchBreeds, fetchCatByBreed } from './cat-api.js'
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';

const select = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

select.addEventListener('change', onSelect);

fetchBreeds()
    .then(breeds => {
        select.innerHTML = selectMarkup(breeds);
        new SlimSelect({
            select: select,
            settings: {
                placeholderText: 'Choose a cat )',
            },
        });
    })
    .catch((err) => {
        console.error(err);        
        Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
    })
    .finally(() => loader.style.display = 'none')

function selectMarkup(breedsArr) {
    const result = breedsArr.map(
        ({ id, name }) => `<option value="${id}">${name}</option>`
    );
    result.unshift(`<option data-placeholder="true"></option>`);
    return result.join('');
};

function onSelect(evt) {
    loader.style.display = 'initial';
    catInfo.style.display = 'none'
    
    const breedId = evt.target.value;

    fetchCatByBreed(breedId)
        .then(catData => {
            catInfo.style.display = 'flex';
            catInfo.innerHTML = createCatCardMarkup(catData);
        })
        .catch((err) => {
            catInfo.style.display = 'none';
            console.error(err);
            Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
        })
        .finally(() => loader.style.display = 'none');
}

function createCatCardMarkup(catData) {
    const {url, breeds } = catData[0];
    const { name, description, temperament } = breeds[0];

    return `
      <img class="photo" src="${url}" alt="${name}">
      <div class="text">
      <h1>${name}</h1>
      <p>${description}</p>
      <p>Temperament: ${temperament}</p>
      </div>`; 
}