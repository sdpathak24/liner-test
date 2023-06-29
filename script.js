// Get the timeline element and the "Add entry" button
const timeline = document.querySelector(".timeline");
const addEntryBtn = document.getElementById("add-entry-btn");

// Get the add entry modal and the close button
const addEntryModal = document.getElementById("add-entry-modal");
const closeBtn = document.getElementsByClassName("close")[0];

// Get the add entry form inputs
const titleInput = document.getElementById("title");
const dateInput = document.getElementById("date");
const textInput = document.getElementById("text");
const imageInput = document.getElementById("image");

// Get the current entries from localStorage or create an empty array
let entries = JSON.parse(localStorage.getItem("timelineEntries")) || [];

// Function to render the timeline entries from the entries array
function renderEntries() {
  // Clear the timeline before rendering the entries
  timeline.innerHTML = "";

  // Sort the entries by date in ascending order
  entries.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Loop through the entries array and create a DOM element for each entry
  for (let i = 0; i < entries.length; i++) {
    const entry = entries[i];

    // Create the elements for the timeline entry
    const timelineEntry = document.createElement("li");
    timelineEntry.classList.add("timeline-entry");

    const dateElement = document.createElement("div");
    dateElement.classList.add("timeline-date");
    dateElement.textContent = entry.date;

    const contentElement = document.createElement("div");
    contentElement.classList.add("timeline-content");

    const titleElement = document.createElement("h2");
    titleElement.textContent = entry.title;

    const textElement = document.createElement("p");
    textElement.textContent = entry.text;

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      entries.splice(i, 1);
      localStorage.setItem("timelineEntries", JSON.stringify(entries));
      renderEntries();
    });

    // Add the image if it exists
    if (entry.image) {
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", entry.image);
      contentElement.appendChild(imageElement);
    }

    // Assemble the timeline entry
    contentElement.appendChild(textElement);
    contentElement.appendChild(removeBtn);
    timelineEntry.appendChild(titleElement);
    timelineEntry.appendChild(dateElement);
    timelineEntry.appendChild(contentElement);
    timeline.appendChild(timelineEntry);
    timelineEntry.style.border = "2px solid black";
  }
}

// Render the initial timeline entries
renderEntries();

// Open the add entry modal when the "Add entry" button is clicked
addEntryBtn.addEventListener("click", () => {
  addEntryModal.style.display = "block";
});

// Close the add entry modal when the close button is clicked
closeBtn.addEventListener("click", () => {
  addEntryModal.style.display = "none";
});

// Add a new entry when the add entry form is submitted
document
  .getElementById("add-entry-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    // Get the form values
    const title = titleInput.value;
    const date = dateInput.value;
    const text = textInput.value;
    const image = imageInput.files[0];

    if (text.trim() === "" && !image) {
      alert("text and image both cannot be empty");
      return;
    }

    // Create a new entry object
    const newEntry = {
      title,
      date,
      text,
    };

    // Add the image to the new entry if it exists
    if (image) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        newEntry.image = reader.result;
        entries.push(newEntry);
        localStorage.setItem("timelineEntries", JSON.stringify(entries));
        renderEntries();
        addEntryModal.style.display = "none";
      };
    } else {
      entries.push(newEntry);
      localStorage.setItem("timelineEntries", JSON.stringify(entries));
      renderEntries();
      addEntryModal.style.display = "none";
    }

    // Reset the form inputs
    titleInput.value = "";
    dateInput.value = "";
    textInput.value = "";
    imageInput.value = "";
  });

const TimelineHeading = document.getElementById("TimelineHeading");

TimelineHeading.addEventListener("input", () => {
  localStorage.setItem("TimelineHeading", TimelineHeading.value);
});

if (localStorage.getItem("TimelineHeading")) {
  TimelineHeading.value = localStorage.getItem("TimelineHeading");
}
