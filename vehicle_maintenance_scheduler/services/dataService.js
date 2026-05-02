const axios = require('axios');
const { Log } = require('../../logging_middleware/logger');
const { getAccessToken } = require('./authService');

const BASE_URL = 'http://20.207.122.201/evaluation-service';

const getHeaders = () => {
    Log("backend", "debug", "domain", "Generating auth headers");
    return {
        'Authorization': `Bearer ${getAccessToken()}`
    };
};

const fetchDepots = async () => {
    await Log("backend", "info", "controller", "Fetching depots");
    try {
        const response = await axios.get(`${BASE_URL}/depots`, {
            headers: getHeaders(),
            timeout: 1000
        });
        await Log("backend", "info", "controller", "Successfully fetched depots");
        return response.data.depots || response.data;
    } catch (error) {
        await Log("backend", "error", "controller", "Failed to fetch depots");
        return []; // Handle failures gracefully
    }
};

const fetchVehicles = async () => {
    await Log("backend", "info", "controller", "Fetching vehicles");
    try {
        const response = await axios.get(`${BASE_URL}/vehicles`, {
            headers: getHeaders(),
            timeout: 1000
        });
        await Log("backend", "info", "controller", "Successfully fetched vehicles");
        return response.data.vehicles || response.data;
    } catch (error) {
        await Log("backend", "error", "controller", "Failed to fetch vehicles");
        return []; // Handle failures gracefully
    }
};

module.exports = {
    fetchDepots,
    fetchVehicles
};
