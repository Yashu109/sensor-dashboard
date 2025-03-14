// const apiKey = "AIzaSyCsNPnFon8DrdseyJPPbmMAO27IRRN4sw0";
// const sheetId = "1dD3OotChqeogNTlQ1Bqdcpti9Z79B5gYg0yt4hbKQx0";
// const weatherApiKey = "eaf2e165d05bb27d14be627793ae5317";

// function login() {
//     const username = document.getElementById('username').value;
//     const password = document.getElementById('password').value;
//     const errorMessage = document.getElementById('error-message');

//     if (username === "sphere" && password === "123") {
//         document.getElementById('login-container').style.display = 'none';
//         document.getElementById('vehicle-container').style.display = 'flex';

//         // Automatically fetch data every 10 seconds after login
//         setInterval(() => {
//             fetchAndUpdateData();
//         }, 10000);

//         // Initial fetch
//         fetchAndUpdateData();
//     } else {
//         errorMessage.textContent = 'Invalid username or password';
//     }
// }

// // Fetch data from Google Sheets
// async function fetchGoogleSheetData() {
//     // Replace with your actual Google Sheets fetching logic
//     return Promise.resolve({
//         temp: 22,
//         humidity: 65,
//         h2o: 2.5,
//         n: 0.35,
//         p: 0.75,
//         k: 0.46,
//         ph: 6.5,
//     });
// }

// // async function fetchGoogleSheetData() {
// //     const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
// //     try {
// //         const response = await fetch(url);
// //         const data = await response.json();
// //         console.log("API Response:", data);  // Log the full response
// //         if (!data.values || data.values.length === 0) {
// //             throw new Error('No data found in spreadsheet');
// //         }

// //         const rows = data.values.slice(1); // Exclude the header row
// //         const latestRow = rows[rows.length - 1]; // Get the latest row of data

// //         return {
// //             temp: parseFloat(latestRow[2]),     // Temperature
// //             humidity: parseFloat(latestRow[3]), // Humidity
// //             h2o: parseFloat(latestRow[4]),      // Soil moisture
// //             n: parseFloat(latestRow[5]),        // Nitrogen (N)
// //             p: parseFloat(latestRow[6]),        // Phosphorus (P)
// //             k: parseFloat(latestRow[7]),        // Potassium (K)
// //             ph: parseFloat(latestRow[8]),       // pH value
// //         };
// //     } catch (error) {
// //         console.error('Error fetching data:', error);
// //         throw error;
// //     }
// // }


// function fetchCurrentTemperature() {
//     const city = "Bengaluru";
//     const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
//     return fetch(url)
//         .then(response => response.json())
//         .then(data => {
//             if (!data.main || typeof data.main.temp === "undefined") {
//                 throw new Error("Temperature data not available");
//             }
//             return data.main.temp;
//         });
// }

// function fetchAndUpdateData() {
//     const errorMessage = document.getElementById('vehicle-error-message');
//     errorMessage.textContent = "";

//     fetchGoogleSheetData()
//         .then(row => {
//             fetchCurrentTemperature()
//                 .then(temp => {
//                     displayVehicleData(row, temp);
//                     displaySpreadsheetData(row, temp);
//                     renderSeparateGraphs(row, temp);
//                 })
//                 .catch(error => {
//                     errorMessage.textContent = 'Error fetching weather data.';
//                 });
//         })
//         .catch(error => {
//             errorMessage.textContent = 'Error fetching data. Please try again.';
//         });
// }

// function displayVehicleData(row, currentTemp) {
//     const currentTime = new Date().toLocaleTimeString(); // Get current system time

//     document.getElementById('vehicle-data').innerHTML = `
//        <div class="card temp">
//             <img src="https://img.icons8.com/fluency/48/thermometer.png" alt="Temperature Icon">
//             <h3>Temperature</h3>
//             <p>Recorded: ${row.temp} °C</p>
//             <p>Current: ${currentTemp} °C</p>
//         </div>
//         <div class="card time">
//             <img src="https://img.icons8.com/fluency/48/clock.png" alt="Time Icon">
//             <h3>Time</h3>
//             <p>${currentTime}</p>
//         </div>
//         <div class="card co2">
//             <img src="https://img.icons8.com/?size=100&id=HlPQGB87sVT3&format=png&color=000000" alt="CO2 Icon">
//             <h3>Humidity</h3>
//             <p>${row.humidity}</p>
//         </div>
//         <div class="card h2o">
//             <img src="https://img.icons8.com/fluency/48/water.png" alt="H2O Icon">
//             <h3>Soil Moisture</h3>
//             <p>${row.h2o}</p>
//         </div>
//         <div class="card N">
//             <img src="https://cdn3.iconfinder.com/data/icons/pollution-indigo-vol-2/256/nitrogen_dioxide_no2-512.png" alt="NO2 Icon">
//             <h3>N(Nitrogen)</h3>
//             <p>${row.n} %</p>
//         </div>
//         <div class="card P">
//             <img src="https://img.icons8.com/fluency/48/cloud.png" alt="Turbidity Icon">
//             <h3>P(Phosphorous)</h3>
//             <p>${row.p} %</p>
//         </div>
//         <div class="card K">
//             <img src="https://img.icons8.com/fluency/48/cloud.png" alt="Turbidity Icon">
//             <h3>K(Potassium)</h3>
//             <p>${row.k} %</p>
//         </div>
//         <div class="card ph">
//             <img src="https://img.icons8.com/fluency/48/flask.png" alt="pH Icon">
//             <h3>pH</h3>
//             <p>${row.ph}</p>
//         </div>
//     `;
// }

// function displaySpreadsheetData(row, currentTemp) {
//     const currentTime = new Date().toLocaleTimeString(); // Get current system time

//     const tableBody = document.getElementById('vehicle-table-body');
//     tableBody.innerHTML = `
//         <tr>
//             <td>Temperature (Recorded)</td>
//             <td>${row.temp} °C</td>
//         </tr>
//         <tr>
//             <td>Temperature (Current)</td>
//             <td>${currentTemp} °C</td>
//         </tr>
//         <tr>
//             <td>Time</td>
//             <td>${currentTime}</td>
//         </tr>
//         <tr>
//             <td>Humidity</td>
//             <td>${row.humidity}</td>
//         </tr>
//         <tr>
//             <td>Soil Moisture</td>
//             <td>${row.h2o}</td>
//         </tr>
//         <tr>
//             <td>Nitrogen</td>
//             <td>${row.n} %</td>
//         </tr>
//         <tr>
//             <td>Phosphorous</td>
//             <td>${row.p} %</td>
//         </tr>
//         <tr>
//             <td>Potassium</td>
//             <td>${row.k} %</td>
//         </tr>
//         <tr>
//             <td>pH</td>
//             <td>${row.ph}</td>
//         </tr>
//     `;
//     document.getElementById('vehicle-table').style.display = 'block';

//     // Call to render graph
//     renderGraph(row, currentTemp);
// }

// function renderGraph(row, temp) {
//     const graphContainer = document.getElementById("graph-container");
//     const ctx = document.getElementById("vehicleChart").getContext("2d");

