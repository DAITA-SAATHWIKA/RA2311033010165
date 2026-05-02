const axios = require('axios');

const BASE_URL = 'http://20.207.122.201/evaluation-service';

async function test() {
    try {
        console.log("Registering...");
        const regRes = await axios.post(`${BASE_URL}/register`, {
            name: "Test User",
            email: "test@example.com",
            rollNo: "12345678",
            mobileNo: "9876543210",
            githubUsername: "testuser123",
            accessCode: "acc123"
        });
        console.log("Register response:", regRes.data);

        const { clientID, clientSecret } = regRes.data;

        console.log("Authenticating...");
        const authRes = await axios.post(`${BASE_URL}/auth`, {
            clientID,
            clientSecret
        });
        console.log("Auth response:", authRes.data);

        const token = authRes.data.access_token;

        console.log("Fetching Depots...");
        const depotsRes = await axios.get(`${BASE_URL}/depots`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        console.log("Depots response keys:", Object.keys(depotsRes.data));
        console.log("Depots sample:", JSON.stringify(depotsRes.data).substring(0, 100));

    } catch (error) {
        console.error("Error occurred:");
        if (error.response) {
            console.error(error.response.status, error.response.data);
        } else {
            console.error(error.message);
        }
    }
}

test();
