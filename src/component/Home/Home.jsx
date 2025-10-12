import Banner from "../Pages/banner";
import Discover from "../Pages/Discover";
import Education from "../Pages/Education";
import Improve from "../Pages/Improve";
import Vision from "../Pages/Vision";


const Home = () => {
    return (
        <div className="poppins">
            <Banner></Banner>
            <Improve/>
            <Vision/>
            <Education/>
            <Discover/>
        </div>
    );
}

export default Home;
