import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import loginImage from "/src/assets/loginImage.jpg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./loginPage.scss";
import { toast, ToastContainer } from "react-toastify";
import { loginApi } from "../../config/api";
import { AuthContext } from "../../components/context/auth.context";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  //   Check Authentication
  const { setAuth } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await loginApi(email, password);

    console.log("Check res: ", res);

    if (res && res.err === 1) {
      localStorage.setItem("access_token", res.accessToken);
      setAuth({
        isAuthenticated: true,
      });
      navigate("/");
    } else {
      toast.error(res?.message);
      setEmail("");
      setPassword("");
    }
  };

  // Show password
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="flex w-full max-w-4xl bg-white shadow-md rounded-md overflow-hidden h-auto">
          <div className="hidden md:flex w-1/2 h-auto">
            <img
              src={loginImage}
              alt="Login Illustration"
              className="object-cover w-full h-full"
            />
          </div>

          <div className="w-full md:w-1/2 p-8 space-y-4 bg-white shadow-md rounded-md flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-center">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">Password</label>
                <div className="password-container">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                  />
                  {showPassword ? (
                    <FaEyeSlash
                      className="eye-icon"
                      onClick={handleShowPassword}
                    />
                  ) : (
                    <FaEye className="eye-icon" onClick={handleShowPassword} />
                  )}
                </div>

                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <button type="submit" className="btn btn-neutral w-full mt-6">
                Login
              </button>
              <div className="divider">OR</div>
              <button className="btn w-full">Login With Google</button>
            </form>
            <p className="text-center">
              Don’t have an account?{" "}
              <Link to="/register" className="text-black-500 font-bold">
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
