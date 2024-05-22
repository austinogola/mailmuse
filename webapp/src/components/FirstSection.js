import AnimationBox from './AnimationBox';
import { Box ,Flex,Text,Image } from '@chakra-ui/react'
import privImag from '../Images/icons8-privacy-100.png'
import calcImag from '../Images/icons8-calculator-100.png'
import numImg from '../Images/icons8-numbers-100.png'

function FirstSection() {
    return (
      <Flex alignItems='center' justifyContent='space-between' py='40px' 
      className='firstBox' flexWrap='wrap' pb='100px'>
        <Box  className='textDiv' marginBottom='20px'>
          {/* <Text fontSize='2rem' fontWeight='500'>
            Transform your communication and make a lasting impression 
          </Text> */}
          
          {/* <Text>
            Craft winning emails and master every email conversation with the power of our AI
          </Text> */}
          {/* <Text>
            From personalized message suggestion to converstation
            threads analysis, get started today and stand out from the crowd
          </Text> */}
          <Text fontSize='2rem' fontWeight='500'>
            Transform your communication and supercharge your email game
          </Text>
          <Text>
            Harness the latest technologies in A.I to elevate your 
            conversation skills and engage with clarity and confidence.
          </Text>
          <Text>
            Just give a brief prompt of what you want to say, or import an email thread and let 
            our AI do the talking for you, in your style
          </Text>
          
          
          
          <a href='https://app.ghostwrite.rip/get' target='_blank' rel='noreferrer'
          style={{textDecoration:"none"}}>
            <button style={{height:'45px', marginTop:'20px',
            display:'flex', alignItems:'center', outline:'none', color:'white', cursor:'pointer',
            border:'none', borderRadius:'7px', backgroundColor:'purple', padding:'7px'
            }}>Install Free Extension</button>
          </a>

          <Flex mt='25px'   >
            <Flex w='100px' h='50px' alignItems='center' mr='30px' p='3px' borderRadius='4px' border='1px solid grey'>
              <Image src={numImg} boxSize='35px'/>
              <Text m='0px' fontSize='12px' ml='5px' fontWeight='600' textAlign='center'>Simple to use</Text>
            </Flex>
            <Flex w='100px' h='50px'  alignItems='center'mx='30px' p='3px' borderRadius='4px' border='1px solid grey'>
              <Image src={privImag} boxSize='35px'/>
              <Text m='0px' fontSize='11px' ml='5px' fontWeight='600' textAlign='center'>Secure & Private</Text>
            </Flex>
            <Flex w='100px' h='50px' alignItems='center' mx='30px' p='3px' borderRadius='4px' border='1px solid grey'>
              <Image src={calcImag} boxSize='35px'/>
              <Text m='0px' ml='5px' fontSize='11px' fontWeight='600' textAlign='center'>Fast, seamless outputs</Text>
            </Flex>
            
          </Flex>
          
        </Box>

        <Flex  alignItems='center' justifyContent='center' 
        h='450px'  className='animationDiv'>
          <AnimationBox />
        </Flex>
      </Flex>
      // <section className='firstSection' id='home'>

      //       <div className='featureDiv'>
      //         <span></span>
      //         <span></span>
      //         <span></span>
      //       </div>
      //     </div>
      //   </div>

      //   <div className='animationDiv'>
      //     <ExampleImg />
      //   </div>
      //   </section>
       
  
    );
  }
  
  export default FirstSection;