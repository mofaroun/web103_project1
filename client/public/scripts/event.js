const renderEvent = async () => {
  try {
    const requestedID = parseInt(window.location.pathname.split('/').pop())
    
    // Fetch from the API route instead
    const response = await fetch(`/events/api/${requestedID}`)
    const event = await response.json()
    
    // ...rest of your existing code stays the same
    const eventContent = document.getElementById('event-content')
    
    if (event && !event.error) {
      document.getElementById('image').src = event.image
      document.getElementById('name').textContent = event.event_name
      document.getElementById('artists').textContent = 'Artists: ' + event.artists.join(', ')
      document.getElementById('venue').textContent = 'Venue: ' + event.venue
      document.getElementById('genre').textContent = 'Genre: ' + event.genre
      document.getElementById('dateTime').textContent = 'Date: ' + new Date(event.date_time).toLocaleString()
      document.getElementById('ticketPrice').textContent = 'Price: $' + event.ticket_price
      document.title = `Events - ${event.event_name}`
    }
    else {
      const message = document.createElement('h2')
      message.textContent = 'No Event Found 😞'
      eventContent.appendChild(message)
    }
  } catch (error) {
    console.error('Error fetching event:', error)
    const eventContent = document.getElementById('event-content')
    const message = document.createElement('h2')
    message.textContent = 'Error Loading Event 😞'
    eventContent.appendChild(message)
  }
}

renderEvent()