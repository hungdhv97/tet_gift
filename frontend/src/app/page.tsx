"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { FaLock, FaUser } from "react-icons/fa";
import { useLogin } from "@/queries/auth";

interface FormData {
    username: string;
    password: string;
    rememberMe: boolean;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
        rememberMe: false,
    });
    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const router = useRouter();
    const login = useLogin();

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (!formData.username || !formData.password) {
            setError("Vui lòng điền đầy đủ thông tin");
            return;
        }

        login.mutate(
            { username: formData.username, password: formData.password },
            {
                onSuccess: () => {
                    router.push("/dashboard");
                },
            },
        );
    };

    return (
        <div
            className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
                    <div className="max-w-md mx-auto">
                        <div className="divide-y divide-gray-200">
                            <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Chào mừng trở lại</h1>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaUser className="text-gray-400" />
                                        </div>
                                        <input
                                            type="text"
                                            name="username"
                                            placeholder="Tên người dùng hoặc Email"
                                            value={formData.username}
                                            onChange={handleInputChange}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="relative">
                                        <div
                                            className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <FaLock className="text-gray-400" />
                                        </div>
                                        <input
                                            type="password"
                                            name="password"
                                            placeholder="Mật khẩu"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        />
                                    </div>

                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            name="rememberMe"
                                            checked={formData.rememberMe}
                                            onChange={handleInputChange}
                                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                        />
                                        <label className="ml-2 block text-sm text-gray-700">Ghi nhớ</label>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                    >
                                        Đăng nhập
                                    </button>
                                </form>

                                {error && (
                                    <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                                        {error}
                                    </div>
                                )}

                                {success && (
                                    <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md">
                                        {success}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;