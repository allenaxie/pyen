import classes from './Navbar.module.scss';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { AiOutlineUser } from 'react-icons/ai';
import { IoSettingsOutline } from 'react-icons/io5';
import { HiOutlineLogout } from 'react-icons/hi';
import { Menu, Dropdown, Avatar } from 'antd';

const Navbar = () => {
    const { data: session } = useSession();

    const router = useRouter();
    let menuItems = [];

    session ?
        menuItems = [
            {
                key: "welcome",
                label: (
                    <div className={classes.welcome}>
                        <span >Welcome <span>{session?.user?.email}</span>!</span>
                    </div>
                ),
            },
            {
                key: "profile",
                className: `${classes.userMenuItem}`,
                label: (
                    <>
                        <AiOutlineUser />
                        <Link href="/profile">
                            Profile
                        </Link>
                    </>
                ),
            },
            {
                key: "settings",
                className: `${classes.userMenuItem}`,
                label: (
                    <>
                        <IoSettingsOutline />
                        <span>
                            Settings
                        </span>
                    </>
                )
            },
            {
                key: "signOut",
                onClick: () => signOut({
                    callbackUrl: `${window.location.origin}/login`
                }),
                className: `${classes.userMenuItem}`,
                label: (
                    <>
                        <HiOutlineLogout />
                        <span>
                            Sign Out
                        </span>
                    </>
                )
            }
        ]
        :
        menuItems = [
            {
                key: "login",
                className: `${classes.userMenuItem}`,
                label: (
                    <>
                        <HiOutlineLogout />
                        <Link href="/login">
                            Log In
                        </Link>
                    </>
                )
            }
        ]

    return (
        <div className={classes.container}>
            <div
                className={classes.logo}
            >
                <Link href="/">
                    Pyen
                </Link>
            </div>
            <div className={classes.userAvatar}>
                <Dropdown
                    overlay={
                        <>
                            <Menu className={classes.menu} items={menuItems} />
                        </>
                    }
                    placement="bottomRight"
                    arrow={true}
                >
                    <Avatar src="https://joeschmoe.io/api/v1/random" />
                </Dropdown>
            </div>
        </div>
    )
}

export default Navbar;