//     // Make the graph container visible
//     graphContainer.style.display = "block";

//     // Destroy any existing chart to avoid overlap
//     if (window.vehicleChartInstance) {
//         window.vehicleChartInstance.destroy();
//     }

//     // Ensure all values are numbers and fallback to 0 if undefined or invalid
//     const labels = [
//         "Temperature (Recorded)",
//         "Temperature (Current)",
//         "Humidity",
//         "Soil Moisture",
//         "Nitrogen",
//         "Phosphorous",
//         "Potassium",
//         "pH"
//     ];
//     const data = [
//         Number(row.temp) || 0,
//         Number(temp) || 0,
//         Number(row.humidity) || 0,
//         Number(row.h2o) || 0,
//         Number(row.n) || 0,
//         Number(row.p) || 0,
//         Number(row.k) || 0,
//         Number(row.ph) || 0
//     ];

//     console.log("Chart Labels:", labels);
//     console.log("Chart Data:", data);

//     // Initialize the new chart instance
//     window.vehicleChartInstance = new Chart(ctx, {
//         type: "line",
//         data: {
//             labels: labels,
//             datasets: [
//                 {
//                     label: "Metrics",
//                     data: data,
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     backgroundColor: "rgba(75, 192, 192, 0.2)",
//                     borderWidth: 2,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     display: true,
//                     position: "top",
//                 },
//             },
//             scales: {
//                 y: {
//                     beginAtZero: true,
//                 },
//             },
//         },
//     });
// }

// function renderSeparateGraphs(row, currentTemp) {
//     const metrics = ["temp", "humidity", "h2o", "n", "p", "k", "ph"];
//     metrics.forEach(metric => {
//         const ctx = document.getElementById(`${metric}-graph`).getContext('2d');
//         new Chart(ctx, {
//             type: 'bar',
//             data: {
//                 labels: ['Recorded', 'Current'],
//                 datasets: [
//                     {
//                         label: metric,
//                         data: [row[metric], metric === 'temp' ? currentTemp : row[metric]],
//                         backgroundColor: [
//                             'rgba(255, 99, 132, 0.2)',
//                             'rgba(54, 162, 235, 0.2)',
//                         ],
//                         borderColor: [
//                             'rgba(255, 99, 132, 1)',
//                             'rgba(54, 162, 235, 1)',
//                         ],
//                         borderWidth: 1
//                     }
//                 ]
//             },
//             options: {
//                 scales: {
//                     y: {
//                         beginAtZero: true
//                     }
//                 }
//             }
//         });
//     });
// }


// function renderSeparateGraphs(row, currentTemp) {
//     // Ensure the container is visible
//     document.getElementById("separate-graphs-container").style.display = "grid";

//     // Temperature Graph (Updated to show both Recorded and Current Temperature with fine-grained details)
//     // Temperature Graph (Enhanced)
//     const tempCtx = document.getElementById("tempGraph").getContext("2d");
//     new Chart(tempCtx, {
//         type: "line",
//         data: {
//             labels: ["Recorded Temperature", "Current Temperature"],
//             datasets: [
//                 {
//                     label: "Recorded Temperature (°C)",
//                     data: [parseFloat(row.temp)], // Recorded Temperature
//                     borderColor: "rgba(255, 99, 132, 1)", // Bright red
//                     pointBackgroundColor: "rgba(255, 99, 132, 1)",
//                     pointBorderColor: "rgba(255, 99, 132, 1)",
//                     backgroundColor: "rgba(255, 99, 132, 0.2)", // Light fill
//                     borderWidth: 3,
//                     pointRadius: 6,
//                     tension: 0.4,
//                 },
//                 {
//                     label: "Current Temperature (°C)",
//                     data: [parseFloat(currentTemp)], // Current Temperature
//                     borderColor: "rgba(54, 162, 235, 1)", // Bright blue
//                     pointBackgroundColor: "rgba(54, 162, 235, 1)",
//                     pointBorderColor: "rgba(54, 162, 235, 1)",
//                     backgroundColor: "rgba(54, 162, 235, 0.2)", // Light fill
//                     borderWidth: 3,
//                     pointRadius: 6,
//                     tension: 0.4,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     display: true,
//                     position: "top",
//                     labels: {
//                         color: "#000",
//                         font: { size: 14, weight: "bold" },
//                     },
//                 },
//                 tooltip: {
//                     callbacks: {
//                         label: (context) =>
//                             `${context.dataset.label}: ${context.raw.toFixed(2)} °C`,
//                     },
//                 },
//             },
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: "Temperature Type",
//                         color: "#333",
//                         font: { size: 14 },
//                     },
//                     grid: { color: "rgba(200, 200, 200, 0.2)" },
//                 },
//                 y: {
//                     beginAtZero: false,
//                     title: {
//                         display: true,
//                         text: "Temperature (°C)",
//                         color: "#333",
//                         font: { size: 14 },
//                     },
//                     ticks: {
//                         stepSize: 0.5,
//                         callback: (value) => `${value.toFixed(1)} °C`,
//                     },
//                     grid: { color: "rgba(200, 200, 200, 0.2)" },
//                 },
//             },
//         },
//     });

//     // CO2 Graph (Enhanced)
//     const co2Ctx = document.getElementById("co2Graph").getContext("2d");
//     new Chart(co2Ctx, {
//         type: "line",
//         data: {
//             labels: ["Data Point 1", "Data Point 2", "Data Point 3"],
//             datasets: [
//                 {
//                     label: "Humidity (ppm)",
//                     data: [
//                         parseFloat(row.humidity),
//                         parseFloat(row.humidity) + 10,
//                         parseFloat(row.humidity) - 5,
//                     ],
//                     borderColor: "rgba(54, 162, 235, 1)",
//                     backgroundColor: "rgba(54, 162, 235, 0.1)",
//                     borderWidth: 3,
//                     pointRadius: 4,
//                     tension: 0.4,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     labels: {
//                         color: "#000",
//                         font: { size: 14, weight: "bold" },
//                     },
//                 },
//             },
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: "Data Points",
//                         color: "#333",
//                         font: { size: 14 },
//                     },
//                     grid: { color: "rgba(200, 200, 200, 0.2)" },
//                 },
//                 y: {
//                     beginAtZero: true,
//                     title: {
//                         display: true,
//                         text: "Humidity (ppm)",
//                         color: "#333",
//                         font: { size: 14 },
//                     },
//                     grid: { color: "rgba(200, 200, 200, 0.2)" },
//                 },
//             },
//         },
//     });

