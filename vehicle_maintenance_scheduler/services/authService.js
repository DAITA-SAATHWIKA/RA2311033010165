const axios = require('axios');
const { setToken, Log } = require('../../logging_middleware/logger');

let clientID = null;
let clientSecret = null;
let accessToken = null;

const BASE_URL = 'http://20.207.122.201/evaluation-service';

const initAuth = async () => {
    await Log("backend", "info", "domain", "Starting authentication flow");

    try {
        await Log("backend", "debug", "domain", "Skipping /register because rollNo already exists. Using cached credentials.");
        // We already successfully registered once, and the API blocks re-registering the same rollNo.
        // So we hardcode the credentials we received from that successful registration:
        clientID = '57f1d3f7-5e77-4d8f-b616-d4e9b6442b80';
        clientSecret = 'aZDEEhcJSXXudfFJ';

        await Log("backend", "info", "domain", "Successfully loaded credentials");

        await Log("backend", "debug", "domain", "Calling /auth");
        // Step 2: Auth
        const authRes = await axios.post(`${BASE_URL}/auth`, {
            name: "ABCDEF",
            email: "s@gmail.com",
            rollNo: "23",
            mobileNo: "1234567889",
            githubUsername: "ds",
            accessCode: "QkbpxH",
            clientID,
            clientSecret
        }, { timeout: 10000 });

        accessToken = authRes.data.access_token;
        setToken(accessToken);

        await Log("backend", "info", "domain", "Successfully authenticated");
    } catch (error) {
        await Log("backend", "error", "domain", "Authentication flow failed");
        throw error;
    }
};

const getAccessToken = () => {
    Log("backend", "debug", "domain", "Retrieving access token");
    return accessToken;
};

module.exports = {
    initAuth,
    getAccessToken
};
