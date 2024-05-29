const initGenerationProcess=async(popup)=>{
    let overLayParent=document.querySelector('.composeSpanParent')
    let writeBtn=document.querySelector('.writeBtn')

    const composeSpan=document.querySelector('.composeSpan')
    const promptInput=document.querySelector('.promptInput')
    let prompText=composeSpan.value.trim();

    let quickOrigin=document.querySelector('.composeWrapper')
    if(popup){
        overLayParent=document.querySelector('.promptInputParent')
        writeBtn=document.querySelector('.newGenBtn')
        prompText=promptInput.value.trim()
        quickOrigin=document.querySelector('.inputDiv')
       
    }
    addLoadingOverlay(overLayParent,writeBtn)

    let languageSelect=document.querySelector('select#languageSelect')
    let toneSelect=document.querySelector('select#toneSelect')

    let selectedTone=toneSelect.value
    let selectedLanguage=languageSelect.value
    

    if(prompText.length<10){
        removeLoadingOverlay(popup)
        return quickPrompt(
            quickOrigin,
            dynamicUserObj.internal.shortP1,
            dynamicUserObj.internal.shortP2
        )
    }

    const promptObj={tone:selectedTone,lang:selectedLanguage,thePrompt:prompText}

    chrome.storage.local.get(['userState'],async res=>{
        if(res.userState=='logged in'){
            let uStatus=await verifyUsage()
            if(uStatus==='continue'){
                proceedToGenerate(promptObj,popup)
            }
            else if(uStatus==='out of credits'){
                addErrorPopup(
                    quickOrigin,
                    dynamicUserObj.internal.creditWarn1, 
                    dynamicUserObj.internal.creditWarn2
                )
                
            }
        }
    })
   
}

const stopGenerationProcess=(popupped)=>{
    chrome.runtime.sendMessage('stop_signal')
    removeLoadingOverlay(popupped)
}



const addLoadingOverlay=(paro,btn)=>{
    const loading_overlay=createElem('div','loading_overlay','loading_overlay',paro)
    let dotsA=['one','two','three']
    dotsA.forEach(item=>{
        let dot=createElem('h1','dots',item,loading_overlay)
        dot.innerText='.'
    })
    btn.disabled=true
    btn.style.cursor='no-drop'
}
const removeLoadingOverlay=(popupped)=>{
    const loading_overlay=document.querySelector(".loading_overlay")
    if(loading_overlay){
        loading_overlay.remove()
    }
    const btn=popupped?document.querySelector('.newGenBtn'):document.querySelector('.writeBtn')
    btn.disabled=false
    btn.style.cursor='pointer' 
}



const quickPrompt=async(origin,message,explanation)=>{

    let mesoDiv=createElem('div','quickPrompt',null,origin)

    if(message){
        let meso=createElem('p',null,null,mesoDiv)
        meso.innerText=message
    }
    if(explanation){
        let meso2=createElem('p',null,null,mesoDiv)
        meso2.innerText=explanation
    }
    
    let pos=-50
    while(pos>-100){
        mesoDiv.style.bottom=`${pos}px`
        await sleep(25)
        pos-=10
    }
    await sleep(1500)
    mesoDiv.remove()
}

const addErrorPopup=(pero,textA,textB)=>{
    const closePopup=()=>{
        const errorPopup=document.querySelector('.errorPopup')
        errorPopup.remove()
        removeLoadingOverlay()
    }
    const errorPopup=createElem('div','errorPopup','errorPopup',pero)
    let errorHeader=createElem('div','errorHeader','errorHeader',errorPopup)
    let errorHeaderTitle=createElem('p','errorHeaderTitle','errorHeaderTitle',errorHeader)
    errorHeaderTitle.textContent=dynamicUserObj.internal.creditWarn1
    let closeErrorSpan=createElem('span','closeErrorSpan','closeErrorSpan',errorHeader)
    closeErrorSpan.innerHTML='&#215'
    closeErrorSpan.addEventListener('click',closePopup)

    // let np=createElem('p',null,null,errorPopup)
    // np.textContent=textA
    let np2=createElem('p',null,null,errorPopup)
    np2.textContent=textB

    const errorBtnDiv=createElem('div','errorBtnDiv','errorBtnDiv',errorPopup)
    const plansLink=createElem('a','plansLink','plansLink',errorBtnDiv)
    plansLink.href=`${WEB_HOST}/app/billing`
    plansLink.textContent='View Plans'
    plansLink.setAttribute('title','plans')
    const addCreditsLink=createElem('a','addCreditsLink','addCreditsLink',errorBtnDiv)
    addCreditsLink.href=`${WEB_HOST}/app/billing`
    addCreditsLink.textContent='Add Credits'
    addCreditsLink.setAttribute('title','more credits')

}

