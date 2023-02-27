
  
  import axios from 'axios';;

  
  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //         let loginDate = new Date().getMinutes();
  //         const res = await axios.post("/login", { email, password });
  //         sessionStorage.setItem("access-token", JSON.stringify(res.data.accessToken)); 
  //         sessionStorage.setItem("session-start", JSON.stringify(loginDate));
  //         setUser(res.data);
  //     } catch (err) {
  //         window.alert("wrong email or password");
  //     }
  // };


function Signup() {
  function handleSubmit() {
    const res = await axios.post("/login", { email, password });

    
    (console.log("hey!"))
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center border  rounded bg-amber-500">
          <div pb-10>LOGO</div>
          <form className="bg-amber-400 shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
               focus:outline-none focus:shadow-outline bg-amber-200"
                id="username" 
                type="text" 
                placeholder="Username">
              </input>
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
               focus:outline-none focus:shadow-outline bg-amber-200" id="name" type="text" placeholder="John">
             </input>
             
           </div>
           <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                First Name
              </label>
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
               focus:outline-none focus:shadow-outline bg-amber-200" id="lastname" type="text" placeholder="Johnson">
             </input>
             
           </div>
           <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
             <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight
               focus:outline-none focus:shadow-outline bg-amber-200" id="password" type="password" placeholder="********">
             </input>
             
           </div>
           <div className="flex items-center justify-between">
            <button type="submit" className="bg-orange-600 hover:bg-orange-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline item-center justify-center">
              Sign up
            </button>
           </div>
          </form>
        </div>
  )
}

export default Signup