import { Box ,Flex,Link,Text,Input,FormControl, Button,CircularProgress } from '@chakra-ui/react'
import Navbar from './Navbar'
import {useState,useEffect} from 'react';

import { useCookies } from 'react-cookie'

const EmailLogin=()=>{
    const [error,setError]=useState({email:false,password:false})
    const [showLoading,setShowLoading]=useState(false)

    const [setCookie, removeCookie] = useCookies(['ghostToken']);
    
    function isValidEmail(email) {
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailPattern.test(email);
      }

    //   let server_host=`http://127.0.0.1:5000`
    // server_host=`https://server.mailmuse.site`

    const submitForm=()=>{
        setError({email:false,password:false})
        setShowLoading(true)
        const email=document.querySelector('input#email').value
        const password=document.querySelector('input#password').value

        if(!email || email.length<1){
            console.log('None');
            return setError({email:'Email field is required'})
        }
        if(!password || password.length<1){
            return setError({password:'Password field is required'})
        }
        if(!isValidEmail(email)){
            return setError({email:'Please provide a valid email'})
        }

        let body={email,password}

        let url=`${process.env.REACT_APP_SERVER_HOST}/accounts/web/login`
        fetch(url,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(body)
        })
        .then(async res=>{
            let resp=await res.json()
            setShowLoading(false)
            console.log(resp);
            if(res.status===200){
                const {ghostToken}=resp

                const date = new Date();
                date.setTime(date.getTime() + (21 * 24 * 60 * 60 * 1000)); // 21 days from now
                setCookie('ghostToken',ghostToken,{path:'/',expires:date})
                // document.cookie = `ghostToken=${ghostToken}; max-age=${24 * 15 * 60 * 60}; path=/`
                window.location.href = '/dashboard';
            }else{
                if(resp.type==='email'){
                    return setError({email:resp.message})
                }
                else if(resp.type==='password'){
                    return setError({password:resp.message})
                }
                else if(resp.type==='both'){
                    return setError({email:resp.message,password:resp.message})
                }
                else{
                    return setError({email:resp.message,password:resp.message}) 
                }
                
            }
        })
    }

    useEffect(()=>{
        removeCookie('ghostToken')
    },[removeCookie])
    return(
        <Box>
            <Navbar dontShow={true}/>

            <Text textAlign='center' mt='20px' fontSize='1.5rem' fontWeight='500'>Login to Mailmuse</Text>


            <Flex mt='30px' justifyContent='center' alignItems='center'>
                <FormControl w='40%' minWidth='300px' border='1px solid grey' p='20px' 
                borderRadius='5px' position='flex'>

            {showLoading?<Box position='absolute' top='45%' right='50%'>
                <CircularProgress isIndeterminate color='#BD87FB' />
            </Box>:null}
                    
                    <Flex justifyContent='center' alignItems='center' mt='20px'>
                        <Input placeholder='Email' outline='none' 
                        border={error.email?'1px solid #E67777':'1px solid #E2E8F0'} id='email'
                        w='280px' h='40px' borderRadius='5px' _focus={{border:"2px solid #BD87FB"}}/>
                    </Flex>
                    {error.email?
                        <Flex justifyContent='center' alignItems='center'>
                        <Text fontSize='13px' m='2px' color='#E67777'>{error.email}</Text>
                    </Flex>:null}
                    

                    <Flex justifyContent='center' alignItems='center' mt='20px'>
                        <Input placeholder='Password' outline='none' 
                        border={error.password?'1px solid #E67777':'1px solid #E2E8F0'} id='password'
                        w='280px' h='40px' borderRadius='5px' _focus={{border:"2px solid #BD87FB"}} />
                    </Flex>
                    {error.password?
                        <Flex justifyContent='center' alignItems='center'>
                        <Text fontSize='13px' m='2px' color='#E67777'>{error.password}</Text>
                    </Flex>:null}

                    <Flex justifyContent='center' alignItems='center' mt='20px'>
                        <Button w='282px' h='40px' border='none' outline='none' 
                        fontWeight='500' backgroundColor='#BD87FB' color='white' 
                        borderRadius='5px' cursor='pointer' onClick={submitForm}>
                                Login
                        </Button>
                    </Flex>

                    <Flex justifyContent='center' alignItems='center' mt='20px'>
                        <Text fontSize='14px'>
                        Don't have an account?  
                        <Link href='/register' fontSize='14px' textDecoration='none'> Sign Up</Link>
                        </Text>
                    </Flex>

                    
                </FormControl>
                

            </Flex>
            
            

        </Box>
    )
}






export default EmailLogin