import Image from "next/image";
import logo from "../../public/images/logo.png";
import { IoCartSharp} from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import Link from "next/link";

export function Header() {
  return (
    <header className="border-bottom w-full bg-white flex flex-col shadow sticky top-0 z-50">
      <div className="w-[80%] flex mx-auto justify-between items-center ">
        <Link href={"/"}>
          <Image width={100} height={70} src={logo} alt="logo.png" />
        </Link>

        {/* navigate */}
        <ul className="flex gap-2">
          <li className="px-3  py-1 text-center hover:bg-slate-200 rounded-md">
            <Link href={"/"}>Home</Link>
          </li>
          <li className="px-3  py-1 text-center hover:bg-slate-200 rounded-md">
            <Link href={"/products"}>Products</Link>
          </li>
          <li className="px-3  py-1 text-center hover:bg-slate-200 rounded-md">
            <Link href={"/users"}>Users</Link>
          </li>
          <li className="px-3  py-1 text-center hover:bg-slate-200 rounded-md">
            <Link href={"/about"}>About</Link>
          </li>
        </ul>
        {/* login & register */}
        <div className="flex gap-2">
          {/* icons */}
          <div className="flex gap-2 justify-center items-center pr-5">
            <Link href={"/favorite"}>
              <FaRegHeart className="text-xl" />
            </Link>
            <Link href={"/cart"}>
              <IoCartSharp className="text-2xl" />
            </Link>
          </div>
          <Link
            href={"/login"}
            className="px-3 py-1 bg-amber-300 hover:bg-amber-400 text-center rounded-lg"
          >
            Login
          </Link>
          <Link
            href={"/register"}
            className="px-3 py-1 bg-blue-300 hover:bg-blue-400 text-center rounded-lg"
          >
            Register
          </Link>
        </div>
      </div>
    </header>
  );
}
