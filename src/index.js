document.addEventListener("DOMContentLoaded", () => {
  let selectedParticipants = null;
  let selectedActivity = null;

  // Get participant elements
  const participantDivs = document.querySelectorAll("#participant_select div");
  participantDivs.forEach((div) => {
    div.addEventListener("click", () => {
      // Remove "clicked" class from all participants
      participantDivs.forEach((d) => d.classList.remove("clicked"));

      // Add "clicked" class to the selected participant
      div.classList.add("clicked");
      selectedParticipants = parseInt(div.textContent.trim());
      console.log("Selected participants:", selectedParticipants);

      // If both participants and activity are selected, fetch data
      if (selectedParticipants && selectedActivity) {
        fetchActivities(selectedActivity, selectedParticipants);
      }
    });
  });

  // Get activity elements
  const activities = [
    "Educational",
    "Recreational",
    "Charity",
    "Cooking",
    "Social",
    "Busywork",
    "Relaxation",
  ];
  const activitiesSelect = document.getElementById("activities_Select");

  activities.forEach((activity) => {
    const div = document.createElement("div");
    const p = document.createElement("p");
    p.innerHTML = activity;
    div.appendChild(p);

    div.addEventListener("click", () => {
      // Remove "clicked" class from all activities
      activitiesSelect
        .querySelectorAll("div")
        .forEach((d) => d.classList.remove("clicked"));

      // Add "clicked" class to the selected activity
      div.classList.add("clicked");
      selectedActivity = activity;
      console.log("Selected activity:", selectedActivity);

      // If both participants and activity are selected, fetch data
      if (selectedParticipants && selectedActivity) {
        fetchActivities(selectedActivity, selectedParticipants);
      }
    });

    activitiesSelect.appendChild(div);
  });

  // Function to fetch activities based on type and participants
  async function fetchActivities(activityType, participants) {
    try {
      // Fetch the data asynchronously
      const response = await axios.get(
        "https://retycdev.github.io/bordom_buster-API/db.json"
      );

      console.log("Full response: ", response); // For debugging

      // Ensure you are accessing the 'activities' array correctly
      const activitiesArray = response.data.activities;

      if (!activitiesArray || activitiesArray.length === 0) {
        throw new Error("No activities found in the response.");
      }

      // Filter the activities based on the selected type and participants
      const filteredActivities = activitiesArray.filter(
        (item) =>
          item.type.toLowerCase() === activityType.toLowerCase() &&
          item.participants === participants
      );

      // Log the filtered activities
      console.log(
        `Filtered activities for ${activityType} with ${participants} participants:`,
        filteredActivities
      );

      if (filteredActivities.length > 0) {
        const activity =
          filteredActivities[
            Math.floor(Math.random() * filteredActivities.length)
          ].activity;

        // Show the dialog box with the activity
        document.getElementById("dialogBox").classList.add("show");
        document.getElementById("scrim").classList.add("show");

        // Create a new div for the activity and append it to #displayActivity
        const displayActivity = document.getElementById("displayActivity");
        displayActivity.innerHTML = ""; // Clear previous content
        const activityCard = document.createElement("div");
        activityCard.classList.add("activityCard");
        activityCard.textContent = activity; // Set the activity text
        displayActivity.appendChild(activityCard);

        // Scroll to #displayActivity smoothly
        displayActivity.scrollIntoView({ behavior: "smooth" });

        // Deselect participants and activities
        participantDivs.forEach((d) => d.classList.remove("clicked"));
        activitiesSelect
          .querySelectorAll("div")
          .forEach((d) => d.classList.remove("clicked"));
      } else {
        alert(
          `No activities found for ${activityType} with ${participants} participants.`
        );
      }
    } catch (err) {
      console.error("Error fetching activities:", err.message); // Improved error logging
      alert("There was an error in getting activities.");
    }
  }

  // Cancel button functionality
  const cancelButton = document.getElementById("cancel");
  cancelButton.addEventListener("click", () => {
    // Remove the "show" class from dialogBox and scrim
    const dialogBox = document.getElementById("dialogBox");
    const scrim = document.getElementById("scrim");

    dialogBox.classList.remove("show");
    scrim.classList.remove("show");

    // Enable body scroll
    document.body.style.overflow = "auto";

    // Reset selected values for new selection
    selectedParticipants = null;
    selectedActivity = null;
    participantDivs.forEach((div) => div.classList.remove("clicked"));
    activitiesSelect
      .querySelectorAll("div")
      .forEach((div) => div.classList.remove("clicked"));
  });
});
