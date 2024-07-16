import { Box ,Image,Flex,Link,Text } from '@chakra-ui/react'
import Navbar from './Navbar'
import {GoogleButton} from 'react-oauth-ninja';
import alternativeG from './Images/icons8-google1-96.png'
import { CiMail } from "react-icons/ci";




const Signup=()=>{
  
    const G00GLE_ID= process.env.REACT_APP_GOOGLE_CLIENT_ID;
    return(
        <Box justifyContent='center' alignItems='center'>
            <Navbar dontShow={true}/>
            <Text textAlign='center' mt='20px' fontSize='2rem' fontWeight='500'>Register for Mailmuse</Text>
            <Box>
            <Flex justifyContent='center' alignItems='center'>
                <GoogleButton 
                    client_id={G00GLE_ID}
                    redirect_uri={`${process.env.REACT_APP_WEB_HOST}/oauth-google`}
                    text={{value:'Continue with Google'}}
                    styles={{width:'290px'}}
                    />

            </Flex>
            <Flex justifyContent='center' alignItems='center'>
                <Link href='/register-email' textDecoration='none'>

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
                        Register with Email
                        </button>

                </Link>
                
            </Flex>

            <Flex justifyContent='center' alignItems='center' mt='20px'>
                <Text fontSize='14px'>
                Already have an account?  
                <Link href='/login' fontSize='14px' textDecoration='none'> Log In</Link>
                </Text>
            </Flex>
            

            </Box>
        </Box>
    )

}

export default Signup