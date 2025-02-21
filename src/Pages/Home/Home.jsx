import { useNavigate } from "react-router-dom";
import banimg from "../../assets/homeban.png"
import useAuth from "../../hooks/useAuth";
const Home = () => {
  const {user} = useAuth();
  const navigate = useNavigate()
  console.log(user)
  const handleuser = () =>{
    if(!user){
      navigate("login")
    }
    else{
      navigate("dashboard")
    }
  }
    return (
        <div className="flex flex-col justify-center items-center text-white min-h-screen bg-primary">
           <div className="">
             <img src={banimg} alt="" className="w-full" />
             <h2 className="font-bold text-4xl ">Get things done with TODO</h2>
           </div>
             <button onClick={handleuser} to="login" className="p-2 font-semibold mt-2 border rounded-md bg-[#006D77]">Get Started</button >
        </div>
    );

};

export default Home;