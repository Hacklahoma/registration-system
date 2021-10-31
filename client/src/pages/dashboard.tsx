import React from "react";
import "../style/dashboard.scss";



const Dashboard: React.FC = () => {

    return (

        <div className="dashboard">

            


        <div className="wrapper">
            <div className="sidebar">
               <h2>Hacklahoma Admin</h2>
                <ul>
                    <div className="box"><li><a><span className="box">Dashboard</span></a></li></div>
                    <li><a><span className="box">Users</span></a></li>
                    <li><a><span className="box">Events</span></a></li>
                    <li><a><span className="box">Applications</span></a></li>
                    <li><a><span className="box">Groups</span></a></li>
                    <li><a><span className="box">Teams</span></a></li>
                    <li><a><span className="box">Logout</span></a></li>
                </ul>
            </div>

                

        </div>

        

        </div>
      

            
            
    );


};

export default Dashboard;