//     // H2O Graph (Enhanced)
//     const h2oCtx = document.getElementById("h2oGraph").getContext("2d");
//     new Chart(h2oCtx, {
//         type: "line",
//         data: {
//             labels: ["Data Point 1", "Data Point 2", "Data Point 3"],
//             datasets: [
//                 {
//                     label: "Soil Moisture (%)",
//                     data: [
//                         parseFloat(row.h2o),
//                         parseFloat(row.h2o) + 5,
//                         parseFloat(row.h2o) - 3,
//                     ],
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     backgroundColor: "rgba(75, 192, 192, 0.1)",
//                     borderWidth: 3,
//                     pointRadius: 4,
//                     tension: 0.4,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     labels: {
//                         color: "#000",
//                         font: { size: 14, weight: "bold" },
//                     },
//                 },
//             },
//             scales: {
//                 x: {
//                     title: {
//                         display: true,
//                         text: "Data Points",
//                         color: "#333",
//                         font: { size: 14 },
//                     },
//                     grid: { color: "rgba(200, 200, 200, 0.2)" },
//                 },
//                 y: {
//                     beginAtZero: true,
//                     title: {
//                         display: true,
//                         text: "Soil Moisture (%)",
//                         color: "#333",
//                         font: { size: 14 },
//                     },
//                     grid: { color: "rgba(200, 200, 200, 0.2)" },
//                 },
//             },
//         },
//     });

//     // NO2 Graph (Enhanced Pie Chart)
//     const no2Ctx = document.getElementById("no2Graph").getContext("2d");
//     new Chart(no2Ctx, {
//         type: "line",
//         data: {
//             labels: ["Nitrogen Level"],
//             datasets: [
//                 {
//                     label: "N (%)",
//                     data: [parseFloat(row.n)],
//                     backgroundColor: ["rgba(255, 205, 86, 0.8)"],
//                     borderColor: ["rgba(255, 205, 86, 1)"],
//                     borderWidth: 2,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             plugins: {
//                 legend: {
//                     labels: {
//                         color: "#000",
//                         font: { size: 14, weight: "bold" },
//                     },
//                 },
//             },
//         },
//     });

//     // Turbidity Graph
//     const turbidityCtx = document.getElementById("turbidityGraph").getContext("2d");
//     new Chart(turbidityCtx, {
//         type: "line",
//         data: {
//             labels: ["Phosphorous"],
//             datasets: [
//                 {
//                     label: "Turbidity (NTU)",
//                     data: [parseFloat(row.p)],
//                     borderColor: "rgba(255, 159, 64, 1)",
//                     backgroundColor: "rgba(255, 159, 64, 0.2)",
//                     borderWidth: 3,
//                     pointRadius: 5,
//                     tension: 0.4,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 x: { title: { display: true, text: "Data Points" } },
//                 y: { title: { display: true, text: "Turbidity (NTU)" }, beginAtZero: true },
//             },
//         },
//     });

//     // pH Graph
//     const phCtx = document.getElementById("phGraph").getContext("2d");
//     new Chart(phCtx, {
//         type: "line",
//         data: {
//             labels: ["pH"],
//             datasets: [
//                 {
//                     label: "pH",
//                     data: [parseFloat(row.ph)],
//                     borderColor: "rgba(75, 192, 192, 1)",
//                     backgroundColor: "rgba(75, 192, 192, 0.2)",
//                     borderWidth: 3,
//                     pointRadius: 5,
//                     tension: 0.4,
//                 },
//             ],
//         },
//         options: {
//             responsive: true,
//             scales: {
//                 x: { title: { display: true, text: "Data Points" } },
//                 y: { title: { display: true, text: "pH" }, beginAtZero: false },
//             },
//         },
//     });
// }

// let updateInterval; // To store interval reference



// // Adjust ranges based on selected months
// function adjustRangesForMonths(ranges, monthFactor) {
//     Object.keys(ranges).forEach((param) => {
//         const range = ranges[param];
//         if (range.min && range.max) {
//             range.min = (range.min * monthFactor).toFixed(2);
//             range.max = (range.max * monthFactor).toFixed(2);
//         }
//     });
//     return ranges;
// }


// function updateRecordedRanges() {
//     const selectedMonth = document.getElementById("month-dropdown1").value;
//     const selectedCrop = document.getElementById("result-dropdown").value;

//     if (!selectedMonth) {
//         console.log("Please select a month.");
//         alert("Please select a month.");
//         return;
//     }

//     if (!selectedCrop) {
//         console.log("Please select a crop.");
//         alert("Please select a crop.");
//         return;
//     }

//     const recordedRanges = getRecordedRanges();
//     const monthFactor = selectedMonth / 12;
//     if (recordedRanges[selectedCrop]) {

//         Object.keys(recordedRanges[selectedCrop]).forEach((param) => {
//             const range = recordedRanges[selectedCrop][param];
//             if (range.min !== undefined && range.max !== undefined) {
//                 range.min = Math.round(range.min * monthFactor);
//                 range.max = Math.round(range.max * monthFactor);
//             }
//         });

//         console.log("Updated recorded ranges for " + selectedCrop + ":", recordedRanges[selectedCrop]);

//         // Update the "Recorded Range" column in the table
//         const tableRows = document.querySelectorAll("#result-table tbody tr");
//         tableRows.forEach((row) => {
//             const paramCell = row.querySelector("td:first-child");
//             if (paramCell) {
//                 const paramName = paramCell.textContent.toLowerCase(); // Match the parameter name in lowercase
//                 if (recordedRanges[selectedCrop][paramName]) {
//                     const range = recordedRanges[selectedCrop][paramName];
//                     const recordedRangeCell = row.querySelector("td:nth-child(2)");
//                     if (recordedRangeCell) {
//                         recordedRangeCell.textContent = `${range.min} - ${range.max} ${range.unit}`; // Update recorded range cell
//                     }
//                 }
//             }
//         });
//     } else {
//         console.log("Invalid crop selection.");
//         alert("Invalid crop selection. Please try again.");
//     }
// }
// function getRecordedRanges() {
//     return {
//         Tomato: {
//             temp: { min: 20, max: 25, unit: "°C" },
//             co2: { min: 60, max: 70, unit: "%" },
//             h2o: { min: 2, max: 3, unit: "%" },
//             no2: { min: 0.3, max: 0.4, unit: "ppm" },
//             turbidity: { min: 0.7, max: 0.8, unit: "NTU" },
//             ph: { min: 6.0, max: 6.8, unit: "" },
//             soil: "Red soil",
//         },
//         Apple: {
//             temp: { min: 18, max: 21, unit: "°C" },
//             co2: { min: 85, max: 95, unit: "%" },
//             h2o: { min: 2, max: 3, unit: "%" },
//             no2: { min: 0.33, max: 0.5, unit: "ppm" },
//             turbidity: { min: 0.7, max: 0.8, unit: "NTU" },
//             ph: { min: 5.0, max: 6.5, unit: "" },
//             soil: "Loamy soil",
//         },
//         Carrot: {
//             temp: { min: 20, max: 25, unit: "°C" },
//             co2: { min: 50, max: 60, unit: "%" },
//             h2o: { min: 4, max: 5, unit: "%" },
//             no2: { min: 0.4, max: 0.5, unit: "ppm" },
//             turbidity: { min: 0.5, max: 0.8, unit: "NTU" },
//             ph: { min: 6.0, max: 7.0, unit: "" },
//             soil: "Sandy loam", 
//         },
//         Brinjal: {
//             temp: { min: 25, max: 35, unit: "°C" },
//             humidity: { min: 70, max: 85, unit: "%" },
//             h2o: { min: 4, max: 5, unit: "%" },
//             n: { min: 14, max: 15, unit: "ppm" },
//             p: { min: 25, max: 38, unit: "NTU" },
//             k: { min: 27, max: 28, unit: "NTU" },
//             ph: { min: 6.0, max: 7.0, unit: "" },
//             soil:"Sandy loam",
//         },
//         Watermelan: {
//             temp: { min: 15, max: 20, unit: "°C" },
//             humidity: { min: 30, max: 50, unit: "%" },
//             h2o: { min: 4, max: 5, unit: "%" },
//             n: { min: 24, max: 35, unit: "ppm" },
//             p: { min: 15, max: 28, unit: "NTU" },
//             k: { min: 15, max: 38, unit: "NTU" },
//             ph: { min: 6.0, max: 7.0, unit: "" },
//             soil:"Sandy loam",
//         },
//     };
// }

