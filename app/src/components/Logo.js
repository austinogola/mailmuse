import MainIcon from './Images/icons8-mail-100.png'
import { Image,Flex,Link } from '@chakra-ui/react'
import './app.css'

const Logo=({light})=>{
return(
    <Flex alignItems='center'>
        <Link display='flex' alignItems='center' href='/' textDecoration='none' color='black' >
          <Image src={MainIcon} boxSize='70px'/>
          <span className='logoText'>
            <span className='mainText'>MailMuse</span><br/>
            {/* <span className='mainText'>GhostWrite</span><br/> */}
            <small className='smallText'>Elevated Conversations</small>
            {/* <br/>
            */}
          </span>
        </Link>
        
      </Flex>
)
}


export default Logo