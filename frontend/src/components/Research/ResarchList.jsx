import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResearches, deleteResearch, approveResearch } from '../../redux/slices/researchSlice';
import {
  ResearchListContainer,
  ListTitle,
  ResearchItem,
  ResearchDetails,
  ButtonGroup,
} from './ResearchListStyle';

const ResearchList = ({ isAdmin }) => {
  const dispatch = useDispatch();
  const { list: researches } = useSelector((state) => state.research);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchResearches());
    }
  }, [dispatch, user]);

  const filteredResearches = isAdmin
    ? researches
    : user
    ? researches.filter((research) => research.user === user.id)
    : [];

  const handleApprove = (id) => {
    dispatch(approveResearch(id));
  };

  const handleDelete = (id) => {
    dispatch(deleteResearch(id));
  };

  return (
    <ResearchListContainer>
      <ListTitle>Research Papers</ListTitle>
      <ul>
        {filteredResearches.map((research) => (
          <ResearchItem key={research._id}>
            <ResearchDetails>
              <h4>{research.title}</h4>
              <p>{research.description}</p>
              <p>Status: {research.status}</p>
              {isAdmin && (
                <>
                  <p>Submitted by: {research.user.name}</p>
                  <ButtonGroup>
                    <button className="approve" onClick={() => handleApprove(research._id)} disabled={research.status === 'Approved'}>
                      {research.status === 'Approved' ? 'Approved' : 'Approve'}
                    </button>
                    <button className="delete" onClick={() => handleDelete(research._id)}>
                      Delete
                    </button>
                  </ButtonGroup>
                </>
              )}
            </ResearchDetails>
          </ResearchItem>
        ))}
      </ul>
    </ResearchListContainer>
  );
};

export default ResearchList;
