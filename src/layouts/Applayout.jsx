import Header from "@/components/Header"
import { Outlet } from "react-router"

const Applayout = () => {
    return (
        <div>
            <div className="grid-background twinkle"></div>
            <main className="min-h-screen mx-auto px-3 sm:px-6 md:px-9 lg:px-13 xl:px-16 2xl:px-23">
                <Header />
                <Outlet />
            </main>
            <div className="text-center p-2 bg-violet-950 font-semibold">Jobs for Sale!! <span className="text-[8px]"> Just Kidding</span></div>

        </div>
    )
}

export default Applayout