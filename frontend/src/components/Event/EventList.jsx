import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, participateInEvent } from '../../redux/slices/eventSlice';

const EventList = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { list: events = [], loading, error } = useSelector((state) => state.event);
  const { profile } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  const handleJoin = (eventId) => {
    if (!profile?._id) {
      alert('You must be logged in to join an event.');
      return;
    }
    dispatch(participateInEvent(eventId));
  };

  if (loading) return <p>Loading events...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h3>{isAdmin ? 'Event List (Admin View)' : 'Available Events'}</h3>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((event) => (
            <li key={event._id} style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '10px', borderRadius: '5px' }}>
              <h4>{event.name}</h4>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

              {isAdmin ? (
                // Admin View: Show Participants
                <>
                  <h5>Participants:</h5>
                  {event.participants.length > 0 ? (
                    <ul>
                      {event.participants.map((participant) => (
                        <li key={participant._id}>
                          {participant.name} ({participant.email})
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No participants yet.</p>
                  )}
                </>
              ) : (
                // User View: Show Join Button
                <button
                  onClick={() => handleJoin(event._id)}
                  disabled={event.participants.includes(profile?._id)} // Disable if already joined
                  style={{
                    padding: '5px 10px',
                    backgroundColor: event.participants.includes(profile?._id) ? 'gray' : 'green',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: event.participants.includes(profile?._id) ? 'not-allowed' : 'pointer',
                  }}
                >
                  {event.participants.includes(profile?._id) ? 'Joined' : 'Join Event'}
                </button>

              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default EventList;
