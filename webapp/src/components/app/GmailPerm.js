import {
    Box,
    Text,
    Image,
    Link,
    Flex,
    Button
    
  } from "@chakra-ui/react"
  
import { CookiesProvider, useCookies } from 'react-cookie'
import GoogleButton2 from './GoogleButton2'
import gmailImg from '../icons8-gmail-96.png'

import Navbar from '../Navbar'


const GmailPerm=()=>{
    let WEB_HOST=`http://127.0.0.1:3000`
    const [cookies, setCookie, removeCookie] = useCookies(['ghostToken']);

    let ghostToken=cookies.ghostToken
    const G00GLE_ID= process.env.REACT_APP_GOOGLE_CLIENT_ID;

    if(!ghostToken){
        // const location = new URL(window.location.href)
        // const redirect_to=location.pathname+location.search
        // let whole_path='/app/login?'+new URLSearchParams({redirect_to})
        let whole_path='/app/login'
        window.location.href = whole_path;
    }

    return (
        <Box>
            <Navbar dontShow={true}/>

            <Box textAlign='center'>
                <Text fontWeight='500' fontSize='1.5rem' m={5}>Import Your Gmail Conversations</Text>
                <Text m={5} fontWeight='400'>To import your 
                <Text as="span" color='rgb(187,131,251)' fontWeight='500'> GMAIL </Text>
                threads, we need your permission to query emails</Text>

                <Flex alignItems='center' justifyContent='center' mt='15px'>
                    <Text w='50%' textAlign='center' minW='300px' m={0}>
                        Your data 
                        <Text as="span" color='rgb(187,131,251)' fontWeight='500'> PRIVACY </Text>
                        and 
                        <Text as="span" color='rgb(187,131,251)' fontWeight='500'> SECURITY </Text>
                        are an absolute priority for us. We do
                        <Text as="span" color='rgb(187,131,251)' fontWeight='500'> NOT </Text>
                        <Text as="span" color='rgb(187,131,251)' fontWeight='500'> STORE , </Text>
                        <Text as="span" color='rgb(187,131,251)' fontWeight='500'> SHARE , </Text>
                        or keep track of any of your emails threads
                    </Text>
                    
                </Flex>
                <Flex alignItems='center' justifyContent='center' mt='25px'>
                    <Link href='/policy' target="_blank" fontSize='13px' fontWeight='500'>
                        Review Our Privacy Policy
                     </Link>
                </Flex>
                

                
            </Box>

            <Flex alignItems='center' justifyContent='center' mt='7px'>
                <GoogleButton2
                    scopes={["https://www.googleapis.com/auth/gmail.readonly"]}
                    client_id={G00GLE_ID}
                    redirect_uri={`${WEB_HOST}/app/login/oauth/google`}
                    text={{value:'Grant MailMuse Access'}}
                    gImg={{src:gmailImg,width:'33px' }}
                />
            </Flex>
        </Box>
    )
}


export default GmailPerm