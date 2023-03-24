import classes from "./Navbar.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, Dropdown, Avatar } from "antd";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineLogout } from "react-icons/hi";
import { FaUserAlt } from "react-icons/fa";


const Navbar = () => {
  const { data: session } = useSession();

  const router = useRouter();
  let menuItems = [];

  session
    ? (menuItems = [
        {
          key: "welcome",
          label: (
            <div className={classes.welcome}>
              <span>
                Welcome <span>{session?.user?.email}</span>!
              </span>
            </div>
          ),
        },
        {
          key: "profile",
          className: `${classes.userMenuItem}`,
          label: (
            <>
              <AiOutlineUser />
              <Link href="/profile">Profile</Link>
            </>
          ),
        },
        // {
        //     key: "settings",
        //     className: `${classes.userMenuItem}`,
        //     label: (
        //         <>
        //             <IoSettingsOutline />
        //             <span>
        //                 Settings
        //             </span>
        //         </>
        //     )
        // },
        {
          key: "signOut",
          onClick: () =>
            signOut({
              callbackUrl: `${window.location.origin}/login`,
            }),
          className: `${classes.userMenuItem}`,
          label: (
            <>
              <HiOutlineLogout />
              <span>Sign Out</span>
            </>
          ),
        },
      ])
    : (menuItems = [
        {
          key: "login",
          className: `${classes.userMenuItem}`,
          label: (
            <>
              <HiOutlineLogout />
              <Link href="/login">Log In</Link>
            </>
          ),
        },
      ]);

  const stockMenuItems = [
    {
      key: "stocksList",
      className: `${classes.stockMenuItem}`,
      label: (
        <>
          <Link href="/stocks">Stocks List</Link>
        </>
      ),
    },
    // {
    //     key: "ipoCalendar",
    //     className: `${classes.stockMenuItem}`,
    //     label: (
    //         <>
    //         <Link href='/stocks/ipoCalendar'>
    //             IPO Calendar
    //         </Link>
    //         </>
    //     )
    // }
  ];

  return (
    <div className={classes.container}>
      <div className={classes.logo}>
        <Link href="/">Pyen</Link>
      </div>
      <div className={classes.mainContent}>
        <div className={classes.links}>
          <Dropdown
            overlay={
              <>
                <Menu className={classes.stocksMenu} items={stockMenuItems} />
              </>
            }
            placement="bottomRight"
            className={classes.stocksLink}
            arrow={true}
          >
            <span>Stocks</span>
          </Dropdown>
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
            {/* <Avatar size="large" icon={<FaUserAlt />} /> */}
            <FaUserAlt size={16}/>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
