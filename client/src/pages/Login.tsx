import React from 'react';




const Login: React.FC = () => {
  
  return (
    

   
    
    <div style={{backgroundImage:"url('login-background.png')", backgroundSize:"1920px 1000px", height:"953px", marginTop: "-50px"}}>

      


      <h1 style={{color:"#FFFFFF", fontSize:"50px", textAlign:"center", paddingTop:"160px"}}>
        Hacklahoma
      </h1>
      <div style={{backgroundColor:'#9AB7E2', height: "355px", width: "400px", display:"block", marginLeft:"auto", marginRight:"auto", borderRadius:"25px", marginTop:"-10px"}} >
        <h1 style={{color:"white", paddingLeft:"15px", paddingTop:"10px"}}>
          Login
        </h1>

        <h2 style={{marginTop:"-20px", color:"#4E82CC", paddingLeft:"15px", fontSize:"20px", paddingBottom:"5px"}}>
          Username
        </h2>
        <div style={{marginTop:"-20px", paddingLeft: "15px",}}>
          <form action="" >
            <input type="text" style={{borderRadius: "5px", border:"0", height: "25px", width:"360px", outline:"none", fontSize:"15px"}} />
          </form>

        </div>

        <h2 style={{marginTop:"0px",  color:"#4E82CC", paddingLeft:"15px", fontSize:"20px", paddingBottom:"5px"}}>
          Password
        </h2>
        <div style={{marginTop:"-20px", paddingLeft: "15px",}}>
          <form action="" >
            <input type="password" style={{borderRadius: "5px", border:"0", height: "25px", width:"360px", outline:"none", fontSize:"15px"}} />
          </form>

      
        <div style={{height:"40px", width:"40px", backgroundColor:"white", marginTop:"10px", display:"block", textAlign:"center", borderRadius:"50px"}}>
          <img src="google-logo.png" alt="" style={{paddingTop:"15px", maxWidth:"30px", maxHeight:"30px", marginTop:"-10px"}} />
        </div>
        <body style={{marginTop:"-31px", marginLeft:"50px", color:"white"}}>
          <a href="" style={{color:"white", textDecoration:"none"}} ><strong>Login with Google</strong></a>
        </body>
      
        
      
       
        <br/>
        
        <div style={{height:"40px", width:"40px", backgroundColor:"white", marginTop:"-5px", display:"block", textAlign:"center", borderRadius:"50px"}}>
          <img src="microsoft-logo.png" alt="" style={{paddingTop:"15px", maxWidth:"40px", maxHeight:"40px", marginTop:"-15px", marginLeft:"-1px"}} />
        </div>
        <body style={{marginTop:"-31px", marginLeft:"50px", color:"white"}}>
          <a href="" style={{color:"white", textDecoration:"none"}} ><strong>Login with Microsoft</strong></a>
        </body>

        <button style={{backgroundColor:"#4E82CC", color:"white", width:"360px", height:"35px", border:"none", marginTop:"20px", borderRadius:"8px", cursor:"pointer"}}>
          <h3 style={{fontSize:"20px", marginTop:"7px"}}>
            Enter
          </h3>
        </button>
      <a href="" style={{textDecoration:"none"}}>
        <h3 style={{color:"#4E82CC", fontSize:"13px", textAlign:"center"}}>
          New User? Register Here!
        </h3>
      </a>
        


        
        
         

        </div>






      </div>

      
    </div>


   
  );
} 

export default Login;