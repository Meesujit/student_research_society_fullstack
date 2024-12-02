import React from 'react'
import ResearchForm from '../../components/Research/ResearchForm'
import ResearchList from '../../components/Research/ResarchList'
import { useSelector } from 'react-redux'

const ResearchPage = () => {
  const { profile } = useSelector((state) => state.auth)
  return (
    <div>
      {profile?.role === 'admin' ? (
        // Admin View: Only show the research list
        <ResearchList isAdmin={true} />
      ) : (
        // User View: Show both the form and the list
        <>
          <ResearchForm />
          <ResearchList isAdmin={false} />
        </>
      )}
    </div>
  )
}

export default ResearchPage