// // Function to simulate getting the recorded ranges for the crops
// function updateResults() {
//     const selectedOption = document.getElementById("result-dropdown").value;

//     // Debug: Check if selectedOption is valid
//     console.log("Selected crop:", selectedOption);
    
//     if (!selectedOption || !recordedRanges[selectedOption]) {
//         console.error("Invalid crop selected or crop data missing.");
//         document.getElementById("result-table-container").classList.add("hidden");
//         return;
//     }

//     // Display the suitable soil type for the selected crop
//     const soilType = recordedRanges[selectedOption];
//     document.getElementById("soil-type").textContent = `Soil type: ${soilType}`;
// console.log(soilType,'soiltype')
//     // Clear existing interval
//     if (updateInterval) clearInterval(updateInterval);

//     const updateData = () => {
//         fetchGoogleSheetData()
//             .then((currentData) => {
//                 const selectedMonths = parseInt(document.getElementById("month-dropdown1").value, 10) || 12;
//                 const monthFactor = selectedMonths / 12;

//                 const ranges = adjustRangesForMonths(
//                     JSON.parse(JSON.stringify(recordedRanges[selectedOption])), // Deep copy the crop's ranges
//                     monthFactor
//                 );

//                 console.log(ranges, 'Ranges for selected crop');

//                 const tableBody = document.querySelector("#result-table tbody");
//                 tableBody.innerHTML = ""; // Clear previous rows

//                 let outOfRangeMessages = [];

//                 Object.keys(ranges).forEach((param) => {
//                     const { min, max, unit, lowImage, highImage, action } = ranges[param];
//                     const currentValue = parseFloat(currentData[param]);
//                     const isInRange = currentValue >= min && currentValue <= max;

//                     if (currentValue < min) {
//                         outOfRangeMessages.push({
//                             image: lowImage,
//                             message: `${param.toUpperCase()} is less than the minimum acceptable range (${min} ${unit}).`,
//                             action: action
//                         });
//                     } else if (currentValue > max) {
//                         outOfRangeMessages.push({
//                             image: highImage,
//                             message: `${param.toUpperCase()} is more than the maximum acceptable range (${max} ${unit}).`,
//                             action: action
//                         });
//                     }

//                     const row = document.createElement("tr");
//                     row.innerHTML = `
//                         <td>${param.toUpperCase()}</td>
//                         <td>${min} - ${max} ${unit}</td>
//                         <td class="${isInRange ? "green" : "red"}">${currentValue} ${unit}</td>
//                     `;
//                     tableBody.appendChild(row);
//                 });

//                 const outOfRangeContainer = document.getElementById("out-of-range-messages");
//                 outOfRangeContainer.innerHTML = ''; 

//                 if (outOfRangeMessages.length > 0) {
//                     outOfRangeMessages.forEach(({ image, message, action }) => {
//                         const messageElement = document.createElement("div");
//                         messageElement.classList.add("out-of-range-message");

//                         const imageElement = document.createElement("img");
//                         imageElement.src = image;
//                         imageElement.style.width = "300px";
//                         imageElement.style.height = "300px";

//                         const messageText = document.createElement("p");
//                         messageText.textContent = message;

//                         const actionText = document.createElement("p");
//                         actionText.textContent = `Action: ${action}`;

//                         messageElement.appendChild(imageElement);
//                         messageElement.appendChild(messageText);
//                         messageElement.appendChild(actionText);
//                         outOfRangeContainer.appendChild(messageElement);
//                     });
//                 } else {
//                     const noIssuesMessage = document.createElement("p");
//                     noIssuesMessage.textContent = "All parameters are within the acceptable range.";
//                     outOfRangeContainer.appendChild(noIssuesMessage);
//                 }

//                 document.getElementById("result-table-container").classList.remove("hidden");
//             })
//             .catch((error) => {
//                 console.error("Error fetching data:", error);
//                 document.getElementById("result-description").textContent =
//                     "Error fetching current values. Please try again.";
//                 document.getElementById("result-table-container").classList.remove("hidden");
//             });
//     };

//     // Initial fetch
//     updateData();

//     // Set interval for updating data every 10 seconds
//     updateInterval = setInterval(updateData, 10000);
// }

 

// // Enable Analyze button when a crop is selected
// function enableAnalyzeButton() {
//     const selectedCrop = document.getElementById("result-dropdown").value;
//     const analyzeButton = document.getElementById("analysis-button");
//     analyzeButton.disabled = !selectedCrop;
// }

// // Recorded ranges object
// const recordedRanges = {
//     Tomato: {
//         temp: { min: 20, max: 25, unit: "°C", lowImage: "images/Tomato plants in low-temperature.webp", highImage: "images/Tomato plants in high-temperature.webp", action: "Adjust the temperature to the correct range.", },
//         humidity: { min: 60, max: 70, unit: "%", lowImage: "images/images/low-no2-tomato.png", highImage: "hight-no2-tomato.png", action: "Adjust the CO2 concentration.", },
//         h2o: { min: 2, max: 3, unit: "%", lowImage: "images/lowwatered.jpg", highImage: "images/overwatered.jpg", action: "Increase or decrease water supply to maintain the correct humidity.", },
//         n: { min: 13, max: 14, unit: "ppm", lowImage: "images/low-no2-tomato.jpg", highImage: "images/hight-no2-tomato.jpg", action: "Adjust the nitrogen dioxide levels.", },
//         p: { min: 17, max: 28, unit: "%", lowImage: "images/low-turb-tomato.jpg", highImage: "images/high-turb-tomato.jpg", action: "Ensure water clarity is within the optimal range.", },
//         k: { min: 27, max: 38, unit: "%", lowImage: "images/low-turb-tomato.jpg", highImage: "images/high-turb-tomato.jpg", action: "Ensure water clarity is within the optimal range.", },
//         ph: { min: 6.0, max: 6.8, unit: "", lowImage: "images/low-ph-tomato.jpg", highImage: "images/high-ph-tomato.jpg", action: "Adjust pH levels with the appropriate chemicals.", },
       
