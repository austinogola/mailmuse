chrome.runtime.onMessage.addListener(async(request,sender,sendResponse)=>{
    if(request.setLang){
        if(request.setLang=='false'){
            UserLanguage=SystemLanguage
            // chrome.runtime.sendMessage({setLang:language})
        }
        else{
            UserLanguage=request.setLang
        }

        getAndSetLanguage()
        
    }
    if(request.userDetailsObj){
        userDetailsObj={...request.userDetailsObj}
    }
})


const lan_obj={
    ar:'Arabic - العربية' , bn:"Bengali - বাংলা" , zh:'Chinese - 中文', 
    "zh-CN":"Chinese (Mandarin) - 中文（简体)" , 
    "zh-TW":"Chinese (Traditional) - 中文（繁體)", hr:"Croatian - hrvatski" , cs:"Czech - čeština", da:"Danish - dansk" , nl:"Dutch - Nederlands", 
    en:"English", "en-GB":"English (UK)", "en-US":"English (US)",fr:"French - français" , de:"German" ,
     hi:"Hindi",
    is:"Icelandic - íslenska",id:"Indonesian - Indonesia", ga:"Irish - Gaeilge",it:"Italian - italiano",ja:"Japanese - 日本語" , ko:"Korean - 한국어" , 
    no:"Norwegian - norsk" , pl:"Polish - polski" ,sv:'Swedish',pt:"Portuguese - português","pt-BR":"Portuguese (Brazil)" , ru:"Russian - русский",
    es:"Spanish - español",vi:"Vietnamese - Tiếng Việt"

}

const newLangObj={
    ar:'Arabic - العربية', de:'German - Deutsch', en:'English - English',

    es:'Spanish - Español', fr:'French - Français', hi:'Hindi - हिन्दी',

    id:'Indonesian - Bahasa Indonesia', it:'Italian - Italiano', ja:'Japanese - 日本語', 
    
    ko:'Korean - 한국어', pt:'Portuguese - Português', ru:'Russian - Русский',

    tr:'Turkish - Türkçe',  vi:'Vietnamese - Tiếng Việt', zh:'Mandarin - 普通话'

      
}

const langCodes=[
    'ar', 'de', 'en', 'es', 'fr',
    'hi', 'id', 'it', 'ja', 'ko', 
    'pt', 'ru', 'tr', 'vi', 'zh'
]

const newLangCodes=[
    'de', 'en',  'fr', 'ja'
]

let SystemLanguage
let UserLanguage

chrome.runtime.sendMessage({getLang:true})

SystemLanguage = window.navigator.userLanguage || window.navigator.language;

if(SystemLanguage.includes('-')){
    SystemLanguage=SystemLanguage.split('-')[0]
}


console.log(SystemLanguage);

var dynamicSysObj
var dynamicUserObj

var selectorLangObj
var foundSelectors


getAndSetLanguage=async()=>{
    return new Promise(async(resolve, reject) => {
        let sysUrl=chrome.runtime.getURL(`languages/_locales/${SystemLanguage}/items.json`)
        let userUrl=chrome.runtime.getURL(`languages/_locales/${UserLanguage}/items.json`)
    
        let sysJson=await fetch(sysUrl)
        dynamicSysObj=await sysJson.json()
        // console.log(dynamicSysObj);
    
        let userJson=await fetch(userUrl)
        dynamicUserObj=await userJson.json()
        // console.log(dynamicUserObj);

        let theUrl=chrome.runtime.getURL(`languages/comps/goog.json`)
        let langJsons=await fetch(theUrl)
        selectorLangObj=await langJsons.json()

        resolve({dynamicSysObj,dynamicUserObj})
    })
    
    
}

const getDynamicObjs=()=>{
    return({dynamicSysObj,dynamicUserObj})
}

const changeLanguage=async()=>{
    let mans=chrome.runtime.getURL(`languages/_locales/${Language}/items.json`)
    let langJson=await fetch(mans)
   
}


const setLanguage=(lang_code)=>{
    chrome.runtime.sendMessage({setLang:lang_code})
    Language=lang_code
    console.log(Language);
    changeLanguage()
}

const figureOutLanguage=()=>{
    return new Promise(async(resolve, reject) => {
        
        if(foundSelectors){
            resolve(figureOutLanguage)
        }
        else{
            const tryAll=(sels)=>{
                let arr=Object.keys(sels)
                for (let i = 0; i < arr.length; i++) {
                    
                    const sysObj=sels[arr[i]]
                    const {Compose}=sysObj
    
                    let comP=$(`div:contains("${Compose}")`)
                    console.log(comP);
                    if(comP[0]){
                        return sysObj
                    }
                    
                }
            }
    
            foundSelectors=tryAll(selectorLangObj)
            
            resolve(foundSelectors)
        }
        
    })
}


