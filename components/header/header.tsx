"use client";

import Image from "next/image";
import logo from "../../public/images/logo.png";
import { FaRegHeart, FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "../context/CartContext";

export function Header() {
  const { cartItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="border-b w-full bg-white shadow sticky top-0 z-50">
      <div className="w-[90%] mx-auto flex justify-between items-center py-3">
        {/* Logo */}
        <Link href={"/"}>
          <Image width={100} height={70} src={logo} alt="logo.png" />
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-2">
          <li className="px-3 py-1 hover:bg-slate-200 rounded-md">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="px-3 py-1 hover:bg-slate-200 rounded-md">
            <Link href={"/products"}>Products</Link>
          </li>
          <li className="px-3 py-1 hover:bg-slate-200 rounded-md">
            <Link href={"/users"}>Users</Link>
          </li>
          <li className="px-3 py-1 hover:bg-slate-200 rounded-md">
            <Link href={"/about"}>About</Link>
          </li>
        </ul>

        {/* Icons + Auth (Desktop) */}
        <div className="hidden md:flex gap-3 items-center">
          <Link href={"/favorite"}>
            <FaRegHeart className="text-xl" />
          </Link>

          <Link href={"/cart"}>
            <div className="relative">
              <ShoppingCart size={28} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {cartItems.length}
                </span>
              )}
            </div>
          </Link>

          <Link
            href={"/login"}
            className="px-3 py-1 bg-amber-300 hover:bg-amber-400 rounded-lg"
          >
            Login
          </Link>

          <Link
            href={"/register"}
            className="px-3 py-1 bg-blue-300 hover:bg-blue-400 rounded-lg"
          >
            Register
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <ul className="flex flex-col gap-2 p-4">
            <li>
              <Link href={"/"} onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link href={"/products"} onClick={() => setMenuOpen(false)}>
                Products
              </Link>
            </li>
            <li>
              <Link href={"/users"} onClick={() => setMenuOpen(false)}>
                Users
              </Link>
            </li>
            <li>
              <Link href={"/about"} onClick={() => setMenuOpen(false)}>
                About
              </Link>
            </li>
          </ul>

          <div className="flex gap-3 items-center p-4 border-t">
            <Link href={"/favorite"} onClick={() => setMenuOpen(false)}>
              <FaRegHeart className="text-xl" />
            </Link>

            <Link href={"/cart"} onClick={() => setMenuOpen(false)}>
              <div className="relative">
                <ShoppingCart size={28} />
                {cartItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                    {cartItems.length}
                  </span>
                )}
              </div>
            </Link>

            <Link
              href={"/login"}
              className="px-3 py-1 bg-amber-300 hover:bg-amber-400 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Login
            </Link>

            <Link
              href={"/register"}
              className="px-3 py-1 bg-blue-300 hover:bg-blue-400 rounded-lg"
              onClick={() => setMenuOpen(false)}
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}