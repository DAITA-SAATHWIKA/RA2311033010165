const axios = require('axios');
const BASE_URL = 'http://20.207.122.201/evaluation-service';
async function test() {
    try {
        const regRes = await axios.post(`${BASE_URL}/register`, {
            name: "ABCDEF",
            email: "s2@gmail.com",
            rollNo: "23",
            mobileNo: "1234567889",
            githubUsername: "ds",
            accessCode: "QkbpxH"
        });
        const { clientID, clientSecret } = regRes.data;
        console.log("Auth step...");
        const authRes = await axios.post(`${BASE_URL}/auth`, { clientID, clientSecret });
        const token = authRes.data.access_token;
        console.log("Got token!", token);
        
        console.log("Fetching depots...");
        const depots = await axios.get(`${BASE_URL}/depots`, { headers: { 'Authorization': `Bearer ${token}` }});
        console.log("Depots length:", depots.data.depots ? depots.data.depots.length : "No depots key", typeof depots.data);
        
        console.log("Fetching vehicles...");
        const vehicles = await axios.get(`${BASE_URL}/vehicles`, { headers: { 'Authorization': `Bearer ${token}` }});
        console.log("Vehicles length:", vehicles.data.vehicles ? vehicles.data.vehicles.length : "No vehicles key", typeof vehicles.data);

    } catch (e) {
        console.log("FAILED!", e.response ? e.response.data : e.message);
    }
}
test();
