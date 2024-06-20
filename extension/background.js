// const SERVER_HOST=`https://ghostmail-server2.onrender.com`
// const SERVER_HOST=`http://127.0.0.1:5000`
// const WEB_HOST=`http://127.0.0.1:3000`
const SERVER_HOST=`https://server.mailmuse.site`
const WEB_HOST=`https://app.mailmuse.site`
let WEB_DOMAIN=new URL(WEB_HOST).hostname

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.message) {
        
    }
    if(request.getUserDets){
      chrome.cookies.getAll({domain:WEB_DOMAIN,name:'ghostToken'},async(ck)=>{
        if(ck[0]){
          let ghostToken=ck[0].value
          let tokenStatus=await verifyToken(ghostToken)
          if(!tokenStatus.error){
            const {email,saved_title,saved_name,account_type}=tokenStatus
            let userDetailsObj={email,saved_title,saved_name,account_type}
            chrome.tabs.sendMessage(sender.tab.id,{userDetailsObj})
          }
        }
      })
    }
    if(request=='stop_signal'){
      controller.abort()
      controller = new AbortController();
    }
    if(request.getLang){
      let tab=sender.tab.id
      chrome.storage.sync.get("set_lang").then((result) => {
        if(result.set_lang){
          console.log('Found user set language',result.set_lang);
          chrome.tabs.sendMessage(tab,{setLang:result.set_lang})
        }
        else{
          console.log('No language found');
          chrome.tabs.sendMessage(tab,{setLang:'false'})
        }
      });
    }
    if(request.setLang){
      chrome.storage.sync.set({"set_lang":request.setLang})
      console.log('Language set to',request.setLang);
    }
})

chrome.runtime.onConnect.addListener(port=>{
  port.onMessage.addListener(async(message,port)=>{
    if(port.name=='verification_port'){
      if(message.verifyUsage){
        chrome.storage.local.get(['ghostToken'],async res=>{
          const {ghostToken}=res
          let usageStatus=await verifyToken(ghostToken)
          if(usageStatus.error){
            return chrome.storage.local.set({userState:'logged out'})
          }
          const {credits}=usageStatus
          port.postMessage(credits>0?'continue':'out of credits')
        })
        
        
      }
    }

    if(port.name=='generation_port'){
      if(message.generate){
        const {promptObj,popupped}=message
        startGenerating(promptObj,popupped,port)
      }
    }
  })
  
})

const addThreadId=(threadString)=>{
  let threadObj=JSON.parse(threadString)
  let currentThread=threadObj.thread
  console.log(currentThread);
  chrome.storage.local.set({currentThread})
}

const displayGenerated=(string,port)=>{
  console.log(string);
  port.postMessage({result:string})
}

let controller = new AbortController();

const readStream=(reader,port)=>{
  return new Promise(async(resolve)=>{
    var string
    var allDone
    while(true && !allDone){
      const {value,done}=await reader.read()
      // console.log(value, done);
      allDone=done
      string = new TextDecoder().decode(value);
      if(!string.includes('-----')){
          displayGenerated(string,port)
      }else{
        let stringArr=string.split('-----')
        let threadString
        
        try {
          let ss=JSON.parse(stringArr[0])
          threadString=stringArr[0]
        } catch (error) {
          displayGenerated(stringArr[0],port)
          threadString=stringArr[1]
        }

        addThreadId(threadString)
        
      }
      
    }
    controller.abort()
    controller = new AbortController();
    resolve(string)
  })
}

