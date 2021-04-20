
const fetchAd = (token) => {
    return fetch('http://localhost:3000/api/ads/serve/' + token, {
        method: 'GET'
    })
    .then(res => {
        return res.json();
    })
    .catch(err => {
        console.log(err);
    })
}

export default fetchAd;