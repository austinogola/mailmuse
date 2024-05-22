import './exampleImg.css'
import {useEffect } from 'react'

import PROMPTS from './examplePrompts'
import { Box ,Image,Flex,Link,Text } from '@chakra-ui/react'

function ExampleImg() {

    // let jj=await fetch('examplePrompts.json')
    // console.log(jj);
    console.log(PROMPTS);
    
    const sleep=(ms)=>{
        return new Promise(async(resolve, reject) => {
            setTimeout(() => {
                resolve ('DONE')
            }, ms);
        })
    }
    const addUserPrompt=(text)=>{
        const promptArea=document.querySelector('span#userPromptSpan>small')
        const btn=document.querySelector('#GhostBarSpan button')
        return new Promise(async(resolve, reject) => {
            for(let i=0; i<text.length; i++){
                promptArea.textContent+=text[i]
                await sleep(35)
            }
            await sleep(300)
            btn.style.transform='scale(0.9)'
            await sleep(300)
            btn.style.transform='scale(1)'

            resolve('DONE')
        })
    }
    const addAnswer=(subj,text)=>{
        const answer=document.querySelector('div.bottomDiv span')
        const subjectArea=document.querySelector('#subjectArea')


        let textArr=text.split('\n')
        
        return new Promise(async(resolve, reject) => {
            subjectArea.textContent=''
            for (let a=0;a<subj.length;a++){
                subjectArea.textContent+=subj[a]
                await sleep(20)
            }

            for(let i=0; i<textArr.length; i++){
                let textLine=textArr[i]
                for(let j=0; j<textLine.length; j++){
                    answer.innerHTML+=textLine[j]
                    await sleep(10)
                }
                answer.innerHTML+='<br/>'
                answer.innerHTML+='<br/>'
                await sleep(200)
            }
            

            resolve('DONE')
        })
    }
    const runExamples=async(cur)=>{
        
        let currObj=PROMPTS[cur]

        let curr_text=currObj.q

        await addUserPrompt(curr_text)
        await sleep(500)
        let ans_text=currObj.ans
        let subj=currObj.sub
        await addAnswer(subj,ans_text)
        
        // promptArea.textContent=''
        // cur+=1

        // if(cur>=3){
        //     cur=0
        // }

        // runExamples(cur)

        
        
    }

    useEffect(()=>{
        // runExamples(0)
    })
    return(
        
        <div className='exampleImg'>
            <div className='topDiv'>
                <span id='TopBar'>
                    <span>New Message</span>
                </span>
                <span id='ToBar'>
                    <span><small>To</small></span>
                </span>
                <span id='SubjectBar'>
                    <span >
                        <small id='subjectArea'>Subject</small>
                    </span>
                </span>

                <span id='GhostBar'>
                    <span id='GhostBarSpan'>
                        <label>Write an email</label>
                        <span id='userPromptSpan'><small></small></span>
                        <button>Write</button>
                    </span>
                </span>

            </div>
            <div className='bottomDiv'>
                <span>
                    
                </span>

            </div>
        </div>
    )
}


export default ExampleImg;