//     },
//     Onion: {
//         temp: { min: 18, max: 21, unit: "°C", lowImage: "images/onion1.jpg", highImage: "images/onion2.jpg", action: "Adjust the environment temperature.", },
//         humidity: { min: 85, max: 95, unit: "%", lowImage: "images/onion3.jpg", highImage: "images/onion4.jpg", action: "Ensure proper CO2 concentration.", },
//         h2o: { min: 2, max: 3, unit: "%", lowImage: "images/onion14.jpg", highImage: "images/onion6.jpg", action: "Increase or decrease water supply.", },
//         n: { min: 0.33, max: 0.5, unit: "ppm", lowImage: "images/onion7.jpg", highImage: "images/onion8.jpg", action: "Ensure appropriate NO2 levels.", },
//         p: { min: 0.7, max: 0.8, unit: "%", lowImage: "images/onion9.jpg", highImage: "images/onion10.jpg", action: "Ensure water clarity is maintained.", },
//         k: { min: 0.7, max: 0.8, unit: "%", lowImage: "images/onion11.jpg", highImage: "images/onion12.jpg", action: "Ensure water clarity is maintained.", },
//         ph: { min: 5.0, max: 6.5, unit: "", lowImage: "images/onion13.jpg", highImage: "images/onion14.jpg", action: "Adjust the pH value using chemicals.", },
//     },
//     Chilli: {
//         temp: { min: 20, max: 25, unit: "°C", lowImage: "images/chilli1.jpg", highImage: "images/chilli2.jpg", action: "Increase temperature if needed.", },
//         humidity: { min: 50, max: 60, unit: "%", lowImage: "images/chilli3.jpg", highImage: "images/chilli4.jpg", action: "Ensure CO2 concentration is optimal.", },
//         h2o: { min: 4, max: 5, unit: "%", lowImage: "images/chilli5.png", highImage: "images/chilli6.jpg", action: "Adjust water supply or humidity level.", },
//         n: { min: 0.4, max: 0.5, unit: "ppm", lowImage: "images/chilli7.jpg", highImage: "images/chilli8.jpg", action: "Monitor and adjust NO2 levels.", },
//         p: { min: 0.5, max: 0.8, unit: "%", lowImage: "images/chilli9.jpg", highImage: "images/chilli10.jpg", action: "Ensure water is clear.", },
//         k: { min: 0.5, max: 0.8, unit: "%", lowImage: "images/chilli11.jpg", highImage: "images/chilli12.jpg", action: "Ensure water is clear.", },
//         ph: { min: 6.0, max: 7.0, unit: "", lowImage: "images/chilli4.jpg", highImage: "images/chilli7.jpg", action: "Adjust pH levels as needed.", },
//     },
//     Brinjal: {
//         temp: { min: 20, max: 25, unit: "°C", lowImage: "images/brinjal1.jpg", highImage: "images/brinjal2.jpg", action: "Increase temperature if needed.", },
//         humidity: { min: 50, max: 60, unit: "%", lowImage: "images/brinjal3.jpg", highImage: "images/brinjal3.jpg", action: "Ensure CO2 concentration is optimal.", },
//         h2o: { min: 4, max: 5, unit: "%", lowImage: "images/brinjal4.jpg", highImage: "images/brinjal5.jpg", action: "Adjust water supply or humidity level.", },
//         n: { min: 0.4, max: 0.5, unit: "ppm", lowImage: "images/brinjal6.jpg", highImage: "images/brinjal7.jpg", action: "Monitor and adjust NO2 levels.", },
//         p: { min: 0.5, max: 0.8, unit: "%", lowImage: "images/brinjal7.jpg", highImage: "images/brinjal6.jpg", action: "Ensure water is clear.", },
//         k: { min: 0.5, max: 0.8, unit: "%", lowImage: "images/brinjal5.jpg", highImage: "images/brinjal1.jpg", action: "Ensure water is clear.", },
//         ph: { min: 6.0, max: 7.0, unit: "", lowImage: "images/brinjal2.jpg", highImage: "images/brinjal3.jpg", action: "Adjust pH levels as needed.", },
//     },
//     Watermelan: {
//         temp: { min: 20, max: 25, unit: "°C", lowImage: "images/watermelan1.jpg", highImage: "images/watermelan2.jpg", action: "Increase temperature if needed.", },
//         humidity: { min: 50, max: 60, unit: "%", lowImage: "images/watermelan3.jpg", highImage: "images/watermelan4.jpg", action: "Ensure CO2 concentration is optimal.", },
//         h2o: { min: 4, max: 5, unit: "%", lowImage: "images/watermelan5.jpg", highImage: "images/watermelan6.jpg", action: "Adjust water supply or humidity level.", },
//         n: { min: 0.4, max: 0.5, unit: "ppm", lowImage: "images/watermelan7.jpg", highImage: "images/watermelan8.jpg", action: "Monitor and adjust NO2 levels.", },
//         p: { min: 0.5, max: 0.8, unit: "%", lowImage: "images/watermelan9.jpg", highImage: "images/watermelan1.jpg", action: "Ensure water is clear.", },
//         k: { min: 0.5, max: 0.8, unit: "%", lowImage: "images/watermelan2.jpg", highImage: "images/watermelan3.jpg", action: "Ensure water is clear.", },
//         ph: { min: 6.0, max: 7.0, unit: "", lowImage: "images/watermelan4.jpg", highImage: "images/watermelan5.jpg", action: "Adjust pH levels as needed.", },
//     },
// };

