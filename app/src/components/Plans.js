
import {
    Box,
    Text,
    Image,
    Link,
    Flex
    
  } from "@chakra-ui/react"

  // import Navbar from "../Navbar"
  import Logo from "./Logo"



const Plans=()=>{
    return(
      <Box backgroundColor='#EFEEF6' h='100vh' >

        <Box backgroundColor='white' px='10px' py='3px'>

          <Flex alignItems='center'  h='100%'>
            <Logo/>
            <Text color='grey' fontWeight='500'  ml='12px'> PLANS</Text>
          </Flex>
          
        </Box>
        <Text textAlign='center' fontWeight='500' fontSize='2rem'>Choose your plan</Text>

      </Box>
    )
}


export default Plans