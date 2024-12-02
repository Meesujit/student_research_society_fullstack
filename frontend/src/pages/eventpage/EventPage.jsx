import React from 'react'
import EventList from '../../components/Event/EventList'
import { useSelector } from 'react-redux';
import EventForm from '../../components/Event/EventForm';


const EventPage = () => {
  const {profile} = useSelector((state) => state.auth);
  return (
    <div>
      {profile?.role === 'admin' ? (
        <>        
        <EventForm />
        <EventList isAdmin={true} />
        </>
      ) : (
        // User View: Show both the form and the list
        <>
          <EventList isAdmin={false} />
        </>
      )}
    </div>
  )
}

export default EventPage