// function predictCost() {
//     const crop = document.getElementById("crop-dropdown").value;
//     const yearRange = document.querySelector('input[name="year-range"]:checked')?.value;
//     const month = document.getElementById("month-dropdown").value;
//     const resultDiv = document.getElementById("cost-prediction-result");
//     const costData = {
//         Tomato: {
//             "Last 1 year": [
//                 { month: "January", cost: 50 },
//                 { month: "February", cost: 40 },
//                 { month: "March", cost: 60 },
//                 { month: "April", cost: 70 },
//                 { month: "May", cost: 90 },
//                 { month: "June", cost: 100 },
//                 { month: "July", cost: 120 },
//                 { month: "August", cost: 110 },
//                 { month: "September", cost: 80 },
//                 { month: "October", cost: 70 },
//                 { month: "November", cost: 60 },
//                 { month: "December", cost: 50 }
//             ],
//             "Last 2 years": [
//                 { month: "January", cost: 35 },
//                 { month: "February", cost: 30 },
//                 { month: "March", cost: 25 },
//                 { month: "April", cost: 40 },
//                 { month: "May", cost: 55 },
//                 { month: "June", cost: 65 },
//                 { month: "July", cost: 75 },
//                 { month: "August", cost: 85 },
//                 { month: "September", cost: 75 },
//                 { month: "October", cost: 40 },
//                 { month: "November", cost: 35 },
//                 { month: "December", cost: 40 }
//             ],
//             "Last 3 years": [
//                 { month: "January", cost: 28 },
//                 { month: "February", cost: 25 },
//                 { month: "March", cost: 23 },
//                 { month: "April", cost: 22 },
//                 { month: "May", cost: 24 },
//                 { month: "June", cost: 26 },
//                 { month: "July", cost: 28 },
//                 { month: "August", cost: 30 },
//                 { month: "September", cost: 31 },
//                 { month: "October", cost: 35 },
//                 { month: "November", cost: 47 },
//                 { month: "December", cost: 55 }
//             ]
//         },
//         Onion: {
//             "Last 1 year": [
//                 { month: "January", cost: 30 },
//                 { month: "February", cost: 35 },
//                 { month: "March", cost: 35 },
//                 { month: "April", cost: 38 },
//                 { month: "May", cost: 40 },
//                 { month: "June", cost: 42 },
//                 { month: "July", cost: 50 },
//                 { month: "August", cost: 60 },
//                 { month: "September", cost: 70 },
//                 { month: "October", cost: 80 },
//                 { month: "November", cost: 65 },
//                 { month: "December", cost: 50 }
//             ],
//             "Last 2 years": [
//                 { month: "January", cost: 28 },
//                 { month: "February", cost: 30 },
//                 { month: "March", cost: 35 },
//                 { month: "April", cost: 34 },
//                 { month: "May", cost: 36 },
//                 { month: "June", cost: 38 },
//                 { month: "July", cost: 40 },
//                 { month: "August", cost: 45 },
//                 { month: "September", cost: 50 },
//                 { month: "October", cost: 55 },
//                 { month: "November", cost: 48 },
//                 { month: "December", cost: 42 }
//             ],
//             "Last 3 years": [
//                 { month: "January", cost: 35 },
//                 { month: "February", cost: 37 },
//                 { month: "March", cost: 34 },
//                 { month: "April", cost: 36 },
//                 { month: "May", cost: 21 },
//                 { month: "June", cost: 23 },
//                 { month: "July", cost: 25 },
//                 { month: "August", cost: 29 },
//                 { month: "September", cost: 33 },
//                 { month: "October", cost: 37 },
//                 { month: "November", cost: 45 },
//                 { month: "December", cost: 48 }
//             ]
//         },
//         Chilli: {
//             "Last 1 year": [
//                 { month: "January", cost: 65 },
//                 { month: "February", cost: 68 },
//                 { month: "March", cost: 70 },
//                 { month: "April", cost: 62 },
//                 { month: "May", cost: 60 },
//                 { month: "June", cost: 58 },
//                 { month: "July", cost: 55 },
//                 { month: "August", cost: 57 },
//                 { month: "September", cost: 60 },
//                 { month: "October", cost: 65 },
//                 { month: "November", cost: 68 },
//                 { month: "December", cost: 70 }
//             ],
//             "Last 2 years": [
//                 { month: "January", cost: 60 },
//                 { month: "February", cost: 63 },
//                 { month: "March", cost: 65 },
//                 { month: "April", cost: 58 },
//                 { month: "May", cost: 55 },
//                 { month: "June", cost: 52 },
//                 { month: "July", cost: 50 },
//                 { month: "August", cost: 53 },
//                 { month: "September", cost: 55 },
//                 { month: "October", cost: 58 },
//                 { month: "November", cost: 60 },
//                 { month: "December", cost: 62 }
//             ],
//             "Last 3 years": [
//                 { month: "January", cost: 55 },
//                 { month: "February", cost: 58 },
//                 { month: "March", cost: 60 },
//                 { month: "April", cost: 53 },
//                 { month: "May", cost: 50 },
//                 { month: "June", cost: 48 },
//                 { month: "July", cost: 45 },
//                 { month: "August", cost: 47 },
//                 { month: "September", cost: 50 },
//                 { month: "October", cost: 55 },
//                 { month: "November", cost: 55 },
//                 { month: "December", cost: 58 }
//             ]
//         },
//         Brinjal: {
//             "Last 1 year": [
//                 { month: "January", cost: 30 },
//                 { month: "February", cost: 32 },
//                 { month: "March", cost: 35 },
//                 { month: "April", cost: 38 },
//                 { month: "May", cost: 40 },
//                 { month: "June", cost: 42 },
//                 { month: "July", cost: 41 },
//                 { month: "August", cost: 38 },
//                 { month: "September", cost: 36 },
//                 { month: "October", cost: 35 },
//                 { month: "November", cost: 33 },
//                 { month: "December", cost: 30 }
//             ],
//             "Last 2 years": [
//                 { month: "January", cost: 30 },
//                 { month: "February", cost: 32 },
//                 { month: "March", cost: 34 },
//                 { month: "April", cost: 36 },
//                 { month: "May", cost: 38 },
//                 { month: "June", cost: 40 },
//                 { month: "July", cost: 37 },
//                 { month: "August", cost: 35 },
//                 { month: "September", cost: 33 },
//                 { month: "October", cost: 31 },
//                 { month: "November", cost: 30 },
//                 { month: "December", cost: 29 }
//             ],
//             "Last 3 years": [
//                 { month: "January", cost: 25 },
//                 { month: "February", cost: 26 },
//                 { month: "March", cost: 28 },
//                 { month: "April", cost: 30 },
//                 { month: "May", cost: 32 },
//                 { month: "June", cost: 35 },
//                 { month: "July", cost: 33 },
//                 { month: "August", cost: 30 },
//                 { month: "September", cost: 28 },
//                 { month: "October", cost: 27 },
//                 { month: "November", cost: 26 },
//                 { month: "December", cost: 27 }
//             ]
//         },
//         Watermelan: {
//             "Last 1 year": [
//                 { month: "January", cost: 22 },
//                 { month: "February", cost: 24 },
//                 { month: "March", cost: 26 },
//                 { month: "April", cost: 25 },
//                 { month: "May", cost: 28 },
//                 { month: "June", cost: 30 },
//                 { month: "July", cost: 32 },
//                 { month: "August", cost: 33 },
//                 { month: "September", cost: 35 },
//                 { month: "October", cost: 30 },
//                 { month: "November", cost: 28 },
//                 { month: "December", cost: 26 }
//             ],
//             "Last 2 years": [
//                 { month: "January", cost: 22 },
//                 { month: "February", cost: 20 },
//                 { month: "March", cost: 18 },
//                 { month: "April", cost: 17 },
//                 { month: "May", cost: 22 },
//                 { month: "June", cost: 24 },
//                 { month: "July", cost: 26 },
//                 { month: "August", cost: 29 },
//                 { month: "September", cost: 32 },
//                 { month: "October", cost: 28 },
//                 { month: "November", cost: 26 },
//                 { month: "December", cost: 23 }
//             ],
//             "Last 3 years": [
//                 { month: "January", cost: 20 },
//                 { month: "February", cost: 18 },
//                 { month: "March", cost: 16 },
//                 { month: "April", cost: 15 },
//                 { month: "May", cost: 20 },
//                 { month: "June", cost: 22 },
//                 { month: "July", cost: 25 },
//                 { month: "August", cost: 28 },
//                 { month: "September", cost: 30 },
//                 { month: "October", cost: 27 },
//                 { month: "November", cost: 24 },
//                 { month: "December", cost: 22 }
//             ]
//         }
//     };
//     if (!crop || !yearRange || !month) {
//         resultDiv.innerHTML = `<p style="color: red;">Please select crop, year range, and month to predict the cost.</p>`;
//         return;
//     }

