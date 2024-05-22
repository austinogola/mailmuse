import { Box ,Flex,Text, Button } from '@chakra-ui/react'

import {useEffect } from 'react'
// import './AnimationBox.css'

function AnimationBox() {

    const PROMPTS=[ {
        "q":"to my boss asking for a salary review",
        "sub":"Valuing Contribution:Request for a salary review",
        "ans":"Dear [Boss's Name]\n\nI hope this email finds you well.I am writing to request a salary review.\n\nAs I reflect on my contributions and achievements during my time at [Company Name], I believe that a review of my compensation would be appropriate.\n\nOver the past [time period], I have had the opportunity to [highlight specific accomplishments or contributions]. I am proud of the work I have done and the value I have added to the team."
    },
    {
        "q":"to my team, reminding them of our meeting",
        "sub":"Reminder: Team Meeting Tomorrow",
        "ans":"Hi Team,\n\nI hope this email finds you well. This is a friendly reminder about our upcoming team meeting scheduled for tomorrow at [insert time] in [insert location or virtual platform]. Agenda items will include: [insert agenda items].\n\nYour participation and input are highly valued, so please make every effort to attend. If you're unable to join, kindly inform me in advance so we can accommodate accordingly.\n\nLooking forward to our productive discussion tomorrow!\n\nBest regards,\n\n[Your Name]"
    },
    {
        "q":"to a customer who filed a complaint",
        "sub":"Resolution to Your Recent Complaint",
        "ans":"Dear [Customer's Name],\n\nI wanted to personally reach out to address the concerns you raised in your recent complaint.\n\nFirst and foremost, I apologize for any inconvenience or frustration our service may have caused you. Providing exceptional customer service is our top priority, and it's clear we fell short of your expectations on this occasion.\n\nI have thoroughly investigated the issue you raised and have taken steps to rectify the situation. [Provide details of how you resolved the complaint]\n\nOnce again, I apologize for any inconvenience this may have caused you. If there's anything else I can assist you with or if you have any further concerns, please don't hesitate to reach out to me directly.\n\n\nThank you for your understanding and patience.\n\n\nBest regards,\n\n[Your Name]\n\n[Your Position]"
    }]

    const sleep=(ms)=>{
        return new Promise(async(resolve, reject) => {
            setTimeout(() => {
                resolve('DONE')
            }, ms);
        })
    }

    useEffect(()=>{
        const questionArea=document.querySelector('#questionArea')
        const answerArea=document.querySelector('#answerArea')
        const subjArea=document.querySelector('#subjArea')
        const writeBtn=document.querySelector('#writeBtn')

        const addTexts=async(area,text,interval)=>{
            // area.innerHTML=''
            return new Promise(async(resolve, reject) => {
                for(let i=0; i<text.length; i++){
                    area.textContent+=text[i]
                    await sleep(interval)
                }
                resolve('FIN')
            })
            
        }

        const queston_answer_series=async(quest,sub,ans)=>{
            questionArea.innerHTML=''
            answerArea.innerHTML=''
            subjArea.innerHTML='Subject: '
            return new Promise(async(resolve, reject) => {
                await addTexts(questionArea,quest,20)
                writeBtn.style.transform='scale(0.9)'
                await sleep(300)
                writeBtn.style.transform='scale(1)'
                await sleep(500)
                await addTexts(subjArea,sub,20)
                await addTexts(answerArea,ans,10)

                await sleep(1000)

                resolve('DONE')
            })
        }
       
            let firstQ=PROMPTS[0].q
        let firstSubj=PROMPTS[0].sub
        let firstAns=PROMPTS[0].ans

        const allSeries=()=>{
            return new Promise((resolve, reject) => {

                queston_answer_series(firstQ,firstSubj,firstAns).then(()=>{
                    let secondQ=PROMPTS[1].q
                    let secondSubj=PROMPTS[1].sub
                    let secondAns=PROMPTS[1].ans
        
                    queston_answer_series(secondQ,secondSubj,secondAns).then(()=>{
                        let thirdQ=PROMPTS[2].q
                        let thirdSubj=PROMPTS[2].sub
                        let thirdAns=PROMPTS[2].ans
        
                        queston_answer_series(thirdQ,thirdSubj,thirdAns).then(async()=>{
                            allSeries()
                        })
                    })
                })
               
                
            })
        }

        allSeries()

        

        
        

        

    })
    return(
        <Box w='95%' h='450px' border='1px solid #464647'
            borderRadius= '5px'  display='grid' 
            gridTemplateRows='50% 50%'>
            
            <Box  display='grid' gridTemplateRows='1.2fr 1.2fr 1.2fr 2.2fr'>
                <Flex backgroundColor='#464647' px='7px' alignItems='center' 
                fontSize='14px' color='#C7C7CC' >
                    <Text m='0px'>New Message</Text>
                </Flex>

                <Flex backgroundColor='white' px='7px' alignItems='center' 
                fontSize='14px' color='black' borderBottom='1px solid #CCCCCC'>
                    <Text m='0px'>To</Text>
                </Flex>

                <Flex backgroundColor='white' px='7px' alignItems='center' 
                fontSize='14px' color='black' borderBottom='1px solid #CCCCCC'>
                    <Text m='0px' id='subjArea'>Subject</Text>
                </Flex>

                <Flex backgroundColor='white' px='7px' py='2px'  alignItems='flex-start'
                fontSize='14px' color='black' borderBottom='1px solid #CCCCCC'
                position='relative'>
                    <Text m='0px' color='purple' textDecoration='underline'
                    marginRight='3px' fontWeight='500'>Write an email</Text>
                    <Text m='0px' id='questionArea'></Text>
                    <Button position='absolute' bottom='3px' h='25px'
                    outline='none' border='none' backgroundColor='purple'
                    color='white' borderRadius='3px'  id='writeBtn'>Write</Button>
                </Flex>
            </Box>
            <Box p='5px' px='10px' overflow='auto'>
                <Text m='0px' fontSize='13px' id='answerArea' whiteSpace='pre-line'></Text>
            </Box>
            
        </Box>
    )
}




export default AnimationBox;