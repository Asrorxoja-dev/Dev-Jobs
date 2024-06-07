import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function Jobs() {
  const { id } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    console.log(`Fetching job with ID: ${id}`);
    fetch(`https://online-json-server-api.up.railway.app/project/666153071d2cd3eb1142d145/jobs/${id}`)
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
    return <div className='loading w-10 absolute top-64 left-[650px]'>Loading...</div>;
  }

  return (
    <div className='containe max-w-[1440px] bg-slate-50 ' >
      <div>
      <div className="card w-[730px] mx-auto card-side bg-base-100 shadow-xl">
  <figure><img className='w-44 rounded-lg p-7' style={{ background: job.logoBackground }} src={job?.logo?.slice(1)} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">{job.company}</h2>
    <p>{job.website}</p>
    <div className="card-actions justify-end">
      <Link to={job.website} className="btn text-primary font-bold">company site</Link>
    </div>
  </div>
</div>
      </div>

      <div className='p-10 mx-auto w-[730px] bg-white mt-20'>
        <div className='mt-5'>
        <h2 className="card-title text-base">
                      <div className="">{job.postedAt}</div>
                      <span className='mb-3 text-2xl'>.</span>
                      {job.contract}
                    </h2>
                    <div className='flex items-center'>
                    <p className='font-bold text-4xl mr-40'>{job.position}</p>
                    <Link to={job.apply} className='btn btn-primary text-white'>Apply Now</Link>
                    </div>
                      <p className='text-primary mt-3 font-bold'>{job.location}</p>
                      <p className='mt-7 text-x'>
                      Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi neque, aliquet vel, dapibus id, mattis vel, nisi. Sed pretium, ligula sollicitudin laoreet viverra, tortor libero sodales leo, eget blandit nunc tortor eu nibh. Nullam mollis. Ut justo. Suspendisse potenti. Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna.
                      </p>
                      <div>
                        <h2 className='font-bold text-xl mt-10'>Requirements</h2>
                          <p className='mt-6'>{job.requirements.content}</p>
                          <p className='mt-6'>{job.requirements.items}</p>

                      </div>

                      <div>
                        <h2 className='font-bold text-xl mt-10'>What You Will Do</h2>
                        <p className='mt-5'>{job.role.content}</p>
                        <p className='mt-10'>{job.role.items}</p>

                      </div>

                      <footer></footer>
          </div>
    
      </div>

      {/* <h1>{job.position}</h1>
      <p>{job.company}</p>
      <p>{job.location}</p>
      <p>{job.description}</p>  */}
    
    </div>
  );
}

export default Jobs;
