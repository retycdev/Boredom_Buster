// Activities to select from
const activities = [
  { type: "education" },
  { type: "recreational" },
  { type: "social" },
  { type: "charity" },
  { type: "cooking" },
  { type: "relaxation" },
  { type: "busywork" },
];

// Base URL for the Bored API
const baseURL = "https://bored-api.appbrewery.com/filter?type=";

// Elements for dynamic content
const activitiesSelect = document.getElementById("activities_Select");
const bottomSheet = document.getElementById("bottomSheet");
const activityTitle = document.getElementById("activityTitle");
const activityDetails = document.getElementById("activityDetails");
const cancelBtn = document.getElementById("cancelBtn");
const participantsSelect = document.getElementById("participantsSelect");

// Function to create activity divs and add click listeners
function createActivityDivs() {
  activities.forEach((activity) => {
    let div = document.createElement("div");
    div.classList.add("activity"); // Add class for styling
    div.textContent = activity.type;

    // Add click event to fetch data and open the bottom sheet
    div.addEventListener("click", () => fetchActivityData(activity.type));

    // Append the div to the activities_Select section
    activitiesSelect.appendChild(div);
  });
}

// Fetch activity data and display it in the bottom sheet
function fetchActivityData(activityType) {
  const participantCount = participantsSelect.value; // Get selected participant count
  const url = `${baseURL}${activityType}&participants=${participantCount}`; // Include participants in URL

  axios
    .get(url)
    .then((response) => {
      // Update bottom sheet with the fetched data
      const activity = response.data[0]; // Assuming the first activity in the list
      activityTitle.textContent = `${
        activityType.charAt(0).toUpperCase() + activityType.slice(1)
      } Activity`;
      activityDetails.textContent = `Participants: ${activity.participants}, Price: ${activity.price}`;

      // Show the bottom sheet
      bottomSheet.classList.add("active");
    })
    .catch((error) => {
      console.error(`Error fetching data for ${activityType}:`, error);
      activityTitle.textContent = `Error fetching ${activityType}`;
      activityDetails.textContent = "Please try again later.";
      bottomSheet.classList.add("active");
    });
}

// Function to hide the bottom sheet
cancelBtn.addEventListener("click", () => {
  bottomSheet.classList.remove("active");
});

// Initialize the activity divs on page load
createActivityDivs();
