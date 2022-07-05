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
                            <Menu className={classes.menu}>
                                {session ?
                                    <>
                                        <div className={classes.welcome}>
                                            <span >Welcome <span>{session?.user?.email}</span>!</span>
                                        </div>
                                        <Menu.Item key="profile" className={classes.userMenuItem}>
                                            <AiOutlineUser />
                                            <Link href="/profile">
                                                Profile
                                            </Link>
                                        </Menu.Item>
                                        <Menu.Item key="settings" className={classes.userMenuItem}>
                                            <IoSettingsOutline />
                                            <span>
                                                Settings
                                            </span>
                                        </Menu.Item>
                                        <Menu.Item
                                                key="signOut"
                                                onClick={() => signOut({
                                                    callbackUrl: `${window.location.origin}/login`
                                                })}
                                                className={classes.userMenuItem}
                                            >
                                                <HiOutlineLogout/>
                                                <span>
                                                    Sign Out
                                                </span>
                                            </Menu.Item>
                                    </>
                                    :
                                    <Menu.Item
                                        key="login"
                                        className={classes.userMenuItem}
                                    >
                                        <HiOutlineLogout />
                                        <Link href="/login">
                                            Log In
                                        </Link>
                                    </Menu.Item>
                                }
                            </Menu>
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