const insertContentsToBoxes=(allText)=>{
    let textArr=allText.split('\n')
    
    let subjectline=textArr[0]
    let remainingLines=textArr.slice(1,textArr.length).join('\n')

    let subjectBox
    let messageBox
    if(window.location.href.includes('google')){
        subjectBox=$(`input[placeholder='${foundSelectors.Subject}']`)[0]
        messageBox=$(`div[aria-label='${foundSelectors.Body}']`)[0]
    }else if(window.location.href.includes('outlook')){

    }

    if(subjectBox){
        subjectBox.value=subjectline
    }

    if(messageBox){
        messageBox.innerText=remainingLines
    }
    
}

const refreshForLanguage=()=>{
    let composeWrapper=document.querySelector("div#composeWrapper")

    if(composeWrapper){
        composeWrapper.remove()
        showGmailNormalUi()
    }
}

const changUiLanguages=()=>{
    let multiUiElementsArr=['toneOptions','languageOptions','settingsTab','tabContent','copyingTxt','insertingTxt']
    let uiElementsArr=[
        'composeSpan','stopBtn','writeBtn','languageSettingTitle','toneSettingTitle',
        'settingsHeaderTitle','savedTitleTxt','saveTitleBtn','planTxt','mngPlan','newGenBtn'
        ]
    
    multiUiElementsArr.forEach(name=>{
        let elms=document.querySelectorAll(`.${name}`)
        if(elms[0]){
            if(name=='toneOptions'){
                const tones=[...dynamicUserObj.internal.allTones]
                elms.forEach((elm,index)=>{
                    elm.setAttribute('value',tones[index])
                    if(index==0){
                        elm.selected=true
                    }
                    elm.innerHTML=`<p>${tones[index]}</p>`
                })
            }
            else if(name=='languageOptions'){
                elms.forEach((elm,index)=>{
                    if(elm.value==UserLanguage){
                        elm.selected=true
                    }
                })
            }
            else if(name=='settingsTab'){
                const settingTabsItems=[dynamicUserObj.internal.profileTitle,dynamicUserObj.internal.accountTitle]
                elms.forEach((elm,index)=>{
                    elm.textContent=settingTabsItems[index]
                })
            }
            else if(name=='tabContent'){
                // elms.forEach((elm,index)=>{
                //     elm.textContent=settingTabsItems[0]
                // })
            }
            else if(name=='copyingTxt'){
                elms.forEach((elm,index)=>{
                    elm.textContent=dynamicUserObj.internal.copyTitle
                })
                
            }
            else if(name=='insertingTxt'){
                elms.forEach((elm,index)=>{
                    elm.textContent=dynamicUserObj.internal.insertTitle
                })
            }
        }
    })

    uiElementsArr.forEach(name=>{
        let elm=(name=='languageSettingTitle' || name=='toneSettingTitle')?
        document.querySelector(`#${name}`):document.querySelector(`.${name}`)

        if(elm){
            if(name=='composeSpan'){
                elm.setAttribute('placeholder',dynamicUserObj.internal.mainPlaceholder)
            }
            else if(name=='stopBtn'){
                elm.setAttribute('title',dynamicUserObj.internal.stopGenTitle)
            }
            else if(name=='writeBtn'){
                elm.textContent=dynamicUserObj.internal.writeBtn
            }
            else if(name=='languageSettingTitle'){
                elm.textContent=dynamicUserObj.internal.langTitle
                
            }
            else if(name=='toneSettingTitle'){
                elm=document.querySelector(`#${name}`)
                elm.textContent=dynamicUserObj.internal.toneTitle
            }
            else if(name=='settingsHeaderTitle'){
                elm.textContent=dynamicUserObj.internal.settingTitle
            }
            else if(name=='savedTitleTxt'){
                elm.textContent=`${dynamicUserObj.internal.TitleTitle}: `
            }
            else if(name=='saveTitleBtn'){
                elm.textContent=dynamicUserObj.internal.SaveTitle
            }
            else if(name=='planTxt'){
                elm.textContent=dynamicUserObj.internal.planTxt
            }
            else if(name=='mngPlan'){
                elm.textContent=dynamicUserObj.internal.planManageText
            }
            else if(name=='newGenBtn'){
                elm.textContent=dynamicUserObj.internal.reWriteBtn
            }

        }

    })

}