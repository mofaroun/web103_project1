const renderEvents = async () => {
  try {
    const response = await fetch("/events");
    const data = await response.json();
    const mainContent = document.getElementById("main-content");

    if (data && data.length > 0) {
      data.map((event) => {
        const card = document.createElement("div");
        card.classList.add("card");

        const topContainer = document.createElement("div");
        topContainer.classList.add("top-container");

        const bottomContainer = document.createElement("div");
        bottomContainer.classList.add("bottom-container");

        // Use a placeholder image since your events don't have images
        topContainer.style.backgroundImage = `url('https://via.placeholder.com/300x200?text=${encodeURIComponent(event.event_name)}')`;

        const name = document.createElement("h3");
        name.textContent = event.event_name; // Changed from event.name

        const pricePoint = document.createElement("p");
        pricePoint.textContent = "Price: $" + event.ticket_price; // Changed from event.pricePoint

        const venue = document.createElement("p");
        venue.textContent = "Venue: " + event.venue; // Changed from event.audience

        const genre = document.createElement("p");
        genre.textContent = "Genre: " + event.genre; // Added genre

        const artists = document.createElement("p");
        artists.textContent = "Artists: " + event.artists.join(", "); // Added artists

        const link = document.createElement("a");
        link.textContent = "Read More >";
        link.setAttribute("role", "button");
        link.href = `/events/${event.id}`;

        bottomContainer.appendChild(name);
        bottomContainer.appendChild(pricePoint);
        bottomContainer.appendChild(venue);
        bottomContainer.appendChild(genre);
        bottomContainer.appendChild(artists);
        bottomContainer.appendChild(link);

        card.appendChild(topContainer);
        card.appendChild(bottomContainer);

        mainContent.appendChild(card);
      });
    } else {
      const message = document.createElement("h2");
      message.textContent = "No upcoming events 😞";
      mainContent.appendChild(message);
    }
  } catch (error) {
    console.error("Error fetching events:", error);
    const message = document.createElement("h2");
    message.textContent = "Error loading events";
    mainContent.appendChild(message);
  }
};

renderEvents();