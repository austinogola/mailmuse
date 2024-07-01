const addPaddingToTable=()=>{
    const tbody=$(`div[aria-label="${foundSelectors.Body}"]`)
        
    let mainTable=tbody[0].closest('table');
    
    mainTable.style.marginTop='100px'
}

const closeExtraPopups=()=>{
    // const xBtns=$('img[alt*=ose]').slice(1)
    const xBtns=$('img[alt*=ose]').slice(1)
    // console.log(xBtns);
    if(xBtns.length>0){
        xBtns.each(function(){
            $(this).click()
        })
    }
}

const findParentForm=()=>{
    const subjectInput=$(`input[placeholder="${foundSelectors.Subject}"]`)
        const parentForm = subjectInput[0].closest('form');

        return(parentForm)
}

const setPlayGround=(parentForm)=>{
    let composeWrapper=createElem('div','composeWrapper','composeWrapper',parentForm)
        let composeParent=createElem('div','composeParent','composeParent',composeWrapper)

        return(composeParent)
}

const addTabs=(composeParent)=>{
    let composeTabsWrapper=createElem('div','composeTabsWrapper','composeTabsWrapper',composeParent)
    let composeTabs=createElem('div','composeTabs','composeTabs',composeTabsWrapper)

    let singleTab=createElem('span','singleTab','singleTab',composeTabs)
    singleTab.textContent=dynamicUserObj.internal.tab1Title
    let convoTab=createElem('span','singleTab','convoTab',composeTabs)
    convoTab.textContent=dynamicUserObj.internal.tab2Title

    const allSingleTabs=document.querySelectorAll('.singleTab')
   
    
    allSingleTabs.forEach(tab=>{
        tab.addEventListener('click',e=>{
            const emailThreadsWrapper=document.querySelector('.emailThreadsWrapper')
            const emailSingleWrapper=document.querySelector('.emailSingleWrapper')
            convoTab.classList.remove('active')
            singleTab.classList.remove('active')
            e.target.classList.add('active')
            if(e.target==singleTab){
                emailSingleWrapper.style.display='flex'
                emailThreadsWrapper.style.display='none'
            }else{
                emailSingleWrapper.style.display='none'
                emailThreadsWrapper.style.display='flex'
            }
        })
    })
}

const addBoxTypes=()=>{
    let emailSingleWrapper=createElem('div','emailSingleWrapper','emailSingleWrapper',composeParent)
    let emailThreadsWrapper=createElem('div','emailThreadsWrapper','emailThreadsWrapper',composeParent)
    let settingsWrapper=createElem('div','settingsWrapper','settingsWrapper',composeParent)
  
    return {emailSingleWrapper,emailThreadsWrapper,settingsWrapper}
}

const addEditableSpan=(paro,placeholder,forThreads)=>{
    let composeSpanParent=createElem('div','composeSpanParent','composeSpanParent',paro)
    let composeSpan=createElem('textarea','composeSpan','composeSpan',composeSpanParent)
    composeSpan.setAttribute('placeholder',placeholder)
    if(forThreads){
        composeSpan.classList.add('forThreads')
        composeSpanParent.classList.add('forThreads')
    }
    
}

const addButtons=(paro,forThreads)=>{
    const composeBtnsDiv=createElem('div','composeBtnsDiv','composeBtnsDiv',paro)
    let stopBtn=createElem('button','stopBtn','stopBtn',composeBtnsDiv)
    let stopBtnSpan=createElem('span','stopBtnSpan','stopBtnSpan',stopBtn)
    stopBtn.addEventListener('click',(e)=>{
        console.log('Stopp button clicked');
        stopGenerationProcess()
    })
    stopBtn.setAttribute('title',dynamicUserObj.internal.stopGenTitle)
    let writeBtn=createElem('button','writeBtn','writeBtn',composeBtnsDiv)
    writeBtn.textContent=dynamicUserObj.internal.writeBtn
    writeBtn.addEventListener('click',(e)=>{initGenerationProcess({forThreads})})
}

