import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { submitResearch } from '../../redux/slices/researchSlice';
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      file: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('file', formData.file);

    console.log('this is form data: ',formDataToSend.get('file'));
  
    dispatch(submitResearch(formDataToSend))
      .unwrap()
      .then((response) => {
        console.log('Submission successful:', response);
      })
      .catch((error) => {
        console.error('Submission failed:', error);
        alert(error.message || 'An error occurred while submitting your research.');
      });
  };
  
  return (
    <div>
      <h3>Submit Research Paper</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', width: '50%', margin: 'auto' }}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
        <input
          type="file"
          name="file"
          onChange={handleFileChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default ResearchForm;