const startGenerating=async(promptObj,popupped,port)=>{ 
  // console.log(promptObj);
  const {lang,thePrompt,tone}=promptObj
  return new Promise(async(resolve, reject) => {
    chrome.storage.local.get(['ghostToken','currentThread'],async res=>{
      let url=`${SERVER_HOST}/generate/mail`
      let headers={"Authorization":res.ghostToken,"Content-Type":"application/json"}
      const signal = controller.signal; 

      const boDY=popupped?{prompt:thePrompt,lang,tone,thread:res.currentThread}:{prompt:thePrompt,lang,tone}
      let resp=await fetch(url,{
        method:'POST',
        headers,
        body:JSON.stringify(boDY),
        signal
      }).catch(err=>{
        controller.abort()
        controller = new AbortController();
      })

      if(resp){
        port.postMessage('init')
        const ourReader = resp.body.getReader();
        const finishedStream=await Promise.race([readStream(ourReader,port),sleep(30000)])
      }

    })
    
  })
}

let userEmail

const extGetCall=async(url,headers)=>{
  return new Promise((resolve, reject) => {
    fetch(url,{
      method:'GET',
      headers
    })
    .then(async res=>{
      resolve(res)
    })
  })
}

const verifyUserUsage=async()=>{
  return new Promise(async(resolve, reject) => {
    await initiateUser()
    
    chrome.storage.local.get(['ghostToken'],async res=>{
      let headers={"Authorization":res.ghostToken}
      let url=`${SERVER_HOST}/accounts/verify`
      
      let usageStatus=await extGetCall(url,headers)
      console.log();
      usageStatus= await usageStatus.json()
      resolve(usageStatus);
    })
    
  })
}


const getInitToken=async(email)=>{
  return new Promise(async(resolve, reject) => {
    let params=new URLSearchParams({email})
    let full_url=`${SERVER_HOST}/accounts/init?${params}`
    let initAns= await  extGetCall(full_url)
    initAns=await initAns.json()
    resolve (initAns)
  })
  
}

const verifyToken=(token)=>{
  return new Promise(async(resolve, reject) => {
    let url=`${SERVER_HOST}/accounts/verify`
    let headers={"Authorization":token}
    let status=await extGetCall(url,headers)
    status=await status.json()
    resolve(status);
  })
}

const confirmUser=async()=>{
  return new Promise(async(resolve, reject) => {
    chrome.cookies.getAll({domain:WEB_DOMAIN},async(ck)=>{
      let ghostToken=ck.filter(cks=>cks.name=='ghostToken')[0]
      if(ghostToken){
        ghostToken=ghostToken.value
        let tokenStatus=await verifyToken(ghostToken)
        if(tokenStatus.error){
          console.log('Token error');
          chrome.storage.local.set({userState:'logged out'})
        }else{
          console.log('User logged in');
          chrome.storage.local.set({userState:'logged in',ghostToken:ghostToken})
        }
        
      }
      else{
        console.log('No token');
        chrome.storage.local.set({userState:'logged out'})
      }

      let mMuseG=ck.filter(cks=>cks.name=='mMuseG')[0]

      if(mMuseG){
        mMuseG=mMuseG.value
        console.log(mMuseG)
        // let gMail=await verifyToken(ghostToken)
        // if(tokenStatus.error){
        //   console.log('Token error');
        //   chrome.storage.local.set({userState:'logged out'})
        // }else{
        //   console.log('User logged in');
        //   chrome.storage.local.set({userState:'logged in',ghostToken:ghostToken})
        // }
        
      }
      else{
        console.log('No GMAIL token');
        chrome.storage.local.set({gMailState:'logged out'})
      }

      resolve('Confirmation complete')
    })
  })
}

chrome.cookies.onChanged.addListener(async changeInfo=>{
  const {cookie}=changeInfo
  if(cookie.domain==WEB_DOMAIN){
    await confirmUser()
  }
  
})


chrome.runtime.onInstalled.addListener(async(dets)=>{
  confirmUser()
  openMailTab()
})

const openMailTab=()=>{
  chrome.tabs.create({url:'https://mail.google.com/mail/u/0/#inbox?compose=new'})
}

const sleep=(ms)=>{
  return new Promise(resolve=>{
      setTimeout(resolve,ms)
  })
}
