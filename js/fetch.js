
const fetchAd = (token) => {
    return fetch('http://localhost:3000/api/ads/serve/' + token, {
        method: 'GET'
    })
    .then(res => { 
        return res.json();
    })
    .catch(err => {
        throw new Error('Error Fetching Ad!');
    })
}

export default fetchAd;