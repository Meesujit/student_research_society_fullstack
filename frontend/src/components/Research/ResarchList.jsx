import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResearches, deleteResearch, approveResearch } from '../../redux/slices/researchSlice';

const ResearchList = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { list: researches } = useSelector((state) => state.research);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchResearches()).catch((error) => {
        console.error('Failed to fetch research papers:', error);
      });
    }
  }, [dispatch, user]);

  const filteredResearches = isAdmin
    ? researches
    : user
    ? researches.filter((research) => research.user === user.id)
    : [];

  const handleApprove = (id) => {
    dispatch(approveResearch(id))
      .unwrap()
      .then(() => {
        console.log('Research paper approved successfully');
      })
      .catch((error) => {
        console.error('Failed to approve research paper:', error);
      });
  };

  const handleDelete = (id) => {
    dispatch(deleteResearch(id))
      .unwrap()
      .then(() => {
        console.log('Research paper deleted successfully');
      })
      .catch((error) => {
        console.error('Failed to delete research paper:', error);
      });
  };

  return (
    <div style={{ margin: '20px 20px 0 20px', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h3>Research Papers</h3>
      <ul>
        {filteredResearches.length === 0 ? (
          <p>No research papers available.</p>
        ) : (
          filteredResearches.map((research) => (
            <li key={research._id}>
              <h4>{research.title}</h4>
              <p>{research.description}</p>
              <p>Status: {research.status}</p>
              {isAdmin && (
                <>
                  <p>Submitted by: {research.user.name} </p>
                  <p>Email: {research.user.email} </p>
                  <div>
                    <button
                      onClick={() => handleApprove(research._id)}
                      disabled={research.status === 'Approved'} // Disable if already approved
                    >
                      {research.status === 'Approved' ? 'Approved' : 'Approve'}
                    </button>
                    <button onClick={() => handleDelete(research._id)}>Delete</button>
                  </div>
                </>
              )}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ResearchList;
