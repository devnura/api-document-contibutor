const {
    API_KEY_FOR_IVA
} = require('../../../config/secret')

const helper = async (params, trx) => {

    const location = window.location.hostname;
    const settings = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'API-key': API_KEY_FOR_IVA
        }
    };
    try {
        const fetchResponse = await fetch(`http://${location}:9000/api/sensors/`, settings);

        const data = await fetchResponse.json();

        return data;

    } catch (e) {
        
        return e;
    } 

    return rows
}

module.exports = helper;