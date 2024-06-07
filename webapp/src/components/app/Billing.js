
import {
    Box,
    Text,
    Image,
    Link,
    Flex,
    Button
    
  } from "@chakra-ui/react"
  import { CookiesProvider, useCookies } from 'react-cookie'

  import Index from "./Index";

  import { useEffect,useState } from "react";
  import freeImg from '../icons8-card-100-blue.png'
  import basicImg from '../icons8-card-100-purple.png'
  import proImg from '../icons8-card-100-gold.png'



const Billing=()=>{

    const [cookies, setCookie, removeCookie] = useCookies(['ghostToken']);

    const [creditBalance,setCreditBalance]=useState('-')
    const [userEmail,setUserEmail]=useState('-')
    const [accountPlan,setAccountPlan]=useState('-')

    let ghostToken=cookies.ghostToken

    // let server_host=`http://127.0.0.1:5000`
    let server_host=`https://server.mailmuse.site`
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
                    setUserEmail(info.email)
                    setAccountPlan(info.account_type)
                }else{
                    removeCookie('ghostToken')
                }
            })
            .catch(err=>{
                console.log(err);
            })
        })
        
    }
    getConfig()

    useEffect(()=>{
        
    },[])


    return(
        <Box>
            <Index selected='billing' mainPart={
                <Box>
                    <Box h='50px'
                        display='flex' alignItems='center' px='20px' backgroundColor='white'>
                            <Text fontSize='15px' fontWeight='600'>Billing & Payments</Text>
                    </Box>
                    <Box backgroundColor='#EFEEF6' h='fit-content' minHeight='550px' p='20px' pb='50px' >
                        <Box border='1px solid #E2E8F0' borderRadius='7px' w='50%' minWidth='300px' 
                        h='150px' backgroundColor='white'p='10px'>
                            <Text m='0px' fontWeight='600' fontSize='17px' mb='10px'>My Plan:</Text>
                            <Flex alignItems='center' mb='30px'>
                                <Flex alignItems='center' w='160px'>
                                    <Image src={
                                        accountPlan==='free'?freeImg:
                                        accountPlan==='basic'?basicImg:
                                        accountPlan==='pro'?proImg:
                                        freeImg
                                        } 
                                    boxSize='50px'/>
                                    <Text fontWeight='500' fontSize='14px' ml='10px'>{accountPlan.toUpperCase()}</Text>
                                </Flex>
                                <Flex alignItems='center' justifyContent='center' w='100px'>
                                    <Button h='30px' w='80px' outline='none' color='white' cursor='pointer'
                                    border='none' backgroundColor='#FF3D64' borderRadius='99px' 
                                    onClick={()=>window.location.href = '/app/billing/plans'}>
                                            Upgrade
                                    </Button>
                                </Flex>
                            </Flex>
                            
                            <Flex alignItems='center'>
                                <Flex w='160px'>
                                    <Text fontWeight='400' fontSize='13px' m='0px'>{creditBalance} monthly emails left</Text>
                                </Flex>
                                <Flex alignItems='center' justifyContent='center'>
                                    <Button h='30px' w='100px' outline='none' color='#FF3D64' cursor='pointer'
                                        border='#FF3D64 1px solid' backgroundColor='white' borderRadius='99px'>
                                                Add credits
                                    </Button>
                                </Flex>
                                    
                            </Flex>
                            
                            
                            
                        </Box>  
                        
                    </Box>

                </Box>
            }/>

        </Box>
    )
}


export default Billing