
import { Box ,Flex,Text,Image } from '@chakra-ui/react'
import composeImg from '../Images/folks-man-programmer-writing-code.png'
import importImg from '../Images/folks-girl-with-money-tube.png'
import insightImg from '../Images/folks-traveller-woman-with-map-near-signpost.png'
import styleImg from '../Images/folks-woman-drawing-an-abstract-picture.png'


function ThirdSection() {
    return (
      <Flex alignItems='center' justifyContent='center' py='10px' 
      className='thirdBox' flexWrap='wrap' pb='100px'>

        {/* <Flex justifyContent='center' alignItems='center' h='400px'>
            <Box h='95%' w='90%' border='1px solid black' borderRadius='6px' px='7px'>
                <Text textAlign='center' fontWeight='bold'>Compose Effortlessly </Text>
                <Flex  h='230px' borderRadius='6px' justifyContent='center'>
                    <Image src={composeImg} maxWidth='100%' h='auto'/>
                </Flex>
                <Text textAlign='center' fontSize='13px'>
                    Say goodbye to writer's block! Our extension uses advanced AI to help you 
                    draft emails quickly and professionally.
                </Text>
            </Box>
        </Flex> */}

        <Flex justifyContent='center' alignItems='center' h='400px' >
            <Box h='95%' w='90%' border='1px solid black' borderRadius='6px' px='7px'>
                <Text textAlign='center' fontWeight='bold'>Import Email Threads </Text>
                <Flex  h='230px' borderRadius='6px' justifyContent='center'>
                    <Image src={importImg} maxWidth='100%' h='auto'/>
                </Flex>
                <Text textAlign='center' fontSize='13px'>
                    Import entire email threads and let our AI analyze the context and produce 
                    context-aware responses.
                </Text>
            </Box>
        </Flex>

        <Flex justifyContent='center' alignItems='center' h='400px'>
            <Box h='95%' w='90%' border='1px solid black' borderRadius='6px' px='7px'>
                <Text textAlign='center' fontWeight='bold'>Get Strategic Insights</Text>
                <Flex  h='230px' borderRadius='6px' justifyContent='center'>
                    <Image src={insightImg} maxWidth='100%' maxHeight='230px'/>
                </Flex>
                <Text textAlign='center' fontSize='13px'>
                    Define your objectives and goals for the conversation and 
                    receive suggestions on how best ways to approach it.
                </Text>
            </Box>
        </Flex>
        
        <Flex justifyContent='center' alignItems='center' h='400px'>
            <Box h='95%' w='90%' border='1px solid black' borderRadius='6px' px='7px'>
                <Text textAlign='center' fontWeight='bold'>Train It to Your Style</Text>
                <Flex  h='230px' borderRadius='6px' justifyContent='center'>
                    <Image src={styleImg} maxWidth='100%' maxHeight='230px'/>
                </Flex>
                <Text textAlign='center' fontSize='13px'>
                    Simply edit every output and save what you like and our AI will emulate your
                    stlye and voice based on what you've liked
                </Text>
            </Box>
        </Flex>
          
          
          
      </Flex>
     
       
  
    );
  }
  
  export default ThirdSection;