const url = 'https://api.thecatapi.com/v1';
const api_key = "live_LHGZzFAdl2BtnLwbomiBhyI4AhJ4vEuomKW1GU4SKThZJOslkkGvyivoWPM1mULY";

function fetchApi(url) {
    return fetch(url, {
      headers: {
        'x-api-key': api_key, 
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .catch(error => {
        console.error('Error:', error); 
        throw new Error('Oops! Something went wrong. Please try again later.'); 
      });
  }

export function fetchBreeds() {
  const url = 'https://api.thecatapi.com/v1/breeds';
  return fetchApi(url);
}

export function fetchCatByBreed(breedId) {
  const url = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;
  return fetchApi(url);
}
