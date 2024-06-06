import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Jobs() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    console.log(`Fetching job with ID: ${id}`);
    fetch(`https://online-json-server-api.up.railway.app/project/666153071d2cd3eb1142d145/jobs/` + id)
      .then(response => response.json())
      .then(responseData => {
        console.log('Job data:', responseData);
        setJob(responseData);
      })
      .catch(err => {
        console.error(err);
      });
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{job.position}</h1>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>
      {/* Add other job details here */}
    </div>
  );
}

export default Jobs;
