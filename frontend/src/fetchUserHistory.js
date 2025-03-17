import axios from "axios";

/**
 * Fetches and processes user history from the database.
 * @param {string} email - The user's email.
 * @param {function} setTimerEvents - A state setter function to update the timer events.
 */
export const fetchUserHistory = async (email, setTimerEvents) => {
  try {
    // Fetch user history from the backend
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/timer-event/get-all-timer-events/${email}`
    );
    const events = response.data;
    // console.log(events);
    // Group events by mode changes
    const groupedEvents = [];
    let currentMode = null;
    let currentGroup = [];
    let previousEvent = null;
    let currentDurationTime = 0; // Initialize duration time

    events.forEach((event) => {
      if (
        event.mode !== currentMode ||
        (previousEvent && previousEvent.event === "end")
      ) {
        // If the mode changes, save the current group
        if (currentGroup.length > 0) {
          groupedEvents.push({
            mode: currentMode,
            events: currentGroup,
            duration_time: currentDurationTime,
          });
          currentGroup = []; // Reset the current group
          previousEvent = null;
          currentDurationTime = 0;
        }
        currentMode = event.mode; // Update the current mode
      }

      if (previousEvent && previousEvent.event === "start") {
        // Calculate duration for the current group
        const startTime = new Date(previousEvent.createdAt);
        const endTime = new Date(event.createdAt);
        currentDurationTime += endTime - startTime;
      }
      currentGroup.push({
        id: event._id,
        event: event.event,
        createdAt: event.createdAt, // Ensure consistent property name
      });
      previousEvent = event;
    });

    // Push the last group if it exists
    if (currentGroup.length > 0) {
      groupedEvents.push({
        mode: currentMode,
        events: currentGroup,
        duration_time: currentDurationTime,
      });
    }
    console.log(groupedEvents);
    // Update the state with the grouped events
    setTimerEvents(groupedEvents);
  } catch (error) {
    console.error("Error fetching user history:", error);
  }
};