const addSingleEmailsBox=(emailSingleWrapper)=>{
    addEditableSpan(emailSingleWrapper,dynamicUserObj.internal.mainPlaceholder)
    addButtons(emailSingleWrapper)
}

const importAndDisplayThreads=()=>{
    const threadSelect=document.querySelector('.threadSelect')

    //currentThread First
    chrome.storage.local.get(['savedThreads','currentThread'],async res=>{
        if(res.currentThread){
            let currentThreadId=res.currentThread.threadId
            let currentSubject=res.currentThread.subject
            let threadOption=createElem('option','threadOption',currentThreadId,threadSelect)
            threadOption.value=currentThreadId
            threadOption.innerText=currentSubject.length>40?currentSubject.slice(0,37)+'...':currentSubject
            threadOption.selected=true
        }
    })
}

const fillThreadsToSelect=(threadSelect)=>{
    
    chrome.storage.local.get(['savedThreads','currentThread'],async res=>{
        console.log(res.currentThread);
        let currentThreadId=res.currentThread.threadId
        let currentThreadSubject=res.currentThread.subject
        let addThread=true 
        // console.log(currentThreadId);
        if(res.savedThreads){
            res.savedThreads.forEach(thread=>{
                let threadOption=createElem('option','threadOption',thread.threadId,threadSelect)
                threadOption.value=thread.threadId
                threadOption.innerText=thread.subject.length>40?thread.subject.slice(0,37)+'...':thread.subject
                if(threadOption.value==currentThreadId){
                    threadOption.selected=true
                    addThread=false
                }
            }) 
        }
        if(addThread){
            if(res.currentThread){
                let currentThreadId=res.currentThread.threadId
                let currentThreadSubject=res.currentThread.subject
                let threadOption=createElem('option','threadOption',currentThreadId,threadSelect)
                threadOption.value=currentThreadId
                threadOption.innerText=currentThreadSubject.length>35?currentThreadSubject.slice(0,35)+'...':currentThreadSubject
                if(threadOption.value==currentThreadId){
                    threadOption.selected=true
                }
            }
            
        }
    })
}
const addThreadsBox=(emailThreadsWrapper)=>{
    let emailThreadsParent=createElem('div','emailThreadsParent','emailThreadsParent',emailThreadsWrapper)
    let threadsEditableHolder=createElem('div','threadsEditableHolder','threadsEditableHolder',emailThreadsParent)
    
    let threadPickParent=createElem('div','threadPickParent','threadPickParent',threadsEditableHolder)
    let threadTitle=createElem('p','threadTitle','threadTitle',threadPickParent)
    threadTitle.textContent='Choose thread:'

    let threadSelect=createElem('select','threadSelect','threadSelect',threadPickParent)
    let defaultOption=createElem('option','threadOption','defaultOption',threadSelect)
    defaultOption.value=null
    defaultOption.innerText='--Open email thread to import--'
    defaultOption.selected=true
    // fillThreadsToSelect()
   
    
    addEditableSpan(threadsEditableHolder,'Tell MailMuse what you want to say next or ask for insights. The selected thread will be used for context',true)
    addButtons(emailThreadsParent,true)

    
}


