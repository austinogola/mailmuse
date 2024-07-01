
const addPagePopup=(prompt)=>{
    const body=document.querySelector('body')
  
    const popupOverlay=createElem('div','popupOverlay','popupOverlay',body)
    popupOverlay.addEventListener('click', checkToRemoveOverlay);
    const popupDiv=createElem('div','popupDiv','popupDiv',popupOverlay)

    

    const inputDiv=createElem('div','inputDiv','inputDiv',popupDiv)
    const promptInputParent=createElem('div','promptInputParent','promptInputParent',inputDiv)
    const promptInput=createElem('textarea','promptInput','promptInput',promptInputParent)
    promptInput.setAttribute('placeholder',prompt)

    const promptBtnBox=createElem('div','promptBtnBox','promptBtnBox',inputDiv)
    const newStopBtn=createElem('button','newStopBtn','newStopBtn',promptBtnBox)
    const newStopSpan=createElem('span','newStopSpan','newStopSpan',newStopBtn)
    newStopBtn.addEventListener('click',(e)=>{stopPopupGenerateProcess(true)})

    const newGenBtn=createElem('button','newGenBtn','newGenBtn',promptBtnBox)
    newGenBtn.textContent=dynamicUserObj.internal.reWriteBtn
    newGenBtn.addEventListener('click',(e)=>{initGenerationProcess({popup:true})})

    // const newSettingsDiv=createElem('div','newSettingsDiv','newSettingsDiv',popupDiv)

    // let languageSetting=createElem('div','settingItem','languageSetting',newSettingsDiv)
    // let languageSettingTitleBox=createElem('div','settingTitleBox','languageSettingTitleBox',languageSetting)
    // let languageSettingTitle=createElem('p','settingTitle','languageSettingTitle',languageSettingTitleBox)
    // languageSettingTitle.textContent='Language'
    // let languageSelect=createElem('select','settingsSelect','languageSelect',languageSetting)    

    // langCodes.forEach(item=>{
    //     let opt=createElem('option',"languageOptions",null,languageSelect)
    //     opt.setAttribute('value',item)
    //     if(item==UserLanguage){
    //         opt.selected=true
    //     }
    //     let theText=newLangObj[item].split('-')[1].trim()
    //     opt.innerHTML=`<p>${theText}</p>`
    // })
    // languageSelect.addEventListener('change',async e=>{
    //     UserLanguage=e.target.value
    //     chrome.runtime.sendMessage({setLang:UserLanguage})
    //     await getAndSetLanguage()
    //     changUiLanguages()
    // })

    // let toneSetting=createElem('div','settingItem','toneSetting',newSettingsDiv)
    // let toneSettingTitleBox=createElem('div','settingTitleBox','toneSettingTitleBox',toneSetting)
    // let toneSettingTitle=createElem('p','settingTitle','toneSettingTitle',toneSettingTitleBox)
    // toneSettingTitle.textContent='Tone'
    // let toneSelect=createElem('select','settingsSelect','toneSelect',toneSetting)
    // const tones=[...dynamicUserObj.internal.allTones]
    // tones.forEach((item,index)=>{
    //     let opt=createElem('option',"toneOptions",null,toneSelect)
    //     opt.setAttribute('value',item)
    //     if(index==0){
    //         opt.selected=true
    //     }
    //     opt.innerHTML=`<p>${item}</p>`
    // })

    // const notifDiv=createElem('div','notifDiv','notifDiv',popupDiv)

    const genEmailsDiv=createElem('div','genEmailsDiv','genEmailsDiv',popupDiv)

    addGenerateDiv()
    
}

const checkToRemoveOverlay=(e)=>{
    const popupOverlay=document.querySelector('.popupOverlay')
    const popupDiv=document.querySelector('.popupDiv')
    if(!popupDiv.contains(e.target)){
        popupOverlay.removeEventListener('click', checkIfOutSide);
        popupOverlay.remove()
    }
}