//     const cropData = costData[crop];
//     if (!cropData) {
//         resultDiv.innerHTML = `<p style="color: red;">Data not available for the selected crop.</p>`;
//         return;
//     }

//     const yearData = cropData[yearRange];
//     if (!yearData) {
//         resultDiv.innerHTML = `<p style="color: red;">Data not available for the selected year range.</p>`;
//         return;
//     }

//     const monthData = yearData.find(entry => entry.month === month);
//     if (!monthData) {
//         resultDiv.innerHTML = `<p style="color: red;">Data not available for the selected month.</p>`;
//         return;
//     }

//     resultDiv.innerHTML = `<p>The predicted cost for ${crop} in ${month} (${yearRange}) is: <strong>${monthData.cost}rs</strong></p>`;
// }
const apiKey = "1NIgsyjiusDReRxlgxFpGs9bPeHntQIW9V7sBQmAdJ9A";
const sheetId = "1dD3OotChqeogNTlQ1Bqdcpti9Z79B5gYg0yt4hbKQx0";
const weatherApiKey = "eaf2e165d05bb27d14be627793ae5317";

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (username === "sphere" && password === "123") {
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('vehicle-container').style.display = 'flex';

        // Automatically fetch data every 10 seconds after login
        setInterval(() => {
            fetchAndUpdateData();
        }, 10000);

        // Initial fetch
        fetchAndUpdateData();
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
}

// Fetch data from Google Sheets with the new API key
async function fetchGoogleSheetData() {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1?key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log("API Response:", data);  // Log the full response
        if (!data.values || data.values.length === 0) {
            throw new Error('No data found in spreadsheet');
        }

        const rows = data.values.slice(1); // Exclude the header row
        const latestRow = rows[rows.length - 1]; // Get the latest row of data

        return {
            temp: parseFloat(latestRow[2]),     // Temperature
            humidity: parseFloat(latestRow[3]), // Humidity
            h2o: parseFloat(latestRow[4]),      // Soil moisture
            n: parseFloat(latestRow[5]),        // Nitrogen (N)
            p: parseFloat(latestRow[6]),        // Phosphorus (P)
            k: parseFloat(latestRow[7]),        // Potassium (K)
            ph: parseFloat(latestRow[8]),       // pH value
        };
    } catch (error) {
        console.error('Error fetching data:', error);
        // Fallback to mock data if API call fails
        return {
            temp: 22,
            humidity: 65,
            h2o: 2.5,
            n: 0.35,
            p: 0.75,
            k: 0.46,
            ph: 6.5,
        };
    }
}

