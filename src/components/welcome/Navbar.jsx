"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { BiFoodMenu } from "react-icons/bi";
import { useAuth } from "../../../firebase/auth";
import { useRouter } from "next/navigation";
import { useToastMessages } from "@/components/message/useToastMessages";

const Navbar = () => {
  const router = useRouter();
  const { Info } = useToastMessages();
  const { authUser, isLoading, signOut } = useAuth();

  useEffect(() => {
    if (!isLoading && !authUser) {
      router.push("/");
    }
  }, [isLoading, authUser]);

  return (
    <>
      <div className="bg-slate-600 flex justify-between items-center p-3 md:p-5 text-xl md:text-3xl sticky top-0">
        <h1 className="text-xl md:text-3xl text-white font-semibold flex items-center gap-2 md:gap-4">
          iPantry <BiFoodMenu className="text-xl md:text-3xl" />
        </h1>
        <nav>
          <ul className="flex items-center gap-5 md:gap-10 text-lg md:text-2xl text-white font-semibold">
            {!authUser && (
              <>
                <li>
                  <Link href="/register">Register</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        {authUser && (
          <button
            className="font-Pacifico text-base md:text-xl rounded-lg hover:text-white w-auto p-1 md:p-2 bg-[#7b9194]"
            onClick={() => {
              signOut();
              Info("Logged Out Successfully!");
            }}
          >
            Logout
          </button>
        )}
      </div>
    </>
  );
};

export default Navbar;