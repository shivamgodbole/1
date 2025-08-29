let target = "Pune"; // default city

const fetchResults = async (city) => {
    try {
        let url = `https://api.weatherapi.com/v1/current.json?key=4a7376fa9a49426e952221029252808&q=${city}&aqi=no`;

        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Update DOM with API results
        document.querySelector(".temp p").innerText = data.current.temp_c + "°C";
        document.querySelector(".time_location p:first-child").innerText = data.location.name;
        document.querySelector(".time_location p:last-child").innerText = data.location.localtime;

        // Update condition text and icon
        document.querySelector(".condition p").innerText = data.current.condition.text;
        const icon = document.querySelector(".condition img");
        icon.src = "https:" + data.current.condition.icon;
        icon.style.display = "block";
        icon.alt = data.current.condition.text;

    } catch (err) {
        console.error("Error fetching weather:", err);
        alert("Could not fetch weather. Please try again!");
    }
};

fetchResults(target);

document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault();
    let city = document.querySelector(".search_area").value.trim();
    if (city !== "") {
        fetchResults(city);
    }
});