function fetchCurrentTemperature() {
    const city = "Bengaluru";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${weatherApiKey}`;
    return fetch(url)
        .then(response => response.json())
        .then(data => {
            if (!data.main || typeof data.main.temp === "undefined") {
                throw new Error("Temperature data not available");
            }
            return data.main.temp;
        });
}

function fetchAndUpdateData() {
    const errorMessage = document.getElementById('vehicle-error-message');
    errorMessage.textContent = "";

    fetchGoogleSheetData()
        .then(row => {
            fetchCurrentTemperature()
                .then(temp => {
                    displayVehicleData(row, temp);
                    displaySpreadsheetData(row, temp);
                    renderSeparateGraphs(row, temp);
                })
                .catch(error => {
                    // If weather API fails, use recorded temperature
                    displayVehicleData(row, row.temp);
                    displaySpreadsheetData(row, row.temp);
                    renderSeparateGraphs(row, row.temp);
                    errorMessage.textContent = 'Warning: Could not fetch current temperature data.';
                });
        })
        .catch(error => {
            errorMessage.textContent = 'Error fetching data. Please try again.';
        });
}

function displayVehicleData(row, currentTemp) {
    const currentTime = new Date().toLocaleTimeString(); // Get current system time

    document.getElementById('vehicle-data').innerHTML = `
       <div class="card temp">
            <img src="https://img.icons8.com/fluency/48/thermometer.png" alt="Temperature Icon">
            <h3>Temperature</h3>
            <p>Recorded: ${row.temp} °C</p>
            <p>Current: ${currentTemp} °C</p>
        </div>
        <div class="card time">
            <img src="https://img.icons8.com/fluency/48/clock.png" alt="Time Icon">
            <h3>Time</h3>
            <p>${currentTime}</p>
        </div>
        <div class="card co2">
            <img src="https://img.icons8.com/?size=100&id=HlPQGB87sVT3&format=png&color=000000" alt="CO2 Icon">
            <h3>Humidity</h3>
            <p>${row.humidity}</p>
        </div>
        <div class="card h2o">
            <img src="https://img.icons8.com/fluency/48/water.png" alt="H2O Icon">
            <h3>Soil Moisture</h3>
            <p>${row.h2o}</p>
        </div>
        <div class="card N">
            <img src="https://cdn3.iconfinder.com/data/icons/pollution-indigo-vol-2/256/nitrogen_dioxide_no2-512.png" alt="NO2 Icon">
            <h3>N(Nitrogen)</h3>
            <p>${row.n} %</p>
        </div>
        <div class="card P">
            <img src="https://img.icons8.com/fluency/48/cloud.png" alt="Turbidity Icon">
            <h3>P(Phosphorous)</h3>
            <p>${row.p} %</p>
        </div>
        <div class="card K">
            <img src="https://img.icons8.com/fluency/48/cloud.png" alt="Turbidity Icon">
            <h3>K(Potassium)</h3>
            <p>${row.k} %</p>
        </div>
        <div class="card ph">
            <img src="https://img.icons8.com/fluency/48/flask.png" alt="pH Icon">
            <h3>pH</h3>
            <p>${row.ph}</p>
        </div>
    `;
}

function displaySpreadsheetData(row, currentTemp) {
    const currentTime = new Date().toLocaleTimeString(); // Get current system time

    const tableBody = document.getElementById('vehicle-table-body');
    tableBody.innerHTML = `
        <tr>
            <td>Temperature (Recorded)</td>
            <td>${row.temp} °C</td>
        </tr>
        <tr>
            <td>Temperature (Current)</td>
            <td>${currentTemp} °C</td>
        </tr>
        <tr>
            <td>Time</td>
            <td>${currentTime}</td>
        </tr>
        <tr>
            <td>Humidity</td>
            <td>${row.humidity}</td>
        </tr>
        <tr>
            <td>Soil Moisture</td>
            <td>${row.h2o}</td>
        </tr>
        <tr>
            <td>Nitrogen</td>
            <td>${row.n} %</td>
        </tr>
        <tr>
            <td>Phosphorous</td>
            <td>${row.p} %</td>
        </tr>
        <tr>
            <td>Potassium</td>
            <td>${row.k} %</td>
        </tr>
        <tr>
            <td>pH</td>
            <td>${row.ph}</td>
        </tr>
    `;
    document.getElementById('vehicle-table').style.display = 'block';

    // Call to render graph
    renderGraph(row, currentTemp);
}

function renderGraph(row, temp) {
    const graphContainer = document.getElementById("graph-container");
    const ctx = document.getElementById("vehicleChart").getContext("2d");

    // Make the graph container visible
    graphContainer.style.display = "block";

    // Destroy any existing chart to avoid overlap
    if (window.vehicleChartInstance) {
        window.vehicleChartInstance.destroy();
    }

    // Ensure all values are numbers and fallback to 0 if undefined or invalid
    const labels = [
        "Temperature (Recorded)",
        "Temperature (Current)",
        "Humidity",
        "Soil Moisture",
        "Nitrogen",
        "Phosphorous",
        "Potassium",
        "pH"
    ];
    const data = [
        Number(row.temp) || 0,
        Number(temp) || 0,
        Number(row.humidity) || 0,
        Number(row.h2o) || 0,
        Number(row.n) || 0,
        Number(row.p) || 0,
        Number(row.k) || 0,
        Number(row.ph) || 0
    ];

    console.log("Chart Labels:", labels);
    console.log("Chart Data:", data);

    // Initialize the new chart instance
    window.vehicleChartInstance = new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Metrics",
                    data: data,
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });
}

function renderSeparateGraphs(row, currentTemp) {
    // Ensure the container is visible
    document.getElementById("separate-graphs-container").style.display = "grid";

    // Temperature Graph (Enhanced)
    const tempCtx = document.getElementById("tempGraph").getContext("2d");
    new Chart(tempCtx, {
        type: "line",
        data: {
            labels: ["Recorded Temperature", "Current Temperature"],
            datasets: [
                {
                    label: "Recorded Temperature (°C)",
                    data: [parseFloat(row.temp)], // Recorded Temperature
                    borderColor: "rgba(255, 99, 132, 1)", // Bright red
                    pointBackgroundColor: "rgba(255, 99, 132, 1)",
                    pointBorderColor: "rgba(255, 99, 132, 1)",
                    backgroundColor: "rgba(255, 99, 132, 0.2)", // Light fill
                    borderWidth: 3,
                    pointRadius: 6,
                    tension: 0.4,
                },
                {
                    label: "Current Temperature (°C)",
                    data: [parseFloat(currentTemp)], // Current Temperature
                    borderColor: "rgba(54, 162, 235, 1)", // Bright blue
                    pointBackgroundColor: "rgba(54, 162, 235, 1)",
                    pointBorderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.2)", // Light fill
                    borderWidth: 3,
                    pointRadius: 6,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: "top",
                    labels: {
                        color: "#000",
                        font: { size: 14, weight: "bold" },
                    },
                },
                tooltip: {
                    callbacks: {
                        label: (context) =>
                            `${context.dataset.label}: ${context.raw.toFixed(2)} °C`,
                    },
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Temperature Type",
                        color: "#333",
                        font: { size: 14 },
                    },
                    grid: { color: "rgba(200, 200, 200, 0.2)" },
                },
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: "Temperature (°C)",
                        color: "#333",
                        font: { size: 14 },
                    },
                    ticks: {
                        stepSize: 0.5,
                        callback: (value) => `${value.toFixed(1)} °C`,
                    },
                    grid: { color: "rgba(200, 200, 200, 0.2)" },
                },
            },
        },
    });

    // Humidity Graph (Enhanced)
    const co2Ctx = document.getElementById("co2Graph").getContext("2d");
    new Chart(co2Ctx, {
        type: "line",
        data: {
            labels: ["Data Point 1", "Data Point 2", "Data Point 3"],
            datasets: [
                {
                    label: "Humidity (ppm)",
                    data: [
                        parseFloat(row.humidity),
                        parseFloat(row.humidity) + 10,
                        parseFloat(row.humidity) - 5,
                    ],
                    borderColor: "rgba(54, 162, 235, 1)",
                    backgroundColor: "rgba(54, 162, 235, 0.1)",
                    borderWidth: 3,
                    pointRadius: 4,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#000",
                        font: { size: 14, weight: "bold" },
                    },
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Data Points",
                        color: "#333",
                        font: { size: 14 },
                    },
                    grid: { color: "rgba(200, 200, 200, 0.2)" },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Humidity (ppm)",
                        color: "#333",
                        font: { size: 14 },
                    },
                    grid: { color: "rgba(200, 200, 200, 0.2)" },
                },
            },
        },
    });

    // H2O Graph (Enhanced)
    const h2oCtx = document.getElementById("h2oGraph").getContext("2d");
    new Chart(h2oCtx, {
        type: "line",
        data: {
            labels: ["Data Point 1", "Data Point 2", "Data Point 3"],
            datasets: [
                {
                    label: "Soil Moisture (%)",
                    data: [
                        parseFloat(row.h2o),
                        parseFloat(row.h2o) + 5,
                        parseFloat(row.h2o) - 3,
                    ],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.1)",
                    borderWidth: 3,
                    pointRadius: 4,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#000",
                        font: { size: 14, weight: "bold" },
                    },
                },
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Data Points",
                        color: "#333",
                        font: { size: 14 },
                    },
                    grid: { color: "rgba(200, 200, 200, 0.2)" },
                },
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Soil Moisture (%)",
                        color: "#333",
                        font: { size: 14 },
                    },
                    grid: { color: "rgba(200, 200, 200, 0.2)" },
                },
            },
        },
    });

    // Nitrogen Graph (Enhanced Pie Chart)
    const no2Ctx = document.getElementById("no2Graph").getContext("2d");
    new Chart(no2Ctx, {
        type: "line",
        data: {
            labels: ["Nitrogen Level"],
            datasets: [
                {
                    label: "N (%)",
                    data: [parseFloat(row.n)],
                    backgroundColor: ["rgba(255, 205, 86, 0.8)"],
                    borderColor: ["rgba(255, 205, 86, 1)"],
                    borderWidth: 2,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    labels: {
                        color: "#000",
                        font: { size: 14, weight: "bold" },
                    },
                },
            },
        },
    });

    // Phosphorus Graph
    const turbidityCtx = document.getElementById("turbidityGraph").getContext("2d");
    new Chart(turbidityCtx, {
        type: "line",
        data: {
            labels: ["Phosphorous"],
            datasets: [
                {
                    label: "P (%)",
                    data: [parseFloat(row.p)],
                    borderColor: "rgba(255, 159, 64, 1)",
                    backgroundColor: "rgba(255, 159, 64, 0.2)",
                    borderWidth: 3,
                    pointRadius: 5,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Data Points" } },
                y: { title: { display: true, text: "P (%)" }, beginAtZero: true },
            },
        },
    });

    // pH Graph
    const phCtx = document.getElementById("phGraph").getContext("2d");
    new Chart(phCtx, {
        type: "line",
        data: {
            labels: ["pH"],
            datasets: [
                {
                    label: "pH",
                    data: [parseFloat(row.ph)],
                    borderColor: "rgba(75, 192, 192, 1)",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderWidth: 3,
                    pointRadius: 5,
                    tension: 0.4,
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                x: { title: { display: true, text: "Data Points" } },
                y: { title: { display: true, text: "pH" }, beginAtZero: false },
            },
        },
    });
}