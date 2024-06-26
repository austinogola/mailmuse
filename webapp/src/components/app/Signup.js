import { Box ,Image,Flex,Link,Text } from '@chakra-ui/react'
import Navbar from '../Navbar'
import GoogleButton2 from './GoogleButton2'
import alternativeG from '../icons8-google1-96.png'
import { CiMail } from "react-icons/ci";
// import MyComponent from './dist/bundle.js';


// styles={{outline:'1px solid pink',border:'1px solid blue',backgroundColor:'gray'}}
// gImg={{src:alternativeG,width:'30px',height:'30px'}}
// text={{value:'Log In with Google',fontSize:'16px',fontWeight:500,color:'red'}}

const Signup=()=>{
    let WEB_HOST=`http://127.0.0.1:3000`
    return(
        <Box justifyContent='center' alignItems='center'>
            <Navbar dontShow={true}/>
            <Text textAlign='center' mt='20px' fontSize='2rem' fontWeight='500'>Register for Mailmuse</Text>
            <Box>
            <Flex justifyContent='center' alignItems='center'>
                <GoogleButton2 
                    client_id='127610733883-iin5mu4ceu6hd1f8vj0fil8ubn3ift2k.apps.googleusercontent.com'
                    redirect_uri={`${process.env.REACT_APP_WEB_HOST}/app/login/oauth/google`}
                    text={{value:'Register with Google'}}
                    styles={{width:'290px'}}
                    />

            </Flex>
            <Flex justifyContent='center' alignItems='center'>
                <Link href='/app/login/email' textDecoration='none'>

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
                <Link href='/app/login' fontSize='14px' textDecoration='none'> Log In</Link>
                </Text>
            </Flex>
            

            </Box>
        </Box>
    )

}

export default Signup