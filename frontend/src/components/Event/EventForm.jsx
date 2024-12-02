import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEvent } from '../../redux/slices/eventSlice';
import { EventFormContainer, Form, FormTitle, Input, Textarea, SubmitButton } from './EventFormStyle';

const EventForm = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.event);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createEvent(formData));
  };

  useEffect(() => {
    if (error) {
      alert(error);
    }
  }, [error]);

  return (
    <EventFormContainer>
      <Form onSubmit={handleSubmit}>
        <FormTitle>Create Event</FormTitle>
        <Input
          type="text"
          name="name"
          placeholder="Event Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <Input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Event'}
        </SubmitButton>
      </Form>
    </EventFormContainer>
  );
};

export default EventForm;
