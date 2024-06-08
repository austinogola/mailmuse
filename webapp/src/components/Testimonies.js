
import { Box ,Flex,Text } from '@chakra-ui/react'


function Testimonies() {
    return (
      <Box mt='100px'>

        <Text textAlign='center' fontSize='2rem'>
          What Our Clients Say
        </Text>

        <Flex alignItems='center' justifyContent='center' py='10px' 
              className='testimoniesBox' flexWrap='wrap' pb='100px'>

                <Flex justifyContent='center' alignItems='center' h='350px' >
                    <Box h='95%' w='90%' border='1px solid grey' borderRadius='6px'>

                    </Box>
                </Flex>
                <Flex justifyContent='center' alignItems='center' h='350px'>
                    <Box h='95%' w='90%' border='1px solid grey' borderRadius='6px'>

                    </Box>
                </Flex>
                
                <Flex justifyContent='center' alignItems='center' h='350px' >
                    <Box h='95%' w='90%' border='1px solid grey' borderRadius='6px'>

                    </Box>
                </Flex>
                  
                  
                  
        </Flex>

      </Box>
      
     
       
  
    );
  }
  
  export default Testimonies;