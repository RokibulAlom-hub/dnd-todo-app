import { Link } from "react-router-dom";
import banimg from "../../assets/homeban.png"
const Home = () => {
    return (
        <div className="flex flex-col justify-center items-center text-white min-h-screen bg-primary">
           <div className="">
             <img src={banimg} alt="" className="w-full" />
             <h2 className="font-bold text-4xl ">Get things done with TODO</h2>
           </div>
             <Link to="login" className="p-2 font-semibold mt-2 border rounded-md bg-[#006D77]">Get Started</Link >
        </div>
    );

};

export default Home;