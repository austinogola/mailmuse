
import { Box ,Image,Flex,Link } from '@chakra-ui/react'
// import { FiDownload } from "react-icons/fi";
import chromeImg from './Images/icons8-chrome-48.png'
// import './components.css'
import './app.css'
import Logo from './Logo'

function Navbar(props) {
  return (
    <Flex h='80px' boxShadow='' alignItems='center' px='50px' 
    justifyContent='space-between' id='nav_root'
    style={{boxShadow:'0 2px 8px 1px rgba(0, 0, 0, 0.2)'}}>
      <Logo />

      {!props.dontShow?<Flex justifyContent='space-between' minW='40%' id='nav_btns' alignItems='center'>
        <Link id='new_navLink' href='/' textDecoration='none'>Home</Link>
        <Link id='new_navLink' href='/app/dashboard' textDecoration='none'>Account</Link>
        {props.showBtn?<a  rel='noreferrer' href='/join'
        style={{textDecoration:"none"}}>

          <button style={{
            display:'flex', alignItems:'center', outline:'none', color:'white', cursor:'pointer',
            border:'none', borderRadius:'7px', backgroundColor:'purple', padding:'10px'
            }} title='Start Download'>
            {/* <Box>Download<br/>Extension</Box> */}
            
            {/* <FiDownload size='20px' style={{marginLeft:'10px'}}/> */}
            <Image src={chromeImg} boxSize='24px' marginRight='10px'/>
            <Box>Get Extension</Box>
        </button>

        </a>:null}
        
      </Flex>:null}
    </Flex>

  );
}

export default Navbar;