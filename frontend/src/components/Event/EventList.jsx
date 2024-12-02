import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, participateInEvent } from '../../redux/slices/eventSlice';
import { EventListContainer, EventTitle, EventItem, JoinButton } from './EventListStyle';

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
    <EventListContainer>
      <EventTitle>{isAdmin ? 'Event List (Admin View)' : 'Available Events'}</EventTitle>
      {events.length === 0 ? (
        <p>No events available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {events.map((event) => (
            <EventItem key={event._id}>
              <h4>{event.name}</h4>
              <p><strong>Description:</strong> {event.description}</p>
              <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>

              {isAdmin ? (
                <>
                  <h5>Participants:</h5>
                  {event.participants.length > 0 ? (
                    <ul>
                      {event.participants.map((participant) => (
                        <li key={participant._id}>
                          <p>
                          Name: {participant.name} 
                          </p>
                          <p>
                          Email: {participant.email}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No participants yet.</p>
                  )}
                </>
              ) : (
                <JoinButton
                  onClick={() => handleJoin(event._id)}
                  disabled={event.participants.includes(profile?._id)}
                >
                  {event.participants.includes(profile?._id) ? 'Joined' : 'Join Event'}
                </JoinButton>
              )}
            </EventItem>
          ))}
        </ul>
      )}
    </EventListContainer>
  );
};

export default EventList;
