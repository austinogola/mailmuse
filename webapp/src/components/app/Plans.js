
import {
    Box,
    Text,
    Image,
    Link,
    useDisclosure ,
    Flex
    
  } from "@chakra-ui/react"
  import Index from "./Index";

  import Navbar from "../Navbar"



const Plans=()=>{
    return(
        <Box>
            <Index selected='billing' mainPart={
                <Box>
                    <Box h='50px'
                        display='flex' alignItems='center' px='20px' backgroundColor='white'>
                            <Text fontSize='15px' fontWeight='600'>Home</Text>
                    </Box>
                    <Box backgroundColor='#EFEEF6' h='fit-content' minHeight='550px' 
                         p='20px' pb='50px' >

                    </Box>

                </Box>
            }/>

        </Box>
    )
}


export default Plans