const addSettings=(settingsWrapper)=>{
    let settingsBox=createElem('div','settingsBox','settingsBox',settingsWrapper)
    
    let languageSetting=createElem('div','settingItem','languageSetting',settingsBox)
    let languageSettingTitleBox=createElem('div','settingTitleBox','languageSettingTitleBox',languageSetting)
    let languageSettingTitle=createElem('p','settingTitle','languageSettingTitle',languageSettingTitleBox)
    languageSettingTitle.textContent=dynamicUserObj.internal.langTitle
    let languageSelect=createElem('select','settingsSelect','languageSelect',languageSetting)
    newLangCodes.forEach(item=>{
        let opt=createElem('option',"languageOptions",null,languageSelect)
        opt.setAttribute('value',item)
        if(item==UserLanguage){
            opt.selected=true
        }
        let theText=newLangObj[item].split('-')[1].trim()
        opt.innerHTML=`<p>${theText}</p>`
    })
    languageSelect.addEventListener('change',async e=>{
        UserLanguage=e.target.value
        chrome.runtime.sendMessage({setLang:UserLanguage})
        await getAndSetLanguage()
        refreshForLanguage()
    })
    
    let toneSetting=createElem('div','settingItem','toneSetting',settingsBox)
    let toneSettingTitleBox=createElem('div','settingTitleBox','toneSettingTitleBox',toneSetting)
    let toneSettingTitle=createElem('p','settingTitle','toneSettingTitle',toneSettingTitleBox)
    toneSettingTitle.textContent=dynamicUserObj.internal.toneTitle
    let toneSelect=createElem('select','settingsSelect','toneSelect',toneSetting)
    const tones=[...dynamicUserObj.internal.allTones]
    tones.forEach((item,index)=>{
        let opt=createElem('option',"toneOptions",null,toneSelect)
        opt.setAttribute('value',item)
        if(index==0){
            opt.setAttribute('value','')
            opt.selected=true
        }
        opt.innerHTML=`<p>${item}</p>`
    })

    const settingSpan=createElem('span','settingSpan','settingSpan',settingsWrapper)
    addSettingsCog(settingSpan)


}

const addSettingsCog=(settingSpan)=>{

    let settingIconImg=createElem('img','settingIconImg','settingIconImg',settingSpan)
    settingIconImg.src = chrome.runtime.getURL("icons/icons8-settings-48.png")

    //ACTUAL SETTINGS DIV
    let actualSettingsDiv=createElem('div','actualSettingsDiv','actualSettingsDiv',settingSpan)
    actualSettingsDiv.classList.add('hidden')
    let settingsHeader=createElem('div','settingsHeader','settingsHeader',actualSettingsDiv)
    let settingsHeaderTitle=createElem('p','settingsHeaderTitle','settingsHeaderTitle',settingsHeader)
    settingsHeaderTitle.textContent=dynamicUserObj.internal.settingTitle
    let closeSettingSpan=createElem('span','closeSettingSpan','closeSettingSpan',settingsHeader)
    closeSettingSpan.innerHTML='&#215'
    closeSettingSpan.addEventListener('click',e=>{
        const actualSettingsDiv=document.querySelector('.actualSettingsDiv')
        actualSettingsDiv.classList.add('hidden')
    })

    let settingTabsParent=createElem('span','settingTabsParent','settingTabsParent',actualSettingsDiv)
    let settingTabsContent=createElem('span','settingTabsContent','settingTabsContent',actualSettingsDiv)
    const settingTabsItems=[dynamicUserObj.internal.profileTitle,dynamicUserObj.internal.accountTitle]
    settingTabsItems.forEach((item,index)=>{
        let settingsTab=createElem('span','settingsTab',`${item}`,settingTabsParent)
        settingsTab.textContent=item
        let tabContent=createElem('div','tabContent',`${item}`,settingTabsContent)
        if(item==settingTabsItems[0]){
            settingsTab.classList.add('active')
            tabContent.classList.add('active')
        }

        settingsTab.addEventListener('click',e=>{
            const settingsTabs=document.querySelectorAll('.settingsTab')
            const tabContents=[...document.querySelectorAll('.tabContent')]
            
            settingsTabs.forEach(item=>item.classList.remove('active'))
            tabContents.forEach(item=>item.classList.remove('active'))
            let relatedTabContent=tabContents.filter(item=>item.id==e.target.id)[0]
            
            relatedTabContent.classList.add('active')
            e.target.classList.add('active')
        })

    })

    settingIconImg.addEventListener('click',e=>{
        actualSettingsDiv.classList.toggle('hidden')
        if(!actualSettingsDiv.classList.contains('hidden')){
            document.body.addEventListener('click', checkIfOutSide);
        }else{
            document.body.removeEventListener('click', checkIfOutSide);
        }
    })

    //Settings Content
    let profileContent=document.querySelector(`.tabContent#${dynamicUserObj.internal.profileTitle}`)
    let identityDiv=createElem('div','identityDiv','identityDiv',profileContent)
    let picSpan=createElem('div','picSpan','picSpan',identityDiv)
    let picSpanTxt=createElem('span','picSpanTxt','picSpanTxt',picSpan)
    let emailTxt=createElem('p','emailTxt','emailTxt',identityDiv)
    let userEmail=userDetailsObj.email
    emailTxt.textContent=userEmail
    picSpanTxt.textContent=userEmail[0].toUpperCase()

    let titlesDiv=createElem('div','titlesDiv','titlesDiv',profileContent)
    let savedTitleTxt=createElem('span','savedTitleTxt','savedTitleTxt',titlesDiv)
    savedTitleTxt.textContent=`${dynamicUserObj.internal.TitleTitle}: `
    let savedTitleInput=createElem('input','savedTitleInput','savedTitleInput',titlesDiv)
    let saveTitleBtn=createElem('button','saveTitleBtn','saveTitleBtn',profileContent)
    saveTitleBtn.textContent=dynamicUserObj.internal.SaveTitle

    let accountContent=document.querySelector(`.tabContent#${dynamicUserObj.internal.accountTitle}`)
    // let accIdentityDiv=createElem('div','accIdentityDiv','accIdentityDiv',accountContent)
    let planTxt=createElem('p','planTxt','planTxt',accountContent)
    planTxt.textContent=`${dynamicUserObj.internal.planTxt}: `
    let planSpan=createElem('span','planSpan','planSpan',planTxt)
    planSpan.textContent=userDetailsObj.account_type.toUpperCase()
    let mngPlan=createElem('a','mngPlan','mngPlan',accountContent)
    mngPlan.textContent=dynamicUserObj.internal.planManageText
    mngPlan.href=`${WEB_HOST}/billing`


}

