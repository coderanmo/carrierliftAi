import { useState } from "react";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function Register() {
    const [formData, setFormData] = useState({
        userName: "",
        userEmail: "",
        userPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 bg-slate-100 dark:bg-slate-900 transition-colors duration-300">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <h2 className="text-3xl font-bold text-slate-800 dark:text-white text-center mb-6">Create Account</h2>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">Username</label>
                        <input type="text" name="userName" placeholder="Enter username" onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                            Email Address
                        </label>
                        <input type="email" name="userEmail" placeholder="Enter email" onChange={handleChange} required
                            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1">
                            Password
                        </label>
                        <div className="relative">
                            <input type={showPassword ? "text" : "password"} name="userPassword" placeholder="Enter password" onChange={handleChange} required
                                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-400 border border-slate-200 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all pr-12"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    <button type="submit" className="cursor-pointer w-full py-3 rounded-xl font-semibold shadow-lg hover:scale-105 active:scale-95 transition-transform duration-300 bg-indigo-600 hover:bg-indigo-700 text-white">
                        Register
                    </button>
                </form>

                <p className="text-sm text-slate-500 dark:text-slate-400 text-center mt-5">
                    Already have an account?{" "}
                    <Link to="/login" className="font-semibold underline text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 transition-colors">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}
