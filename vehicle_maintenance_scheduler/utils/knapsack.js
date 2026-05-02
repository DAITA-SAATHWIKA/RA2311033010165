const { Log } = require('../../logging_middleware/logger');

const optimizeSchedule = async (mechanicHours, vehicles) => {
    await Log("backend", "debug", "domain", "Running scheduling algorithm");
    
    // DP 0/1 Knapsack
    // Maximize total Impact where total Duration <= mechanicHours.
    const W = Math.floor(mechanicHours);
    const n = vehicles.length;
    
    // Create DP table
    const dp = Array(n + 1).fill(null).map(() => Array(W + 1).fill(0));
    
    for (let i = 1; i <= n; i++) {
        for (let w = 0; w <= W; w++) {
            const task = vehicles[i - 1];
            // Support both camelCase and PascalCase
            const duration = Math.ceil(task.Duration || task.duration);
            const impact = task.Impact || task.impact;
            
            if (duration <= w) {
                dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - duration] + impact);
            } else {
                dp[i][w] = dp[i - 1][w];
            }
        }
    }
    
    // Backtrack to find selected vehicles
    let w = W;
    const selectedTasks = [];
    let totalImpact = 0;
    let totalDuration = 0;
    
    for (let i = n; i > 0 && w > 0; i--) {
        if (dp[i][w] !== dp[i - 1][w]) {
            const task = vehicles[i - 1];
            const duration = Math.ceil(task.Duration || task.duration);
            const impact = task.Impact || task.impact;
            
            // Reformat as required: taskId, duration, impact
            selectedTasks.push({
                taskId: task.TaskID || task.taskId || String(i),
                duration: duration,
                impact: impact
            });
            totalImpact += impact;
            totalDuration += duration;
            w -= duration;
        }
    }
    
    // Reverse to keep relative order (optional)
    return {
        selectedTasks: selectedTasks.reverse(),
        totalImpact,
        totalDuration
    };
};

module.exports = {
    optimizeSchedule
};
