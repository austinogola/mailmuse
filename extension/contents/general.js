// const WEB_HOST=`http://127.0.0.1:3000`
const WEB_HOST=`https://app.mailmuse.site`

let userDetailsObj={}

chrome.runtime.sendMessage({getUserDets:true})


const verifyUsage=()=>{
    return new Promise((resolve, reject) => {
        const verificationPort=chrome.runtime.connect({name:'verification_port'})
        verificationPort.postMessage({verifyUsage:true})
        verificationPort.onMessage.addListener(msg=>{
            resolve(msg);
        })
    })
}

const proceedToGenerate=(promptObj,popupped)=>{
    return new Promise((resolve, reject) => {
        const generationPort=chrome.runtime.connect({name:'generation_port'})
        generationPort.postMessage({generate:true,promptObj,popupped})
        generationPort.onMessage.addListener(msg=>{
            if(msg=='init'){
                removeLoadingOverlay(popupped)
                const popupDiv=document.querySelector('.popupDiv')
                if(!popupDiv){
                    return addPagePopup(dynamicUserObj.internal.placeHolder2)
                }
                addGenerateDiv()
                
            }
            else if(msg.result){
                const newGenDiv=document.querySelector('.newGenDiv')
                if(newGenDiv){
                    newGenDiv.innerText+=msg.result
                }else{
                    chrome.runtime.sendMessage('stop_signal')
                }
                
            }
        })
    })
}



const createElem=(type,clas,id,parent,first)=>{
    let el=document.createElement(type)

    if(clas){
        el.setAttribute('class',clas)
    }
    if(id){
        el.setAttribute('id',id)
    }
    if(parent){
        if(first){
            parent.insertBefore(el,parent.firstChild)
        }else{
            parent.appendChild(el)
        }
        
    }

    return el
}

function getFirstCommonAncestor(element1, element2) {
    if (!element1 || !element2) {
      return null;
    }
  
    const ancestors1 = [];
    let currentElement = element1;
  
    // Traverse up from the first element and collect all ancestors
    while (currentElement) {
      ancestors1.push(currentElement);
      currentElement = currentElement.parentElement;
    }
  
    currentElement = element2;
  
    // Traverse up from the second element and find the first common ancestor
    while (currentElement) {
      if (ancestors1.includes(currentElement)) {
        return currentElement;
      }
      currentElement = currentElement.parentElement;
    }
  
    return null; // No common ancestor found
  }
  
  



const checkGMailComposeBox=async()=>{
    // checkIfGmailThread()
    if(dynamicSysObj){
        // const subjectInput=document.querySelector(`input[placeholder='${dynamicSysObj.selectors.subjPlaceholder}']`)
        const subjectInput=document.querySelector(`input[name='subjectbox']`)
        if(subjectInput){
            if(!uiAdded){
                await figureOutLanguage()
                let composeWrapper=document.querySelector("div#composeWrapper")
                if(composeWrapper){
                    composeWrapper.remove()
                }
                chrome.storage.local.get(['userState'],res=>{
                    if(res.userState==='logged in'){
                        showGmailNormalUi()
                    }else{
                        showGmailLoggedOutUi()
                    }
                })
                uiAdded=true
            }
            
        }else{
            uiAdded=false
        }
    }
    
}



const checkOutlookComposeBox=()=>{
    
}

let uiAdded=false

var observer = new MutationObserver((mutations)=> {
    mutations.forEach(mutation=>{
        if(mutation.addedNodes.length!==0 && mutation.type === "childList"){
            if(window.location.href.includes('google')){
                checkGMailComposeBox()
            }else if(window.location.href.includes('outlook')){
                checkOutlookComposeBox()
            }
            
        }
    })
  });
  


observer.observe(document, { childList: true, subtree: true });

const sleep=(ms)=>{
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}

chrome.storage.onChanged.addListener(changes=>{
    if(changes.userState){
        uiAdded=false
        checkGMailComposeBox()
    }
})