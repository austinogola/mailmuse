import {
    Box,
    Text,
    Link,
    Flex
    
  } from "@chakra-ui/react"
  import './app.css' 

  import { useEffect,useState } from "react";
  import { useCookies } from 'react-cookie'

import Logo from "./Logo";
import {FiDownload   ,FiSettings ,FiHome ,FiLogOut } from "react-icons/fi";

import {AiOutlineCreditCard  } from "react-icons/ai";
// import { useLocation } from 'react-router-dom';

const Index=({selected,mainPart,title})=>{

    const logRedirect=()=>{
        const location = new URL(window.location.href)
     
        const bounce_to=location.pathname+location.search
       
        let whole_path=`/login?`+new URLSearchParams({bounce_to})
        window.location.href = whole_path;
    }

    const [cookies,removeCookie] = useCookies(['ghostToken']);

    let ghostToken=cookies.ghostToken

    if(!ghostToken){
        logRedirect()
    }

    // let ghostToken
    // const cookies = document.cookie.split(';');
    // console.log(cookies);
    // for (let i = 0; i < cookies.length; i++) {
    //     const cookie = cookies[i].trim();
    //     console.log(cookie);
    //     // Check if the cookie starts with the specified name
    //     if (cookie.startsWith('ghostToken=')) {
    //         ghostToken=cookie.substring('ghostToken='.length)
    //     }
    // }
    

    const [showNav,setShowNav]=useState(true)

    // const logOut=()=>{
    //     console.log('Logging out');
    //     document.cookie = "webToken=;expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    //     window.location.href = '/app/login';
    // }
    
    
    useEffect(()=>{
        

        // const hamburger=document.querySelector('#hamburger')
        // const navItems=document.querySelector("#navItems")
        // 
        

        if(window.innerWidth>=696){
            setShowNav(true)
        }else{
            setShowNav(false)
        }

        window.addEventListener('resize', ()=>{
            if(window.innerWidth>=696){
                setShowNav(true)
            }
        });
        
    },[])
    

    const changeMenu=(e)=>{
        // e.preventDefault()
        // let sec=e.target.id
       
    }
    
    const logoutPrcs=()=>{
        removeCookie("ghostToken")
        logRedirect()
    }
 
    
     
    return(
        <Box id='mainDiv' fontFamily="Roboto Mono">

            <Box id='sideNav'>
                <Flex  borderBottom='1px solid #EFEEF6' h='100px' id='logoFlex'>
                        <Logo/>
                        <span style={{fontSize:'25px',color:'black',cursor:"pointer"}} id='hamburger'
                        onClick={()=>{setShowNav(!showNav)}}>&#9776;</span>
                </Flex>

                {showNav?<Box id='navItems' border='1px solid #EFEEF6' position='relative' h='350px'>


                    <Link textDecoration='none' href='/' display='flex'  paddingLeft='10px' cursor='pointer' 
                        id='keys' onClick={changeMenu}
                        backgroundColor={selected==='dashboard'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <FiHome  color={selected==='dashboard'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='dashboard'?'white':'black'}
                            >Home</Text>
                    </Link>

                    <Link textDecoration='none' href='/billing' display='flex'  paddingLeft='10px' cursor='pointer' 
                        id='keys' onClick={changeMenu}
                        backgroundColor={selected==='billing'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <AiOutlineCreditCard  color={selected==='billing'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='billing'?'white':'black'}
                            >Billing & Payments</Text>
                    </Link>

                   


                        
                    <Link textDecoration='none' href='/install' display='flex' mt='80px' paddingLeft='10px' cursor='pointer' 
                        id='topLink' onClick={changeMenu}
                        backgroundColor={selected==='extension'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <FiDownload   color={selected==='extension'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='extension'?'white':'black'}
                            >Extension</Text>
                    </Link>
                    <Link textDecoration='none' href='/settings' display='flex'   paddingLeft='10px' cursor='pointer' 
                        id='keys' onClick={changeMenu}
                        backgroundColor={selected==='settings'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <FiSettings color={selected==='settings'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='settings'?'white':'black'}
                            >Settings</Text>
                    </Link>

                    <Box onClick={logoutPrcs} display='flex'  
                    paddingLeft='10px' cursor='pointer'  position='absolute' bottom='0px'
                        width='96%'
                        id='keys'
                        backgroundColor={selected==='settings'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <FiLogOut color={selected==='settings'?'white':'black'} size='20px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='settings'?'white':'black'}
                            >Log Out</Text>
                    </Box>



                    {/* <Text  onClick={logOut} m='0px'
                    display='flex' textDecoration='none' pl='10px' cursor="pointer"
                    _hover={{backgroundColor:'#467835'}} alignItems='center' justifyContent='flex-start'>
                        <FiLogOut color='white' size='20px'/>
                        <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color='white'
                            >Log out</Text>
                    </Text> */}
                </Box>:null}

            </Box>

            <Box h='100vh' overflow='scroll' >
                {mainPart}
            </Box>

            

        </Box>
       
    )
}



export default Index;