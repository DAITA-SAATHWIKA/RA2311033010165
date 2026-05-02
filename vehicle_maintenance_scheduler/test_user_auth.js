const axios = require('axios');
const BASE_URL = 'http://20.207.122.201/evaluation-service';
async function test() {
    try {
        const regRes = await axios.post(`${BASE_URL}/register`, {
            name: "ABCDEF",
            email: "s2@gmail.com",
            rollNo: "24",
            mobileNo: "1234567888",
            githubUsername: "ds123",
            accessCode: "QkbpxH"
        });
        console.log("SUCCESS!", regRes.data);
    } catch (e) {
        console.log("FAILED!", e.response ? e.response.data : e.message);
    }
}
test();
