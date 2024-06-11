const showGmailNormalUi=()=>{
    // const xBtns=$('img[alt*=ose]').slice(1)
    const xBtns=$('img[alt*=ose]').slice(1)
    // console.log(xBtns);
    if(xBtns.length>0){
        xBtns.each(function(){
            $(this).click()
        })
    }

    let composeWrapper=document.querySelector("div#composeWrapper")

    if(!composeWrapper && foundSelectors){
        
        const tbody=$(`div[aria-label="${foundSelectors.Body}"]`)
        
        let mainTable=tbody[0].closest('table');
        
        mainTable.style.marginTop='95px'
        
        const subjectInput=$(`input[placeholder="${foundSelectors.Subject}"]`)
        const parentForm = subjectInput[0].closest('form');

        let composeWrapper=createElem('div','composeWrapper','composeWrapper',parentForm)
        let composeParent=createElem('div','composeParent','composeParent',composeWrapper)
        
        let composeTabsWrapper=createElem('div','composeTabsWrapper','composeTabsWrapper',composeParent)
        let composeTabs=createElem('div','composeTabs','composeTabs',composeTabsWrapper)
        let composeBox=createElem('div','composeBox','composeBox',composeParent)
        let emailThreadsWrapper=createElem('div','emailThreadsWrapper','emailThreadsWrapper',composeParent)
        let settingsWrapper=createElem('div','settingsWrapper','settingsWrapper',composeParent)

        

        let singleTab=createElem('span','singleTab','singleTab',composeTabs)
        singleTab.textContent=dynamicUserObj.internal.tab1Title
        let convoTab=createElem('span','singleTab','convoTab',composeTabs)
        convoTab.textContent=dynamicUserObj.internal.tab2Title
        

        let emailThreadsParent=createElem('div','emailThreadsParent','emailThreadsParent',emailThreadsWrapper)
    //    Coming soon
        let comingSoonParent=createElem('div','comingSoonParent','comingSoonParent',emailThreadsParent)
        let comingSoonP1=createElem('p','comingSoonP1','comingSoonP1',comingSoonParent)
        comingSoonP1.textContent=dynamicUserObj.internal.soonP1
        let comingSoonP2=createElem('p','comingSoonP2','comingSoonP2',comingSoonParent)
        comingSoonP2.textContent=dynamicUserObj.internal.soonP2

        let noGMailParent
        let importParent
        // chrome.storage.local.get(['gMailState'],async res=>{
        //     const {gMailState}=res
        //     if(gMailState=='logged out'){
        //         noGMailParent=createElem('div','noGMailParent','noGMailParent',emailThreadsParent)
        //         let permissionP1=createElem('span','permissionP1','permissionP1',noGMailParent)
        //         permissionP1.textContent='Permission required!'
        //         let permissionP2=createElem('p','permissionP2','permissionP2',noGMailParent)
        //         permissionP2.textContent='MailMuse needs your permission before importing your Gmail threads'
        //         let pmDiv=createElem('div','pmDiv','pmDiv',noGMailParent)
        //         let GmailPermissionLink=createElem('a','GmailPermissionLink','GmailPermissionLink',pmDiv)
        //         GmailPermissionLink.href=`${WEB_HOST}/permissions/gmail`
        //         GmailPermissionLink.setAttribute('target','_blank')
        //         GmailPermissionLink.textContent='Grant Permission'
        //     }else{
        //         importParent=createElem('div','importParent','importParent',emailThreadsParent)
        //     }
        // })

        // importParent=createElem('div','importParent','importParent',emailThreadsParent)

        const allSingleTabs=document.querySelectorAll('.singleTab')
        allSingleTabs.forEach(tab=>{
            tab.addEventListener('click',e=>{
                convoTab.classList.remove('active')
                singleTab.classList.remove('active')
                e.target.classList.add('active')
                if(e.target==singleTab){
                    composeBox.style.display='flex'
                    emailThreadsWrapper.style.display='none'
                }else{
                    composeBox.style.display='none'
                    emailThreadsWrapper.style.display='flex'
                }
            })
        })

        
        if(!window.location.href.includes('compose')){
            convoTab.classList.add('active')
            emailThreadsWrapper.style.display='flex'
            composeBox.style.display='none'
            mainTable.style.marginTop='95px'
        }else{
            singleTab.classList.add('active')
            composeBox.style.display='flex'
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

        let composeSpanParent=createElem('div','composeSpanParent','composeSpanParent',composeBox)
        let composeSpan=createElem('textarea','composeSpan','composeSpan',composeSpanParent)
        composeSpan.setAttribute('placeholder',dynamicUserObj.internal.mainPlaceholder)
        

        const composeBtnsDiv=createElem('div','composeBtnsDiv','composeBtnsDiv',composeBox)
        let stopBtn=createElem('button','stopBtn','stopBtn',composeBtnsDiv)
        let stopBtnSpan=createElem('span','stopBtnSpan','stopBtnSpan',stopBtn)
        stopBtn.addEventListener('click',(e)=>{stopGenerationProcess()})
        stopBtn.setAttribute('title',dynamicUserObj.internal.stopGenTitle)
        let writeBtn=createElem('button','writeBtn','writeBtn',composeBtnsDiv)
        writeBtn.textContent=dynamicUserObj.internal.writeBtn
        writeBtn.addEventListener('click',(e)=>{initGenerationProcess()})

        //SETTINGS
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
const checkIfGmailThread=()=>{
    // const pattern = /^https:\/\/mail\.google\.com\/mail\/u\/\d+\/#inbox\/[A-Za-z0-9_-]+$/;
    // pattern.test(window.location.href)
   
    let expandButton=$('span[data-is-tooltip-wrapper] button[aria-label="Expand all"]')
    let printButton=$('span[data-is-tooltip-wrapper] button[aria-label="Print all"]')
    if(!expandButton[0]){
        expandButton= $('span[data-is-tooltip-wrapper] button[aria-label="In new window"]')
    }

    if(expandButton[0] && printButton[0]){
        const commonAncestor = getFirstCommonAncestor(expandButton[0],printButton[0]);
        const rect = commonAncestor.getBoundingClientRect();
        const leftPos = (window.scrollX || document.documentElement.scrollLeft)+rect.left
        const topPos = (window.scrollY || document.documentElement.scrollTop)+rect.top

        // console.log(leftPos,topPos,commonAncestor)
        if(leftPos && topPos){
            if(!threadOpened){
                threadOpened=true
                chrome.storage.local.get(['userState'],res=>{
                    if(res.userState==='logged in'){
                        addImportBtnGmail(commonAncestor)
                    }
                })
            }
            
        }else{
            threadOpened=false
        }
        
    }
    

    
}

const addImportBtnGmail=async(pero)=>{
    let importBtn=document.querySelector('.importBtn#importBtn')
    // console.log(importBtn)
    if(!importBtn){
        importBtn=createElem('button','importBtn','importBtn',pero,true)
        importBtn.textContent='Import to MailMuse'
    }else{
        // console.log('Already here')
    }

    let called=false
    const triggerImport=async(e)=>{
        
            importBtn.textContent='Importing...'
            // importBtn.removeEventListener('click',triggerImport)
           let aa=await gMailImport(importBtn)
           console.log(aa)
           addAsImported(aa)
           threadOpened=false
           checkIfGmailThread()

        //    importBtn.textContent='Imported'
        
    }
    importBtn.addEventListener('click',triggerImport)
}

function removeDuplicates(arr) {
    let result = [];
    
    for (let i = 0; i < arr.length; i++) {
      // Calculate the difference between the current string and the previous string
      let currentString = arr[i];
      let previousString = i > 0 ? arr[i - 1] : '';
  
      // Remove the previous string part from the current string
      if (currentString.endsWith(previousString)) {
        currentString = currentString.slice(0, currentString.length - previousString.length);
      }
  
      result.push(currentString);
    }
  
    return result;
  }
  

  
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

const gMailImport=(theBtn)=>{
    console.log(theBtn)
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