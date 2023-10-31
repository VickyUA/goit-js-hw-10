const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = "live_757P5Tbc2KDNWZxWyBNUFmFfEn6ZiOrkR2q3PuRwoqPQzxZ2kZ8Mw5IcrhHolXFC";

export function fetchBreeds() {
    const END_POINT = '/breeds';
    const params = new URLSearchParams({
        api_key: API_KEY,
    });

    return fetch(`${BASE_URL}${END_POINT}?${params}`)
        .then((resp) => {
            if (!resp.ok) {
                throw new Error(resp.statusText);
            }
            return resp.json();
        });
};

export function fetchCatByBreed(breedId) {
    const END_POINT = '/images/search';
    const params = new URLSearchParams({
        breed_ids: breedId,
        api_key: API_KEY,
    });

    return fetch(`${BASE_URL}${END_POINT}?${params}`)
        .then((response) => {
        if (!response.ok) {
            throw new Error(response.statusText);
        }
        return response.json();
    })
};
