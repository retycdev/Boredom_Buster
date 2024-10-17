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
  function fetchActivities(activityType, participants) {
    axios
      .get("http://localhost:3000/activities")
      .then((response) => {
        const { data } = response;

        // Filter data based on selected activity type and number of participants
        const filteredActivities = data.filter(
          (item) =>
            item.type.toLowerCase() === activityType.toLowerCase() &&
            item.participants === participants
        );

        // Display filtered activities
        console.log(
          `Filtered activities for ${activityType} with ${participants} participants:`,
          filteredActivities
        );

        if (filteredActivities.length > 0) {
          const randomActivity =
            filteredActivities[
              Math.floor(Math.random() * filteredActivities.length)
            ].activity;

          // Show dialogBox and scrim
          const dialogBox = document.getElementById("dialogBox");
          const scrim = document.getElementById("scrim");
          const displayActivity = document.getElementById("displayActivity");

          // Clear any existing activity cards
          displayActivity.innerHTML = "";

          // Create a new div for the activity
          const activityCard = document.createElement("div");
          activityCard.className = "activityCard";
          activityCard.innerHTML = randomActivity; // Set the activity text

          // Append the activity card to the displayActivity section
          displayActivity.appendChild(activityCard);

          // Add the "show" class to dialogBox and scrim
          dialogBox.classList.add("show");
          scrim.classList.add("show");

          // Disable body scroll
          document.body.style.overflow = "hidden";

          // Scroll to displayActivity
          displayActivity.scrollIntoView({ behavior: "smooth" });
        } else {
          alert(
            `No activities found for ${activityType} with ${participants} participants.`
          );
        }
      })
      .catch((err) => {
        console.error("Error fetching activities:", err);
        alert("There was an error in getting activities.");
      });
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
