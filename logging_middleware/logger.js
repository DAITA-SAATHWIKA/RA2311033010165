const axios = require('axios');

let bearerToken = null;

// Helper to inject token once authenticated
const setToken = (token) => {
    Log("backend", "debug", "domain", "Setting token in logger");
    bearerToken = token;
};

/**
 * Reusable logging module
 * @param {string} stack - Allowed: "backend"
 * @param {string} level - Allowed: "debug", "info", "warn", "error", "fatal"
 * @param {string} pkg - Allowed: "cache", "controller", "cron_job", "db", "domain"
 * @param {string} message - Any message
 */
const Log = async (stack, level, pkg, message) => {
    try {
        const payload = {
            stack,
            level,
            package: pkg,
            message
        };

        const config = {
            timeout: 1000 // Timeout requirement: 500-1000ms
        };

        if (bearerToken) {
            config.headers = {
                'Authorization': `Bearer ${bearerToken}`
            };
        }

        // Use axios to send log. Do not await strictly if not necessary, but here we await to ensure completion.
        await axios.post('http://20.207.122.201/evaluation-service/logs', payload, config);
    } catch (error) {
        // DO NOT use console.log anywhere per strict requirement.
        // Silently fail if logging fails to prevent app crash.
    }
};

module.exports = {
    Log,
    setToken
};
