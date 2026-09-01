import { Outlet } from "react-router";
//import type { Route } from "./+types/home";
import type { Route } from "./+types/healthInsurance";

import Footer from "~/components/common/footer";
import Navbar from "~/components/common/navBar";
import TopBar from "~/components/common/topBar";



export function meta({}: Route.MetaArgs) {
  return [
    { title: "Pro Edu | Javir" },
    { name: "description", content: "Welcome to React Router!" },
  ];
}

export default function MainLayOut() {
    return (
       <div className="flex flex-col items-center mx-auto min-h-screen">
           <TopBar/>
           <Navbar/>
            <main className="flex-1 w-full">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
}
