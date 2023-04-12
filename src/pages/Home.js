import React,{ useState } from 'react'
import {useNavigate} from 'react-router-dom';

import Layout from "../components/Layout"
 
function Home() {
    const  [searchSkill, setSearchSkill] = useState('')
  
    const navigate = useNavigate();

    const navigateToEmployeeFilter = () => {
      // 👇️ navigate to /contacts
      console.log(searchSkill);
      navigate(`/filter/`+ searchSkill);
    };
    
  
    return (
        <Layout>
           <div className="container">
           <h2 className="text-center mt-5 mb-3">Home</h2>
                <div className="card">
                   
                    <div className="card-body">
                       <p>Hello,</p>
                       <p>What skills are you looking to hire?</p>
                       <input placeholder='Python, NetSuite, etc..'
                            onChange={(event)=>{setSearchSkill(event.target.value)}}
                            type="text"
                            className="form-control"
                            id="skill"
                            name="skill"/>
    
                            <div className='text-right'>
                            <button   disabled={searchSkill.length < 3} onClick={navigateToEmployeeFilter} className="btn btn-outline-primary mt-3">Search</button>

                            </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
  
export default Home;