const showGmailNormalUi=()=>{
    
    closeExtraPopups()
    let composeWrapper=document.querySelector("div#composeWrapper")

    if(!composeWrapper && foundSelectors){
        
        
        addPaddingToTable()
        let parentForm=findParentForm()
        
        let composeParent= setPlayGround(parentForm)

        addTabs(composeParent)

        const {emailSingleWrapper,emailThreadsWrapper,settingsWrapper}=addBoxTypes(composeParent)

        addSingleEmailsBox(emailSingleWrapper)
        
        addThreadsBox(emailThreadsWrapper)

        addSettings(settingsWrapper)
        
       

    //    Coming soon
        // let comingSoonParent=createElem('div','comingSoonParent','comingSoonParent',emailThreadsParent)
        // let comingSoonP1=createElem('p','comingSoonP1','comingSoonP1',comingSoonParent)
        // comingSoonP1.textContent=dynamicUserObj.internal.soonP1
        // let comingSoonP2=createElem('p','comingSoonP2','comingSoonP2',comingSoonParent)
        // comingSoonP2.textContent=dynamicUserObj.internal.soonP2

        let noGMailParent
        let importParent
       

       

        // chrome.storage.local.get(['gMailState'],async res=>{
            // const {gMailState}=res
            // if(gMailState=='logged out'){
            //     noGMailParent=createElem('div','noGMailParent','noGMailParent',emailThreadsParent)
            //     let permissionP1=createElem('span','permissionP1','permissionP1',noGMailParent)
            //     permissionP1.textContent='Permission required!'
            //     let permissionP2=createElem('p','permissionP2','permissionP2',noGMailParent)
            //     permissionP2.textContent='MailMuse needs your permission before importing your Gmail threads'
            //     let pmDiv=createElem('div','pmDiv','pmDiv',noGMailParent)
            //     let GmailPermissionLink=createElem('a','GmailPermissionLink','GmailPermissionLink',pmDiv)
            //     GmailPermissionLink.href=`${WEB_HOST}/permissions/gmail`
            //     GmailPermissionLink.setAttribute('target','_blank')
            //     GmailPermissionLink.textContent='Grant Permission'
            // }else{
            //     importParent=createElem('div','importParent','importParent',emailThreadsParent)
            // }
        // })

        // importParent=createElem('div','importParent','importParent',emailThreadsParent)
        

        
        if(!window.location.href.includes('compose')){
            convoTab.classList.add('active')
            importAndDisplayThreads()
            emailThreadsWrapper.style.display='flex'
            emailSingleWrapper.style.display='none'
            // mainTable.style.marginTop='95px'
        }else{
            singleTab.classList.add('active')
            emailSingleWrapper.style.display='flex'
            emailThreadsWrapper.style.display='none'
        }

        // let jsDiv=$('tbody tbody')
        // console.log(jsDiv);
        // // var longestDiv = null;
        // // var maxLength = 0;
        // jsDiv.each(function() {
        //     var innerText = $(this).text();
        //     console.log(innerText);
        //   });
        // console.log(longestDiv);

        

        // //SETTINGS
        // 

        





        // changeLanguage()
        return

    }
}

