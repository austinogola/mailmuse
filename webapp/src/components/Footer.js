import {Box,Flex,Text,Link } from "@chakra-ui/react"

import { FiFacebook ,FiInstagram,FiTwitter } from "react-icons/fi";

const Footer=()=>{
    return(
        <Box h='300px' backgroundColor='#101010' position='relative' pt='20px'>
            <Flex justifyContent='center' alignItems='center' mt='20px'>
                    <Link w='40px' h='40px' backgroundColor='white' mx='20px'
                    borderRadius='50%' href='#' display='flex' justifyContent='center' alignItems='center'>
                        <FiFacebook color="black" size='25px'/>
                    </Link>
                    <Link w='40px' h='40px' backgroundColor='white' mx='20px'
                    borderRadius='50%' href='#' display='flex' justifyContent='center' alignItems='center'>
                        <FiInstagram color="black" size='25px'/>
                    </Link>
                    <Link w='40px' h='40px' backgroundColor='white' mx='20px'
                    borderRadius='50%' href='#' display='flex' justifyContent='center' alignItems='center'>
                        <FiTwitter  color="black" size='25px'/>
                    </Link>
            </Flex>
            <Flex justifyContent='center' alignItems='center' mt='20px'>
                <Link href="#" color='#989898' mx='20px' fontSize='14px'>Home</Link>
                <Link href="/contact" target="_blank" color='#989898' mx='20px' fontSize='14px'>Contact Us</Link>
                <Link href="/terms" target="_blank" color='#989898' mx='20px' fontSize='14px'>Terms of Service</Link>
                <Link href="/policy" target="_blank" color='#989898' mx='20px' fontSize='14px'>Privacy Policy</Link>
            </Flex>

            <Box backgroundColor='black' position='absolute' bottom='0px' h='50px' w='100%'>
                    <Text textAlign='center' color='white' fontSize='12px'>
                        Copyright <strong style={{fontSize:'18px'}}>&#169;</strong> 2023 by MailMuse AI
                    </Text>
            </Box>

        </Box>
    )
}


export default Footer