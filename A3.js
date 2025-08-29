let target = "Pune"; // default city

// Function to fetch weather data
const fetchResults = async (city) => {
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=4a7376fa9a49426e952221029252808&q=${city}&aqi=no`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        console.log(data); // for debugging in console

        // Update DOM with API results
        document.querySelector(".temp p").innerText = data.current.temp_c + "°C";
        document.querySelector(".time_location p:first-child").innerText = data.location.name;

        // Format the date/time
        let date = new Date(data.location.localtime);
        let options = { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        document.querySelector(".time_location p:last-child").innerText = date.toLocaleString("en-US", options);

        document.querySelector(".condition p:last-child").innerText = data.current.condition.text;

    } catch (err) {
        console.error("Error fetching weather:", err);
        alert("Could not fetch weather. Please try again!");
    }
};

// Load default weather on page load
fetchResults(target);

// Add search functionality
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // prevent page refresh
    let city = document.querySelector(".search_area").value.trim();
    if (city !== "") {
        fetchResults(city);
    }
});