const showGmailLoggedOutUi=()=>{
    const xBtns=$('img[alt*=ose]').slice(1)
    console.log(xBtns);
    if(xBtns.length>0){
        xBtns.each(function(){
            $(this).click()
        })
    }

    let composeWrapper=document.querySelector("div#composeWrapper")

    if(!composeWrapper){
        // const subjectInput=$("input[placeholder='Subject']")
        const tbody=$(`div[aria-label="${foundSelectors.Body}"]`)
        
        let mainTable=tbody[0].closest('table');
        
        mainTable.style.marginTop='90px'
        const subjectInput=$(`input[placeholder="${foundSelectors.Subject}"]`)
        const parentForm = subjectInput[0].closest('form');

        composeWrapper=createElem('div','composeWrapper','composeWrapper',parentForm)
        composeParent=createElem('div','composeParent2','composeParent2',composeWrapper)

        let loggedOutWrapper=createElem('div','loggedOutWrapper','loggedOutWrapper',composeParent)

        let loggedOutLink=createElem('a','loggedOutLink','loggedOutLink',loggedOutWrapper)
        loggedOutLink.setAttribute('href',`${WEB_HOST}/login`)
        loggedOutLink.setAttribute('target','_blank')
        loggedOutLink.textContent=dynamicUserObj.internal.loginPrompt

    }
}


const checkIfOutSide=(e)=>{
    const settingSpan=document.querySelector('.settingSpan')
    const actualSettingsDiv=document.querySelector('.actualSettingsDiv')
    if(!settingSpan.contains(e.target)){
        actualSettingsDiv.classList.add('hidden')
        document.body.removeEventListener('click', checkIfOutSide);
    }
}


let threadOpened=false

const listenToExpandButton=()=>{

}

let expandBtnPresent=false
let collapseBtnPresent=false
const checkIfGmailThread=()=>{
    // const pattern = /^https:\/\/mail\.google\.com\/mail\/u\/\d+\/#inbox\/[A-Za-z0-9_-]+$/;
    // pattern.test(window.location.href)
  
   
    let expandButton=$('span[data-is-tooltip-wrapper] button[aria-label="Expand all"]')
    let printButton=$('span[data-is-tooltip-wrapper] button[aria-label="Print all"]')
    

   
    if(!expandButton[0]){
        expandButton=$('span[data-is-tooltip-wrapper] button[aria-label="Collapse all"]')
        if(!expandButton[0]){
            expandButton= $('span[data-is-tooltip-wrapper] button[aria-label="In new window"]')
        }else{
            collapseBtnPresent=true
        }
        
    }else{
        expandBtnPresent=true
    }
    

    if(expandButton[0] && printButton[0]){
        const commonAncestor = getFirstCommonAncestor(expandButton[0],printButton[0]);
        const rect = commonAncestor.getBoundingClientRect();
        const leftPos = (window.scrollX || document.documentElement.scrollLeft)+rect.left
        const topPos = (window.scrollY || document.documentElement.scrollTop)+rect.top

        
        if(leftPos && topPos && !threadOpened){
            // console.log(threadOpened);
            if(!threadOpened){
                threadOpened=true
                chrome.storage.local.get(['userState'],res=>{
                    if(res.userState==='logged in'){
                        // console.log('here')
                        addImportBtnGmail(commonAncestor)
                    }
                })
            }
            
            
        }else{
            collapseBtnPresent=false
            expandBtnPresent=false
        }
        
    }else{
        threadOpened=false
        collapseBtnPresent=false
        expandBtnPresent=false
    }
    

    
}

