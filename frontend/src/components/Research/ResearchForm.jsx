import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitResearch } from '../../redux/slices/researchSlice';
import {
  ResearchFormContainer,
  FormTitle,
  Form,
  Input,
  Textarea,
  SubmitButton,
} from './ResearchFormStyle';

const ResearchForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
  });

  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.research);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);

    dispatch(submitResearch(formDataToSend))
      .unwrap()
      .then(() => console.log('Submitted'))
      .catch((err) => console.error(err));
  };

  return (
    <ResearchFormContainer>
      <FormTitle>Submit Research Paper</FormTitle>
      <Form onSubmit={handleSubmit}>
        <Input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
        <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} required />
        <Input type="file" name="file" onChange={handleFileChange} required />
        <SubmitButton type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </SubmitButton>
      </Form>
    </ResearchFormContainer>
  );
};

export default ResearchForm;
