import Navbar from '../components/Navbar';
import { Box ,Image,Flex,Link ,Text} from '@chakra-ui/react'
import './App.css';
import AnimationBox from '../components/AnimationBox';
import chromeImg from '../Images/icons8-chrome-48.png'


const Join=()=>{
    return(
        <div className='main' >
            <Navbar loginBtn={true}/>
            <Box id='joinDiv' px='50px' pt='30px' pb='100px'>
                <Box  px='20px'  > 
                 <AnimationBox/>
                </Box>
                <Box textAlign='center'>
                    <Text fontSize='3.5rem' fontWeight='500'>Write Amazing Emails</Text>
                    <Flex justifyContent='center' alignItems='center'>
                        <Link 
                        // href='https://app.ghostwrite.rip/get' 
                        href='https://chromewebstore.google.com/detail/mailmuse/pabjndociiaccmgnmogojopcaofmldlm'
                        target='_blank' textDecoration='none'>
                            <button style={{width:'200px',                            display:'flex', alignItems:'center', outline:'none', color:'white', cursor:'pointer',
                                border:'none', borderRadius:'7px', backgroundColor:'#F6AE08', padding:'10px'
                                }} title=''>
                                {/* <Box>Download<br/>Extension</Box> */}
                                
                                {/* <FiDownload size='20px' style={{marginLeft:'10px'}}/> */}
                                <Image src={chromeImg} boxSize='24px' marginRight='10px'/>
                                <Box>Add to Chrome For Free</Box>
                            </button>

                        </Link>
                        
                    </Flex>
                    
                </Box>
                
            </Box>

        </div>
    )
}


export default Join;