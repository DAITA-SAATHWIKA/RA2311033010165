const { Log } = require('../../logging_middleware/logger');
const { fetchDepots, fetchVehicles } = require('../services/dataService');
const { initAuth } = require('../services/authService');
const { optimizeSchedule } = require('../utils/knapsack');

const getSchedule = async (req, res) => {
    await Log("backend", "info", "controller", "Processing /schedule request");

    try {
        // Refresh token on every request because it expires quickly
        await initAuth();

        // Fetch data in parallel
        await Log("backend", "debug", "domain", "Fetching depots and vehicles in parallel");
        const [depots, vehicles] = await Promise.all([
            fetchDepots(),
            fetchVehicles()
        ]);

        if (!depots || !vehicles || !Array.isArray(depots) || !Array.isArray(vehicles)) {
            await Log("backend", "error", "controller", "Failed to retrieve necessary data");
            return res.status(500).json({ error: "Failed to fetch data" });
        }

        const results = [];

        for (const depot of depots) {
            const depotId = depot.ID || depot.id;
            const mechanicHours = depot.MechanicHours || depot.mechanicHours || 0;
            await Log("backend", "debug", "domain", `Scheduling for depot ${depotId}`);
            
            // Knapsack DP
            const schedule = await optimizeSchedule(mechanicHours, vehicles);

            results.push({
                depotId: depotId,
                selectedTasks: schedule.selectedTasks,
                totalImpact: schedule.totalImpact,
                totalDuration: schedule.totalDuration
            });
        }

        await Log("backend", "info", "controller", "Successfully generated schedule");

        return res.json({ results });

    } catch (error) {
        await Log("backend", "error", "controller", "Failed to process schedule");
        return res.status(500).json({ error: "Internal server error" });
    }
};

module.exports = {
    getSchedule
};
