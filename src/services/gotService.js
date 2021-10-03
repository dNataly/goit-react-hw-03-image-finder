const apiBase = "https://pixabay.com/api/";
const api_key = "22365607-cef5a2e8d771dec0544965281";
const images_per_page = "12";

function gotService(query, page = 1) {
  return fetch(`${apiBase}?q=${query}&page=${page}&key=${api_key}&image_type=photo&orientation=horizontal&per_page=${images_per_page}`).then((res) => {
    if (!res.ok) {
      throw new Error(`Could not fetch ${apiBase}, received ${res.status}`);
    }
    return res.json();
  });
}

export { gotService, images_per_page };
