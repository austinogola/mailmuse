import { Box ,Image,Flex,Link,Text } from '@chakra-ui/react'
import Navbar from './Navbar'
import GoogleButton2 from './Buttons/GoogleButton'
import alternativeG from './Images/icons8-google1-96.png'
import { CiMail } from "react-icons/ci";
// import MyComponent from './dist/bundle.js';


// styles={{outline:'1px solid pink',border:'1px solid blue',backgroundColor:'gray'}}
// gImg={{src:alternativeG,width:'30px',height:'30px'}}
// text={{value:'Log In with Google',fontSize:'16px',fontWeight:500,color:'red'}}

const Login=()=>{
   
    const G00GLE_ID= process.env.REACT_APP_GOOGLE_CLIENT_ID;

    const redirect_uri=`${process.env.REACT_APP_WEB_HOST}/oauth-google`
    console.log(redirect_uri);
    // console.log(G00GLE_ID);
    // console.log(process.env);
    return(
        <Box justifyContent='center' alignItems='center'>
            <Navbar dontShow={true}/>
            <Text textAlign='center' mt='20px' fontSize='2rem' fontWeight='500'>Login to Mailmuse</Text>
            <Box>
            <Flex justifyContent='center' alignItems='center'>
                <GoogleButton2 
                    client_id={G00GLE_ID}
                    redirect_uri={`${process.env.REACT_APP_WEB_HOST}/oauth-google`}

                    styles={{width:'290px'}}
                    />

            </Flex>
            <Flex justifyContent='center' alignItems='center'>
                <Link href='/email-login' textDecoration='none'>

                    <button 
                        style={{
                            width:'290px',
                            height:'45px',
                            backgroundColor:'#BD87FB',
                            marginTop:'30px',
                            color:'white',
                            outline:'none',
                            border:"none",
                            boxShadow:'2px 2px 4px 2px rgba(0, 0, 0, 0.3)',
                            textDecoration:'none',
                            cursor:'pointer',
                            display:'flex',
                            alignItems:'center',
                            justifyContent:'space-around',
                            fontSize:'15px'
                        }}>
                        <CiMail size='28px'/>
                        Sign in with Email
                        </button>

                </Link>
                
            </Flex>

            <Flex justifyContent='center' alignItems='center' mt='20px'>
                <Text fontSize='14px'>
                Don't have an account?  
                <Link href='/register' fontSize='14px' textDecoration='none'> Sign Up</Link>
                </Text>
            </Flex>
            

            </Box>
        </Box>
    )

}

export default Login