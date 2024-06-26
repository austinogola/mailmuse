import {
    Box,
    Text,
    Link,
    Flex
    
  } from "@chakra-ui/react"
  import './app.css' 

  import { useEffect,useState } from "react";
  import { useCookies } from 'react-cookie'
//   import logoImg from '../Images/lg-colored.png'
//   import Logo from "../Logo/Logo";
import Logo from "../Logo";
  import {FiDownload   ,FiSettings ,FiHome  } from "react-icons/fi";
import {AiOutlineCreditCard  } from "react-icons/ai";
// import { useLocation } from 'react-router-dom';

const Index=({selected,mainPart,title})=>{

    const [cookies] = useCookies(['ghostToken']);

    let ghostToken=cookies.ghostToken

    if(!ghostToken){
        // const location = new URL(window.location.href)
        // const redirect_to=location.pathname+location.search
        // let whole_path='/app/login?'+new URLSearchParams({redirect_to})
        let whole_path='/app/login'
            window.location.href = whole_path;
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
 
    
     
    return(
        <Box id='mainDiv' fontFamily="Roboto Mono">

            <Box id='sideNav'>
                <Flex  borderBottom='1px solid #91B496' h='100px' id='logoFlex'>
                        <Logo/>
                        <span style={{fontSize:'25px',color:'black',cursor:"pointer"}} id='hamburger'
                        onClick={()=>{setShowNav(!showNav)}}>&#9776;</span>
                </Flex>

                {showNav?<Box id='navItems'>


                    <Link textDecoration='none' href='/app' display='flex'  paddingLeft='10px' cursor='pointer' 
                        id='keys' onClick={changeMenu}
                        backgroundColor={selected==='dashboard'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <FiHome  color={selected==='dashboard'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='dashboard'?'white':'black'}
                            >Home</Text>
                    </Link>

                    <Link textDecoration='none' href='/app/billing' display='flex'  paddingLeft='10px' cursor='pointer' 
                        id='keys' onClick={changeMenu}
                        backgroundColor={selected==='billing'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <AiOutlineCreditCard  color={selected==='billing'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='billing'?'white':'black'}
                            >Billing & Payments</Text>
                    </Link>

                   


                        
                    <Link textDecoration='none' href='/app/install' display='flex' mt='100px' paddingLeft='10px' cursor='pointer' 
                        id='topLink' onClick={changeMenu}
                        backgroundColor={selected==='extension'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <FiDownload   color={selected==='extension'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='extension'?'white':'black'}
                            >Extension</Text>
                    </Link>
                    <Link textDecoration='none' href='/app/settings' display='flex'   paddingLeft='10px' cursor='pointer' 
                        id='keys' onClick={changeMenu}
                        backgroundColor={selected==='settings'?'#6147DB':'white'}
                        _hover={{backgroundColor:'#907EE5'}}
                        alignItems='center' justifyContent='flex-start'   h='40px'>
                            <FiSettings color={selected==='settings'?'white':'black'} size='18px'/>
                            <Text fontSize='12px' fontWeight='500' marginLeft='10px'
                            color={selected==='settings'?'white':'black'}
                            >Settings</Text>
                    </Link>


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

            {mainPart}

        </Box>
       
    )
}



export default Index;