const addGenerateDiv=()=>{
    const genEmailsDiv=document.querySelector('.genEmailsDiv')
    if(genEmailsDiv){
        let newGenDivWrapper=createElem('div','newGenDivWrapper','newGenDivWrapper',genEmailsDiv,true)
        let newGenDivHeader=createElem('div','newGenDivHeader','newGenDivHeader',newGenDivWrapper)
        let newGenDivTitle=createElem('span','newGenDivTitle','newGenDivTitle',newGenDivHeader)
        const siblingsNum=genEmailsDiv.children.length
        newGenDivTitle.textContent=`Email #${siblingsNum}`

        let newGenDivItems=createElem('div','newGenDivItems','newGenDivItems',newGenDivHeader)
        // let saveSpan=createElem('span','newGenSaveSpan','newGenSaveSpan',newGenDivItems)
        // let saveImg=createElem('img','saveImg','saveImg',saveSpan)
        // saveImg.src = chrome.runtime.getURL("icons/icons8-save-48.png")
        // let saveTxt=createElem('span',null,null,saveSpan)
        // saveTxt.textContent='Save'

        let copySpan=createElem('span','newGenCopySpan','newGenCopySpan',newGenDivItems)
        let copyImg=createElem('img','copyImg','copyImg',copySpan)
        copyImg.src = chrome.runtime.getURL("icons/icons8-copy-48.png")
        let copyTxt=createElem('span','copyingTxt','copyingTxt',copySpan)
        copyTxt.textContent=dynamicUserObj.internal.copyTitle

        let insertSpan=createElem('span','newGenInsertSpan','newGenInsertSpan',newGenDivItems)
        let insertImg=createElem('img','insertImg','insertImg',insertSpan)
        insertImg.src = chrome.runtime.getURL("icons/icons8-download-32.png")
        let insertTxt=createElem('span','insertingTxt','insertingTxt',insertSpan)
        insertTxt.textContent=dynamicUserObj.internal.insertTitle
        

        let newGenDiv=createElem('div','newGenDiv','newGenDiv',newGenDivWrapper)

        copySpan.addEventListener('click',e=>{
            navigator.clipboard.writeText(newGenDiv.innerText);
            copyTxt.textContent=dynamicUserObj.internal.copiedTitle
            setTimeout(() => {
                copyTxt.textContent=dynamicUserObj.internal.copyTitle
            }, 800);
        })

        insertSpan.addEventListener('click',e=>{
            insertContentsToBoxes(newGenDiv.innerText)
           
        })
    }
}



const stopPopupGenerateProcess=()=>{
    chrome.runtime.sendMessage('stop_signal')
    removeLoadingOverlay()
}



const removePopupOverlay=()=>{
    const loading_overlay=document.querySelector(".loading_overlay")
    const newGenBtn=document.querySelector('.newGenBtn')
    if(loading_overlay){
        loading_overlay.remove()
    }
    newGenBtn.disabled=false
    newGenBtn.style.cursor='pointer'
    
}

const popupQuickError=async(message,explanation)=>{
    let inputDiv=document.querySelector('.inputDiv')
    let mesoDiv=createElem('div','quickPrompt',null,inputDiv)

    if(message){
        let meso=createElem('p',null,null,mesoDiv)
        meso.innerText=message
    }
    if(explanation){
        let meso2=createElem('p',null,null,mesoDiv)
        meso2.innerText=explanation
    }
    
    let pos=-45
    while(pos>-60){
        mesoDiv.style.bottom=`${pos}px`
        await sleep(25)
        pos-=5
    }
    await sleep(1500)
    mesoDiv.remove()
}

const addErrorPopup2=(textA,textB)=>{
    const closePopup=()=>{
        const errorPopup=document.querySelector('.errorPopup')
        errorPopup.remove()
        removePopupOverlay()
    }
    const inputDiv=document.querySelector('.inputDiv')
    const errorPopup=createElem('div','errorPopup','errorPopup',inputDiv)
    let errorHeader=createElem('div','errorHeader','errorHeader',errorPopup)
    let errorHeaderTitle=createElem('p','errorHeaderTitle','errorHeaderTitle',errorHeader)
    errorHeaderTitle.textContent='You are out of Credits for this Month'
    let closeErrorSpan=createElem('span','closeErrorSpan','closeErrorSpan',errorHeader)
    closeErrorSpan.innerHTML='&#215'
    closeErrorSpan.addEventListener('click',closePopup)

    // let np=createElem('p',null,null,errorPopup)
    // np.textContent=textA
    let np2=createElem('p',null,null,errorPopup)
    np2.textContent=textB

    const errorBtnDiv=createElem('div','errorBtnDiv','errorBtnDiv',errorPopup)
    const plansLink=createElem('a','plansLink','plansLink',errorBtnDiv)
    plansLink.href=`${WEB_HOST}/billing`
    plansLink.textContent='View Plans'
    plansLink.setAttribute('title','plans')
    const addCreditsLink=createElem('a','addCreditsLink','addCreditsLink',errorBtnDiv)
    addCreditsLink.href=`${WEB_HOST}/billing`
    addCreditsLink.textContent='Add Credits'
    addCreditsLink.setAttribute('title','more credits')

}

