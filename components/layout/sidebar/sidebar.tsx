import { 
  NavIconHolder,
  Navlink, 
  Navlist, 
  Wrapper } from "./sidebar.styled";
import NavHome from "@/public/icons/icon-nav-home.svg";
import NavLikes from "@/public/icons/icon-nav-likes.svg";
import NavWriters from "@/public/icons/icon-nav-writers.svg";
import NavNotifications from "@/public/icons/icon-nav-notification.svg";
import Link from "next/link";
import { SrOnly } from "@/styled/shared/helpers";



const Sidebar = () =>{

  return (
    <Wrapper aria-label="primary">
      <Navlist>
        <Link 
          href="/"
          passHref>
            <Navlink>
              <NavIconHolder>
                <NavHome aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Home</SrOnly>
            </Navlink>
        </Link>
        <Link 
          href="/likedArticles"
          passHref>
            <Navlink>
              <NavIconHolder>
                <NavLikes aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Liked articles</SrOnly>
            </Navlink>
        </Link>
        <Link 
          href="/followings"
          passHref>
            <Navlink>
              <NavIconHolder>
                <NavWriters aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Followed writers</SrOnly>
            </Navlink>
        </Link>
        <Link 
          href="/notifications"
          passHref>
            <Navlink>
              <NavIconHolder>
                <NavNotifications aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Notifications</SrOnly>
            </Navlink>
        </Link>
      </Navlist>
    </Wrapper>
  );
  }


export default Sidebar;