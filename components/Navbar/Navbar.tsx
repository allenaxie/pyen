import classes from './Navbar.module.scss';
import {Menu, Dropdown, Avatar} from 'antd';
import {AiOutlineUser} from 'react-icons/ai';
import {IoSettingsOutline} from 'react-icons/io5';
import {HiOutlineLogout} from 'react-icons/hi';

const Navbar = () => {
    return (
        <div className={classes.container}>
            <div
                className={classes.logo}
            >
                Surfboard Meetings
            </div>
            <div className={classes.userAvatar}>
                    <Dropdown
                        overlay={
                            <>
                                <Menu className={classes.menu}>
                                            <div className={classes.welcome}>
                                                <span >Welcome <span>Joe</span>!</span>
                                            </div>
                                            <Menu.Item key="profile" className={classes.userMenuItem}>
                                                <AiOutlineUser />
                                                    Profile
                                            </Menu.Item>
                                            <Menu.Item key="settings" className={classes.userMenuItem}>
                                                <IoSettingsOutline/>
                                                <span>
                                                    Settings
                                                </span>
                                            </Menu.Item>
                                            <Menu.Item
                                                key="signOut"
                                                className={classes.userMenuItem}
                                            >
                                                <HiOutlineLogout/>
                                                <span>
                                                    Sign Out
                                                </span>
                                            </Menu.Item>
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