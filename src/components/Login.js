import React, { useState } from "react";
import { GoogleLogin } from "react-google-login"


export default function Login({ flag, setFlag }) {


  const [name, setName] = useState("");
  const clientID = "470759243520-3raplrojn4qdgdv8tdvhk95kudrkmgrg.apps.googleusercontent.com";
  const onSuccess = (res) => {
    setName(res.profileObj["name"]);
    console.log("Success", res.profileObj);
    setFlag(true);
  }

  const onFailure = (res) => {
    console.log("Failed", res);
  }
  //  
  return (
    <div>

      <div style={{ marginTop: '150px' }}>

        <h3>Please sign in to continue</h3>
        <GoogleLogin
          clientId={clientID}
          onSuccess={onSuccess}
          onFailure={onFailure}
          buttonText='Sign in with Google'
          cookiePolicy={'single_host_origin'}
          isSignedIn={false}
        />
        {/* <GoogleLogin onSuccess={onSuccess} onError={onFailure} /> */}
      </div>
    </div>
  )
}