const  loadSelector=async(selector,all,times)=> {
    var raf;
    var found = false;
    let el
    let elAll
    times=times || 3

    return new Promise((resolve,reject)=>{
        (async function check(){
            times--
            elAll=$(selector)
            el=$(selector)[0]
            
            if (elAll[0]) {
                found = true;
                cancelAnimationFrame(raf);
                all?resolve(elAll):resolve(el)
                
                if(!found){
                raf = requestAnimationFrame(check);
                }
                
            
            } else {
                if(times>=0){
                    await sleep(500)
                    raf = requestAnimationFrame(check);
                }else{
                    all?resolve(elAll):resolve(el)
                }
                
            }
            })();
    })   
}

const addImportBtnGmail=async(pero,recheck)=>{

    let expandButton=$('span[data-is-tooltip-wrapper] button[aria-label="Expand all"]')
    if(expandButton[0]){
        console.log('Found expand');
        expandButton[0].click()
        let btn=await loadSelector('span[data-is-tooltip-wrapper] button[aria-label="Collapse all"]',true,10)
        console.log('Found collapse');
        await getCurrentThread()
        console.log('Finished getting thread');
        console.log(btn)
        if(btn[0]){
            console.log('Clickinfg collapse');
            btn[0].click()
            let btn2=await loadSelector('span[data-is-tooltip-wrapper] button[aria-label="Expand all"]',true,10)
        }
    }
  

    let importBtn=createElem('button','importBtn','importBtn',pero,true)
    importBtn.textContent=recheck?"Importing...":'Import to MailMuse'
  

    let called=false
    importBtn.addEventListener('click',(evt=>{
        triggerImport(evt,importBtn,pero)
    }))
}

const getCurrentThread=()=>{
    return new Promise(async(resolve, reject) => {
        let messageDivs=$('div[data-message-id]')
        let text=''
        messageDivs.each(function() {
            var textContent = $(this).text();
            if(textContent.length>text.length){
                text=textContent
            }
        });

        let threads=await formatEmailThread(text)

        let subject=$('h2[jsname]')
        subject=subject[0]?subject[0].innerText:'<Subject not found>'

        let paths=window.location.href.split('/')
        let threadId=paths[paths.length-1]
    
        const updated=new Date().getTime()

        let currentThread={subject,thread:threads,updated,threadId}
        chrome.storage.local.set({currentThread})
        CURRENT_THREAD={...currentThread}
        
        resolve('DONE')
    })
    
}

const triggerImport=async(evt,importBtn,pero)=>{
  
    importBtn.textContent='Importing...'
    chrome.storage.local.get(['savedThreads','currentThread'],async res=>{
        let savedThreads=[]
        if(res.savedThreads){
            savedThreads=[...res.savedThreads]
            let fir=0,sec=0,thi=0
            res.savedThreads.forEach(item=>{
                if(item.updated>fir){
                    thi=sec
                    sec=fir
                    fir=item.updated
                }
                else{
                    if(item.updated>sec){
                        thi=sec
                        sec=item.updated
                    }else{
                        if(item.updated>thi){
                            thi=item.updated
                        }     
                    }
                    
                }
            })
            savedThreads=savedThreads.filter(th=>(th.updated>=fir || th.updated>=sec || th.updated>=thi))
        }
        if(res.currentThread){
            savedThreads.push(res.currentThread)
        }
        
        savedThreads=removeDuplicates(savedThreads)
        chrome.storage.local.set({savedThreads})
        importBtn.textContent='Imported'
        importBtn.disabled=true
        importBtn.style.cursor='text'

    })

}

