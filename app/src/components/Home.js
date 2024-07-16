import Index from "./Index";
import {Box,Text,Flex, Link } from "@chakra-ui/react"
import {useState,useEffect} from 'react';
import { FiExternalLink } from "react-icons/fi";


import { useCookies } from 'react-cookie'






const Home=()=>{

    const [cookies, removeCookie] = useCookies(['ghostToken']);
   
    
    let ghostToken=cookies.ghostToken

    // let server_host=`http://127.0.0.1:5000`
    // let server_host=`https://server.mailmuse.site`

    const [creditBalance,setCreditBalance]=useState(0)

    const getConfig=()=>{
        return new Promise((resolve, reject) => {
            let url=`${process.env.REACT_APP_SERVER_HOST}/accounts/config`
            fetch(url,{
                method:'GET',
                headers:{
                    "Authorization":ghostToken
                }
            }).then(async res=>{
                let resp=await res.json()
                if(res.status===200){
                    const {info}=resp
                    setCreditBalance(info.credits)
                }else{
                    removeCookie('ghostToken')
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
        
    }

    const getThreads=()=>{
        return new Promise((resolve, reject) => {
            let url=`${process.env.REACT_APP_SERVER_HOST}/accounts/threads?size=5`
            fetch(url,{
                method:'GET',
                headers:{
                    "Authorization":ghostToken
                }
            }).then(async res=>{
                let resp=await res.json()
                if(res.status===200){
                    console.log(resp);
                    // setAllThreads(resp.threads)
                    // setCreditBalance(info.credits)
                    // setUserEmail(info.email)
                    // setAccountPlan(info.account_type)
                }else{
                    removeCookie('ghostToken')
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
        
    }
    useEffect(()=>{
        getConfig()
    },[getConfig])
    return(
        <Box>
            <Index selected='dashboard' mainPart={
                <Box >
                    <Box h='60px' 
                        display='flex' alignItems='center' px='20px' backgroundColor='white'>
                            <Text fontSize='15px' fontWeight='600'>Home</Text>
                    </Box>
                    <Box backgroundColor='#EFEEF6' h='fit-content' minHeight='550px' 
                         p='20px' pb='50px' >
                         <Box>

                         </Box>

                         {/* <Text fontWeight='500' fontSize='14px'>Recent Writes</Text> */}
                            
                            {creditBalance>=200?
                                <Flex>
                                    <Link display='flex' alignItems='center' target="_blank"
                                    href='https://mail.google.com/mail/u/0/#inbox?compose=new'>
                                    <Text mr='5px'>G-Mail</Text>
                                    <Box><FiExternalLink size='20px'/></Box>
                                     
                                    </Link>
                                    
                                </Flex>:
                                null
                            }
                         

                         <Box justifyContent='center' alignItems='center'>
                            
                         </Box>

                    </Box>

                </Box>
            }/>
        </Box>
    )
}


export default Home