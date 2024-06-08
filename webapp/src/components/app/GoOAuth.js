
import { Box ,Flex,Link,Text,CircularProgress } from '@chakra-ui/react'
import {useEffect ,useState} from 'react'
import { useCookies } from 'react-cookie'


const GoOAuth=()=>{

    // let search=new URL(window.location.href).search
    // const searchParams = new URLSearchParams(search);
    // let to=searchParams.get('redirect_to')

    const [setCookie, removeCookie] = useCookies(['ghostToken']);

    

    const [loading,setLoading]=useState(true)
    const makeReq=(obj)=>{
        let url=`${process.env.REACT_APP_SERVER_HOST}/oauth/google`
        fetch(url,{
            method:'POST',
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(obj)
        }).then(async res=>{
            if(res.status===200){
                let response=await res.json()
                console.log(response);
                const {ghostToken}=response

                const date = new Date();
                date.setTime(date.getTime() + (10 * 24 * 60 * 60 * 1000)); // 10 days from now
                setCookie('ghostToken',ghostToken,{path:'/',expires:date})
                window.location.href = '/app/dashboard';
                
                // if(search.length>1){
                //     window.location.href=to
                // }else{
                //     
                // }
            }else{
                setLoading(false)
            }
        })
        .catch(err=>{
            console.log(err)
            setLoading(false)
        })
    }
    let sers=new URL(window.location.href)
    const params = Object.fromEntries(sers.searchParams.entries());
    const code=sers.searchParams.get('code')
    const scope=sers.searchParams.get('scope')
    // const permission=sers.searchParams.get('permission')
    console.log(code)
    console.log(scope)
    // console.log(permission);


    
    // for (const key in params) {
    //     console.log(`${key}: ${params[key]}`);
    //   }

    useEffect(()=>{
        if(code && scope){
            makeReq({code,scope})
        }
    },[code,scope])
    return(
        <Box>
            <Flex justifyContent='center' alignItems='center' h='500px'>
                   {loading?<CircularProgress color='#0F6972' isIndeterminate/>:
                   <Box>
                        <Text fontWeight='500' textAlign='center'>Failed to authorize Google client. Please try again</Text>
                        <Link textDecoration='none' textAlign='center' href='/app/login'>back to login</Link>
                   </Box>}
            </Flex>

        </Box>
    )
}


export default GoOAuth