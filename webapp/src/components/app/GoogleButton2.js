import React from 'react';
import gImage from '../icons8-google-48.png'

const GoogleButton2 = ({ redirect_uri, client_id,gImg,text,styles,scopes}) => {
    function getGoogleOAuthURL() {
      const rootUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const options = {
        redirect_uri,
        client_id,
        access_type: "offline",
        response_type: "code",
        prompt: "consent",
        scope: scopes?[...scopes] :[
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ].join(" "),
      };
      // "https://www.googleapis.com/auth/gmail.readonly"
      const qs = new URLSearchParams(options);
      return `${rootUrl}?${qs.toString()}`;
    }

    function handleButtonClick(event) {
      const googleButtonLink = document.getElementById('google-button-link');
      googleButtonLink.click();
    }
  
    return (
      <button onClick={handleButtonClick}
      style={{
        width:'280px',
        height:'45px',
        backgroundColor:'white',
        outline:'none',
        border:"none",
        boxShadow:'2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
        textDecoration:'none',
        cursor:'pointer',
        display:'flex',
        alignItems:'center',
        justifyContent:'space-around',
        ...styles
        }}>

        <img src={gImg?gImg.src:gImage || gImage} 
        width={gImg?gImg.width:30 || 30} 
        length={gImg?gImg.length:30 || 30} 
          alt='Google Img'
        />
        <a href={getGoogleOAuthURL()} id="google-button-link"
        style={{textDecoration:'none',color:'#686868',fontWeight:'500',fontSize:'15px',...text}}>
          {text?text.value:'Sign in with Google' || 'Sign in with Google'}
        </a>
        
        
      </button>
    );
  };
  
  export default GoogleButton2;
  