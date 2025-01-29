const peakPricesAndId = {
    "bowling": {
        "1_game_adult": { price: "£8.00", pid: "118687037" },
        "1_game_child": { price: "£5.50", pid: "118687182" },
        "1_game_family": { price: "£22.50", pid: "35754926" },
        "2_games_adult": { price: "£16.00", pid: "118688024" },
        "2_games_child": { price: "£11.00", pid: "118688026" },
        "2_games_family": { price: "£45.00", pid: "54599082" },
    },
    "darts": {
        "30_minutes": { price: "£9.00", pid: "118688034" },
        "60_minutes": { price: "£15.00", pid: "118688037" },
    },
    "shuffleboard": {
        "30_minutes": { price: "£20.00", pid: "118688030" },
        "60_minutes": { price: "£30.00", pid: "118688032" },
    },
    "pool": {
        "30_minutes": { price: "£X.XX", pid: "122151080" },
        "60_minutes": { price: "£X.XX", pid: "122152923" },
    },
};

// Helper function to check if the date is in the peak date range
function isPeakDate(date) {
    const peakDates = [
        "2025-02-24", "2025-02-25", "2025-02-26", "2025-02-27", "2025-02-28",
        "2025-04-14", "2025-04-15", "2025-04-16", "2025-04-17", "2025-04-18",
        "2025-04-21", "2025-04-22", "2025-04-23", "2025-04-24", "2025-04-25",
        "2025-05-05", "2025-05-26", "2025-05-27", "2025-05-28", "2025-05-29", "2025-05-30",
        "2025-07-22", "2025-07-23", "2025-07-24", "2025-07-25", "2025-07-26",
        "2025-07-27", "2025-07-28", "2025-07-29", "2025-07-30", "2025-07-31"
    ];
    return peakDates.includes(date);
}

// Update pricing and IDs dynamically for a given date
function updatePricing(dte) {
    const date = new Date(dte).toISOString().split("T")[0]; // Format date as YYYY-MM-DD

    if (isPeakDate(date)) {
        for (const activity in peakPricesAndIds) {
            for (const key in peakPricesAndIds[activity]) {
                const priceData = peakPricesAndIds[activity][key];
                const className = `${activity}-${key.replace(/_/g, "-")}`;
                const priceElements = document.querySelectorAll(`.${className} .btn-time small`);
                const categoryElements = document.querySelectorAll(`.${className} a.category`);

                // Update price
                if (priceElements.length > 0) {
                    priceElements.forEach((priceElement) => {
                        priceElement.innerHTML = `${priceData.price}/P<i class='ml-1 d-none'>P</i><i>erson</i>`;
                    });
                }

                // Update PID
                if (categoryElements.length > 0) {
                    categoryElements.forEach((categoryElement) => {
                        categoryElement.setAttribute("pid", priceData.pid);
                    });
                }
            }
        }
    }
}

// Example Usage:
const date = "2025-02-24"; // Replace with the actual date
updatePricing(dte);