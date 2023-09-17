import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from '../js/cat-api';

const breedSelect = document.querySelector('select.breed-select');
const catInfoDiv = document.querySelector('div.cat-info');
const loader = document.querySelector('p.loader');

function hideLoader() {
  loader.style.display = 'none';
  catInfoDiv.style.display = 'block';
}

function showBreedSelect() {
  breedSelect.style.display = 'block';
}

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}" >${breed.name}</option>`)
    .join('');
}

const error = document.querySelector('p.error');

function hideError() {
  error.style.display = 'none';
}

function showError() {
  error.style.display = 'block';
  Notiflix.Notify.failure('Oops! Something went wrong. Try reloading the page!');
}

function showCatInfo(cat) {
  const { name, description, temperament } = cat[0].breeds[0];

  const catInfoHTML = `<div class="cat">
    <img loading="eager" class="cat-img" src="${cat[0].url}" alt="${name} cat"> 
    <div class="cat-container">
      <h2>${name}</h2>
      <p><b>Description:</b> ${description}</p>
      <p><b>Temperament:</b> ${temperament}</p>
    </div>
  </div>`;

  catInfoDiv.innerHTML = catInfoHTML;
}

function handleBreedSelect(event) {
    loader.style.display = 'block';
    hideError(); 
  
    setTimeout(() => {
      const breedId = event.target.value;
      fetchCatByBreed(breedId)
        .then(cat => {
          showCatInfo(cat);
          hideLoader();
        })
        .catch(error => {
          console.error('Error:', error);
          showError();
        });
    }, 1000);
  }
  
  function init() {
    fetchBreeds()
      .then(breeds => {
        populateBreedSelect(breeds);
        showBreedSelect();
        breedSelect.addEventListener('change', handleBreedSelect);
        hideLoader();
      })
      .catch(() => {
        showError();
      });
  }
  
  init();
