import NavTitle from '../components/NavTitle';
import FirstSection from '../components/FirstSection';
import {Box,Flex,Text,Input,Link,CircularProgress,Button } from "@chakra-ui/react"
import Footer from '../components/Footer';
import './App.css';

const ToS=()=>{
    return(
        <Box className='main'>
            <NavTitle title='Terms and Conditions of Use'/>
            <Flex justifyContent='center' alignItems='center' mb='100px'>
                <Box w='60%' minW='300px'>
                     <Text fontSize='14px' fontWeight='bold'>
                            IMPORTANT!  The MailMuse app is licensed only on the condition that you 
                            agree to the terms and conditions set forth below.  PLEASE READ THE TERMS OF
                             THIS AGREEMENT CAREFULLY.
                    </Text>
                    <Text fontSize='14px'>
                        These Terms and Conditions govern your use of the MailMuse browser extension 
                        and any related services provided through the Extension. By installing or using the 
                        Extension,or using our web application you agree to these Terms.
                     </Text>
                    
                     
                     <Text fontSize='14px' my='10px'>
                        1.LICENSE TO USE THE EXTENSION. We grant you a limited, non-exclusive, 
                        non-transferable, and revocable license to use the Extension for personal or 
                        commercial purposes in accordance with these Terms.
                     </Text>

                     <Text fontSize='14px' my='10px'>
                        2.INTELLECTUAL PROPERTY RIGHTS. The Extension and its content, including but 
                        not limited to text, graphics, logos, and icons, are the property of 
                        MailMuse and are protected by copyright and other intellectual property laws.
                     </Text>


                     <Text fontSize='14px' my='10px'>
                        1.LICENSE TO USE THE EXTENSION. We grant you a limited, non-exclusive, 
                        non-transferable, and revocable license to use the Extension for personal or 
                        commercial purposes in accordance with these Terms.
                     </Text>


                     <Text fontSize='14px' my='10px'>
                        1.LICENSE TO USE THE EXTENSION. We grant you a limited, non-exclusive, 
                        non-transferable, and revocable license to use the Extension for personal or 
                        commercial purposes in accordance with these Terms.
                     </Text>


                     <Text fontSize='14px' my='10px'>
                        1.LICENSE TO USE THE EXTENSION. We grant you a limited, non-exclusive, 
                        non-transferable, and revocable license to use the Extension for personal or 
                        commercial purposes in accordance with these Terms.
                     </Text>


                     <Text fontSize='14px' my='10px'>
                        1.LICENSE TO USE THE EXTENSION. We grant you a limited, non-exclusive, 
                        non-transferable, and revocable license to use the Extension for personal or 
                        commercial purposes in accordance with these Terms.
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>Data Collected</Text>
                     <Text fontSize='14px' my='7px'>
                    "Personal Information": Data that identifies you or can be used to 
                        contact you, such as your email address or other contact information,
                         when you provide it voluntarily.
                     </Text>
                     <Text>
                        "Cookies".  MailMuse uses Cookies to identify the areas of MailMuse that 
                        you have visited and other purposes.  A “Cookie” is a small piece of data 
                        stored on your computer or device by your web browser. 
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        "Log Data": Automatically collected information when you use the Extension, 
                        including , but not limited to your email address, your prompt and timestamp
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        "Usage Data" : Information about how you interact with the Extension, 
                        such as the features you use and the actions you take within the user interface.
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        "Device Information" : Details about the device and browser you use to access the Extension, 
                        including the device type, operating system, and browser version.
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>How we Use Data Collected</Text>
                     <Text fontSize='14px' my='7px'>
                     To provide and maintain the Extension;
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        To improve the quality and functionality of the Extension;
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        To personalize your experience and tailor content to your preferences;
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        To communicate with you about the Extension, including updates , promos and notifications;
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        To analyze usage trends and monitor the performance of the Extension;;
                     </Text>
                     <Text fontSize='14px' my='7px'>
                        To detect, prevent, and address technical issues and security vulnerabilities.;
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>Data Sharing and Disclosure</Text>
                     <Text fontSize='14px' my='7px'>
                        We may share your information with third-party service providers and partners 
                        who assist us in operating, maintaining, and improving the Extension. We may 
                        also share your information in response to legal requests or to protect our 
                        rights, property, or safety.
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>Data Retention</Text>
                     <Text fontSize='14px' my='7px'>
                     We will retain your information for as long as necessary to fulfill the purposes 
                     outlined in this Privacy Policy, unless a longer retention period is required or
                      permitted by law.
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>Your Choices</Text>
                     <Text fontSize='14px' my='7px'>
                        You can control and manage certain preferences and settings related to the
                         Extension through the browser settings or options provided within the Extension.
                          You may also opt out of certain data collection and processing activities,
                           although this may limit your ability to use certain features of the Extension
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>Children's Privacy</Text>
                     <Text fontSize='14px' my='7px'>
                        The Extension is not directed at children under the age of 13, and we do not 
                        knowingly collect personal information from children. If you believe that we 
                        have inadvertently collected personal information from a child, please contact us 
                        immediately.
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>Changes to This Privacy Policy</Text>
                     <Text fontSize='14px' my='7px'>
                        We may update this Privacy Policy from time to time to reflect changes in our 
                        practices or legal requirements. We will notify you of any material changes by
                         posting the updated Privacy Policy on this page.
                     </Text>

                     <Text fontWeight='500' fontSize='19px'>Contact Us</Text>
                     <Text fontSize='14px' my='7px'>
                     If you have any questions or concerns about this Privacy Policy or our data 
                     practices, please contact us at <strong>support@mailmuse.com</strong> .
                     </Text>
                     <Text fontSize='14px' my='7px'>
                     By using the Extension, you consent to the collection and use of information
                      as described in this Privacy Policy.
                     </Text>
                </Box>
            </Flex>
            <Footer/>

        </Box>
    )
}


export default ToS;