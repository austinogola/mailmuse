import Navbar from '../components/Navbar';
import FirstSection from '../components/FirstSection';
import SecondSection from '../components/SecondSection';
import ThirdSection from '../components/ThirdSection';
import Testimonies from '../components/Testimonies';
import './App.css';
import Footer from '../components/Footer';
const Home=()=>{
    return(
        <div className='main Home'>
            <Navbar showAll={true} showBtn={true} />
            <FirstSection/>
            <SecondSection/>
            <ThirdSection/>
            {/* <Testimonies/> */}
            <Footer/>

        </div>
    )
}


export default Home;