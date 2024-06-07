import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import searchIcon from '../../public/assets/desktop/icon-search.svg';
import location from '../../public/assets/desktop/icon-location.svg';

const themes = {
  dark: "dracula",
  light: "winter",
};

function Home() {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState(darkModeLocalstorage());

  function darkModeLocalstorage() {
    return localStorage.getItem("mode") || themes.light;
  }

  const handleClick = () => {
    const newTheme = theme === themes.light ? themes.dark : themes.light;
    setTheme(newTheme);
    localStorage.setItem("mode", newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    fetch('https://online-json-server-api.up.railway.app/project/666153071d2cd3eb1142d145/jobs')
      .then(response => response.json())
      .then(responseData => {
        if (responseData.data && Array.isArray(responseData.data)) {
          setData(responseData.data);
        } else {
          console.error('Data is not an array:', responseData);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  if (data.length === 0) {
    return (
      <div className='loading w-10 absolute top-64 left-[650px]'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className='bg-slate-100'>
      <div className="container">
        <nav className='w-[1346px] h-[160px]'>
          <div className='flex justify-between p-6 w-full'>
            <div>
              <h1 className='text-3xl ml-20 text-white font-bold'>devjobs</h1>
            </div>
            <div className="form-control w-52">
              <label className="cursor-pointer label">
                <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  onClick={handleClick}
                  defaultChecked={theme === "dracula" ? false : true}
                />
              </label>
            </div>
          </div>
          <div className='flex justify-center mt-8 ml-[-40px]'>
            <div>
              <img className='w-6 top-7 left-10 relative' src={searchIcon} alt="Search Icon" />
            </div>
            <div>
              <input className='outline-none rounded-l-md w-96 h-20 pl-12 search' type="search" placeholder='Filter by title, companies, expertise…' />
            </div>
            <div>
              <div className='absolute'>
                <img className='w-5 top-7 left-4 relative' src={location} alt="Location Icon" />
              </div>
              <select className="w-64 h-20 pl-10 border-l outline-none" defaultValue="">
                <option value="" disabled>Filter by location…</option>
                <option>Han Solo</option>
                <option>Greedo</option>
              </select>
            </div>
            <div className='w-80 h-20 px-6 border-l rounded-r-md bg-white flex justify-between items-center'>
              <input type="checkbox" name="location" id="1" />
              <p className='font-bold'>Full Time Only</p>
              <button className='btn btn-primary'>Search</button>
            </div>
          </div>
        </nav>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-3 mx-auto ml-16 mt-28'>
          {data.map((job) => (
            <Link to={`/jobs/${job.id}`} key={job.id}>
              <div className='border-none mb-10 cursor-pointer h-50 w-96'>
                <div className="w-full h-full border-none bg-base-100 shadow-xl">
                  <figure className='absolute'>
                    <img className='w-16 h-16 bottom-7 left-4 relative p-3 bg-cover object-contain rounded-2xl' style={{ background: job.logoBackground }} src={job.logo} alt="Company Logo" />
                  </figure>
                  <div className="card-body">
                    <h2 className="card-title text-base">
                      <div className="">{job.postedAt}</div>
                      <span className='mb-3 text-2xl'>.</span>
                      {job.contract}
                    </h2>
                    <p className='font-bold'>{job.position}</p>
                    <p>{job.company}</p>
                    <h3 className='text-primary font-bold mt-8'>{job.location}</h3>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