function removeDuplicates(objects) {
    // Create a Map to keep track of the highest 'updated' for each 'threadId'
    const map = new Map();

    // Iterate over each object in the array
    objects.forEach(obj => {
        const { threadId, updated } = obj;
        // If the threadId is not in the map or the current updated is higher, update the map
        if (!map.has(threadId) || map.get(threadId).updated < updated) {
            map.set(threadId, obj);
        }
    });

    // Convert the Map values back to an array
    return Array.from(map.values());
}

const formatEmailThread=(text)=>{
    return new Promise(async(resolve, reject) => {
        const emailPattern = /<[^<>]+@[^<>]+>/g;

        const emails = text.match(emailPattern);
        let parts = text.split(emailPattern);

        parts=parts.filter(item=>item.length>20)

        let result = {};
        let pos=parts.length
        for (let i = 0; i < parts.length; i++) {
            result[pos] = parts[i];
            pos--
        }
        resolve(result)
    })
}
const gMailImport=(theBtn)=>{
    // console.log(theBtn)
    return new Promise(async(resolve,reject)=>{

        const clickExpand=new Promise((resolve,reject)=>{
            let expandButton=$('span[data-is-tooltip-wrapper] button[aria-label="Expand all"]')
            if(expandButton[0]){
                expandButton[0].click()
                resolve("DONE")
            }else{
                resolve("DONE")
            }
        })
        
        await clickExpand

        let importBtn=document.querySelector('button.importBtn')
        console.log(importBtn);
        return
        theBtn.remove()
        let messageDivs=$('div[data-message-id]')
        
        await sleep(500)

        messageDivs=$('div[data-message-id]')

        // await sleep(500)

        // messageDivs=$('div[data-message-id]')
        // console.log(messageDivs)
        resolve(messageDivs)
        return
        messageDivs.each(function(index, element) {
            console.log($(element))
            let tbody=$(element).find('tbody')
            let tbodyText=tbody.text()
            // console.log(tbodyText)
            var overallText  = $(element).text();

            // let cleanText
            // console.log(index,overallText);
            // theBtn.textContent='Imported to MailMuse'
        });
        
        
        
       
        
        // console.log(longestDiv)
    })
}

// function removeDuplicates(arr) {
//     let result = [];
    
//     for (let i = 0; i < arr.length; i++) {
//       // Calculate the difference between the current string and the previous string
//       let currentString = arr[i];
//       let previousString = i > 0 ? arr[i - 1] : '';
  
//       // Remove the previous string part from the current string
//       if (currentString.endsWith(previousString)) {
//         currentString = currentString.slice(0, currentString.length - previousString.length);
//       }
  
//       result.push(currentString);
//     }
  
//     return result;
//   }
  

  
const addAsImported=(arr)=>{
    let allTexts=[]
    let prevText=''
    arr.each(function(index, element) {
        // console.log($(element))
        let tbody=$(element).find('tbody')
        // let tbodyText=tbody.text()
        // console.log(tbodyText)
        var overallText  = $(element).textContent;
        // let cleanText=overallText.replace(tbodyText,'')

        // if(prevText!=cleanText){
        //     cleanText=cleanText.replace(prevText,'')
        // }
        // prevText=cleanText
        
        allTexts.push(overallText);
        // theBtn.textContent='Imported to MailMuse'
    });

    let cleanedText=removeDuplicates(allTexts)
    console.log(cleanedText)
}

