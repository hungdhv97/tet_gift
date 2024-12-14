"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { HiLogout } from "react-icons/hi";
import { useFetchUser } from "@/queries/user";

export function Header() {
    const { data: user } = useFetchUser();
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = () => {
        router.push("/");
    };

    const navLinks = [
        { href: "/introduction", text: "Giới thiệu" },
        { href: "/vessels", text: "Danh sách tàu thuyền" },
    ];

    return (
        <header className="bg-blue-800">
            <div className="container sm:px-3 relative flex items-center justify-between p-4">
                <div className="flex items-center">
                    <Link href="/dashboard" className="flex items-center shrink">
                        <button className="bg-blue-800 p-2 flex flex-col items-center">
                            <img
                                src="/images/logo.png"
                                className="h-12 sm:h-16"
                                alt="Logo"
                            />
                            <div className="text-sm sm:text-2xl text-center text-white">
                                BẢNG ĐIỀU KHIỂN QUẢN LÝ TÀU THUYỀN
                                <br />
                                BỘ ĐỘI BIÊN PHÒNG
                                <br />
                                TỈNH NGHỆ AN
                            </div>
                        </button>
                    </Link>
                </div>
                <div className="flex items-center space-x-4">
                    {user && (
                        <ul className="hidden md:flex space-x-4">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        href={link.href}
                                        className={`text-white md:text-xl ${
                                            pathname === link.href ? "font-bold" : ""
                                        }`}
                                    >
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                    {user && (
                        <div className="flex items-center">
                            <div className="relative group">
                                <img
                                    src="/images/logopn.png"
                                    alt="User settings"
                                    className="rounded-full w-10 h-10 cursor-pointer"
                                />
                                <div
                                    className="hidden group-hover:block absolute right-0 mt-2 w-48 bg-white rounded shadow-lg z-10">
                                    <div className="p-4">
                                        <span className="block text-lg">{user.username}</span>
                                        <span className="block truncate text-lg font-bold">{user.role}</span>
                                    </div>
                                    <hr className="my-1" />
                                    <button
                                        className="flex items-center w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100"
                                        onClick={handleLogout}
                                    >
                                        <HiLogout className="mr-2" />
                                        Đăng xuất
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                    {!user && (
                        <button className="text-white md:hidden">☰</button>
                    )}
                </div>
            </div>
        </header>
    );
}
