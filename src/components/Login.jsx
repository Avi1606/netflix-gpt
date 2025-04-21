import React from 'react';

const Login = () => {

    const [isSignedIn, setIsSignedIn] = React.useState(true);

    const toogleSignIn = () => {
        setIsSignedIn(!isSignedIn);
    }

    return (
        <div className ="realtive">

          <div className="absolute flex justify-center items-center w-full z-10 inset-0">
              <form className="bg-black opacity-86 flex flex-col p-12 rounded max-w-md w-full mx-4">
                  <h2 className="text-white text-2xl font-bold mb-6">{isSignedIn ? "Sign In" :"Sign Up"}</h2>
                  <input className="bg-gray-650 p-3 my-3  placeholder-white text-white border-1 rounded-2l" type="text" placeholder="Email Address/Number" />
                  <input className="bg-gray-650 p-3 my-3  placeholder-white text-white border-1 rounded-2l" type="password" placeholder="Password" />
                  <button className="text-bold bg-red-600 text-white rounded py-3 mt-6 text-sm font-medium">{isSignedIn ? "Sign In" :"Sign Up"}</button>

                  <p className ="text-gray-400 mx-1 my-5" >{!isSignedIn ? "Already registered. " :"New to Netflix? "}<span className="text-white cursor-pointer hover:brightness-30" onClick={toogleSignIn}>{isSignedIn ?"Sign In" : "Sign Up"}.</span></p>
              </form>
          </div>
            <div className="">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/10 to-transparent"></div>
                <img
                    className="w-full"
                    src="https://assets.nflxext.com/ffe/siteui/vlv3/69bec183-9cc8-49d4-8fc2-08228d3c91b4/web/IN-en-20250414-TRIFECTA-perspective_c8273fb1-8860-4ff5-bd1c-c2c4b44d5f2a_large.jpg"
                    alt="background"/>
            </div>


        </div>
    );
};

export default Login;