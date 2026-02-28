import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Login() {
    const [formData, setFormData] = useState({
        userEmail: "",
        userPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleLogin = (e) => {
        e.preventDefault();
        console.log("Login Data:", formData);
    };

    const handleGoogleLogin = () => {
        console.log("Google Login Clicked");
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">

            {/* Card */}
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg
                            bg-white dark:bg-slate-800
                            border border-slate-200 dark:border-slate-700">

                <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-6">
                    Welcome Back
                </h2>

                {/* Google Login */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-3 py-3 rounded-xl font-semibold
                               hover:scale-105 active:scale-95 transition-transform duration-300 mb-6
                               bg-slate-100 dark:bg-slate-700
                               text-gray-700 dark:text-white
                               border border-slate-200 dark:border-slate-600"
                >
                    <FcGoogle size={22} />
                    Continue with Google
                </button>

                {/* Divider */}
                <div className="flex items-center mb-5">
                    <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700" />
                    <span className="text-sm px-3 text-slate-400 dark:text-slate-500">OR</span>
                    <div className="flex-grow h-px bg-slate-200 dark:bg-slate-700" />
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-4">
                    <input
                        type="email"
                        name="userEmail"
                        placeholder="Email address"
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl
                                   bg-slate-100 dark:bg-slate-700
                                   text-slate-900 dark:text-white
                                   placeholder-slate-400 dark:placeholder-slate-400
                                   border border-slate-200 dark:border-slate-600
                                   focus:outline-none focus:ring-2 focus:ring-indigo-400
                                   transition-all"
                    />

                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            name="userPassword"
                            placeholder="Password"
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 rounded-xl
                                       bg-slate-100 dark:bg-slate-700
                                       text-slate-900 dark:text-white
                                       placeholder-slate-400 dark:placeholder-slate-400
                                       border border-slate-200 dark:border-slate-600
                                       focus:outline-none focus:ring-2 focus:ring-indigo-400
                                       transition-all pr-12"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>

                    {/* Forgot password */}
                    <div className="flex justify-end -mt-1">
                        <Link to="/forgot-password" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    <button
                        type="submit"
                        className="cursor-pointer w-full py-3 rounded-xl font-semibold shadow-lg
                                   hover:scale-105 active:scale-95 transition-transform duration-300
                                   bg-indigo-600 hover:bg-indigo-700
                                   text-white"
                    >
                        Login
                    </button>
                </form>

                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-5">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="font-semibold underline text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}
