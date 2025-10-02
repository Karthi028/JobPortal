import { Link, useSearchParams } from "react-router"
import { Button } from "./ui/button"
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from "@clerk/clerk-react"
import { BriefcaseBusiness, Heart, PenBox } from "lucide-react"
import { useEffect, useState } from "react"

const Header = () => {

    const [showSignin, setshowSignin] = useState(false);
    const [search, setsearch] = useSearchParams();
    const{user} = useUser();

    useEffect(() => {
        if (search.get('sign-in')) {
            setshowSignin(true);
        }
    }, [search]);

    const Handlebg = (e) => {
        if (e.target === e.currentTarget) {
            setshowSignin(false);
            setsearch({});
        }
    }

    return <>
        <nav className="flex py-4 justify-between items-center">
            <Link to={'/'}>
                <img src="/Logoo.png" alt="Logo" className="h-25" />
            </Link>
            <div className="flex gap-2 justify-center">
                <SignedOut>
                    <Button variant={"outline"} onClick={() => setshowSignin(true)}>Login</Button>
                </SignedOut>
                <SignedIn>
                    {user?.unsafeMetadata?.role === 'recruiter' && <Link to={'/post-jobs'}>
                    <Button variant={"red"} className={"rounded-full ml-1"}>
                        <PenBox size={20} className="mr-1" />
                        Post a Job
                    </Button>
                    </Link>}
                    <UserButton appearance={{
                        elements: {
                            avatarBox: "!w-10 !h-10",
                        },
                    }}>
                        <UserButton.MenuItems>
                            <UserButton.Link
                                label="My Jobs"
                                labelIcon={<BriefcaseBusiness size={15} />}
                                href="/my-jobs"
                            />
                            <UserButton.Link
                                label="Saved Jobs"
                                labelIcon={<Heart size={15} />}
                                href="/saved-jobs"
                            />
                        </UserButton.MenuItems>

                    </UserButton>
                </SignedIn>
            </div>
        </nav>
        {showSignin && <div className="fixed inset-0 flex items-center justify-center backdrop-blur-xs z-4"
            onClick={Handlebg}>
            <SignIn
                signUpForceRedirectUrl="/onboarding"
                fallbackRedirectUrl="/onboarding" />
        </div>}
    </>
}

export default Header