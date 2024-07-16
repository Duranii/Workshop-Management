import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "@/app/firebase/config";
import Image from "next/image";
import BgImage from "/public/timelab-pro-sWOvgOOFk1g-unsplash 2.png";
import SiderbarImage from "/public/work.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [showForgotPassword, setShowForgotPassword] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/dashboard");
      }
    });
  }, [router]);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.length > 0) {
        setIsLogin(true);
        return;
      }

      const res = await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Sign up successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log({ res });
      await signOut(auth);
      setEmail("");
      setPassword("");
      setError("");
      setIsLogin(true);
    } catch (e: any) {
      setError(e.message);
      toast.error("Sign up unsuccessful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email || !password) {
        setError("Please enter both email and password.");
        return;
      }

      const res = await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log({ res });

      router.push("/dashboard");
    } catch (e: any) {
      setError(e.message);
      toast.error("Login unsuccessful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!email) {
        setError("Please enter your email.");
        return;
      }

      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setShowForgotPassword(false);
      setEmail("");
      setError("");
    } catch (e: any) {
      setError(e.message);
      toast.error("Failed to send password reset email", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
  };

  return (
    <div className="bg-black relative w-screen h-screen flex items-center justify-center overflow-x-hidden">
      <Image
        src={BgImage}
        alt="BgImage"
        width={100}
        height={100}
        className="z-[10] w-screen object-fit absolute left-0 right-0 top-0 bottom-0 h-screen"
      />

      <form className="w-[40%] rounded-[18px] max-md:p-3 max-md:mx-2 md:p-10 absolute z-[100] bg-white">
        <div className="flex flex-col gap-4 2xl:justify-between">
          <div className="w-[45%] bg-orange-500 rounded-lg">
            <Image
              src={SiderbarImage}
              alt="BgImage"
              className=""
              width={240}
              height={240}
            />
          </div>
          {showForgotPassword ? (
            <>
              <h1 className="text-[36px] font-inter font-semibold text-[#212121]">
                Forgot Password
              </h1>
              <h1 className=" text-[16px] leading-[28px] font-inter font-semibold text-[#212121]">
                Enter your email to reset your password
              </h1>
              <div className="">
                <input
                  type="email"
                  id="forgotEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  required
                />
              </div>
              <button
                onClick={handleForgotPassword}
                className="w-[100%] text-white bg-[#FF5701] transition-all hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[16px] uppercase px-5 py-3 text-center dark:bg-[#FF5701] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Send Reset Email
              </button>
              <div
                className="TextlabelWelcome text-[16px] leading-[28px] font-inter font-semibold text-center text-[#212121] mt-4 cursor-pointer"
                onClick={() => setShowForgotPassword(false)}
              >
                Back to Login
              </div>
            </>
          ) : (
            <>
              {isLogin ? (
                <>
                  <h1 className="my-[-10px] text-[36px] font-inter font-semibold text-[#212121]">
                    Login
                  </h1>
                  <h1 className=" text-[16px] leading-[28px] font-inter font-semibold text-[#212121]">
                    Login with email and password
                  </h1>
                </>
              ) : (
                <>
                  <h1 className="text-[36px] font-inter font-semibold text-[#212121]">
                    Sign Up
                  </h1>
                  <h1 className=" text-[16px] leading-[28px] font-inter font-semibold text-[#212121]">
                    Create a new account
                  </h1>
                </>
              )}
              <div className="">
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Please enter a valid email address"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="">
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  pattern=".{8,}"
                  title="Password must be at least 8 characters long"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100%] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Password"
                  required
                />
              </div>
              {isLogin ? (
                <>
                  <button
                    onClick={handleLogin}
                    className="w-[100%] text-white bg-[#FF5701] transition-all hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[16px] uppercase px-5 py-3 text-center dark:bg-[#FF5701] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Login
                  </button>
                  <div
                    className="TextlabelWelcome text-center text-[16px] leading-[28px] font-inter font-semibold text-[#212121] cursor-pointer"
                    onClick={toggleForm}
                  >
                    Don&apos;t have an account? Sign up
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={handleSignUp}
                    className="w-[100%] text-white bg-[#FF5701] transition-all hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-[16px] uppercase px-5 py-3 text-center dark:bg-[#FF5701] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Sign Up
                  </button>
                  <div
                    className="TextlabelWelcome text-[16px] leading-[28px] font-inter font-semibold text-center text-[#212121] cursor-pointer"
                    onClick={toggleForm}
                  >
                    Already have an account? Log in
                  </div>
                </>
              )}
              <h2 className="text-[#FF5701]">{error}</h2>
            </>
          )}
          {!showForgotPassword && (
            <h2
              onClick={() => setShowForgotPassword(true)}
              className="mt-[-30px] cursor-pointer font-inter text-[#FF5701] text-center"
            >
              Forgot Password
            </h2>
          )}
        </div>
      </form>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Index;
