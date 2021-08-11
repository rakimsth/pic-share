/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import './App.css';
import Web3 from 'web3';
import Navbar from './Navbar';
import Main from './Main';
import Loader from '../global/Loader';
import bgimage from '../assets/shareLogo.png';
import { Web3Context } from './web3';

function App() {
  const [currentAccount, setCurrentAccount] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const { account } = useContext(Web3Context);

  const getDatafromWeb3 = async () => {};

  const createProject = async (name, desc, target, closingDate) => {};

  const fundProject = async (id, amount) => {};

  const closeProject = async (id) => {};

  useEffect(async () => {
    console.log(account);
    // await loadWeb3();
  }, []);

  return (
    <div>
      <Navbar account={account || ''} />
      <div className="container mt-5">
        <div className="row">
          <main className="col-lg-12">
            <div
              className="p-md-5 mb-4 text-white rounded"
              style={{
                backgroundImage: `url(${bgimage})`,
                height: '400px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
              }}
            />
            {loading ? (
              <Loader />
            ) : (
              <Main
                createProject={createProject}
                fundProject={fundProject}
                projects={projects}
                closeProject={closeProject}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default App;
