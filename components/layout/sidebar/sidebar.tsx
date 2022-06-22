import { useRouter } from "next/router";
import Link from "next/link";
import { 
  NavIconHolder,
  Navlink, 
  Navlist, 
  Wrapper } from "./sidebar.styled";
import NavHome from "@/public/icons/icon-nav-home.svg";
import NavLikes from "@/public/icons/icon-nav-likes.svg";
import NavWriters from "@/public/icons/icon-nav-writers.svg";
import NavNotifications from "@/public/icons/icon-nav-notification.svg";
import NavWritings from "@/public/icons/icon-nav-writings.svg";
import { SrOnly } from "@/styled/shared/helpers";
import { useSession } from "next-auth/react";


const Sidebar = () =>{
  const currentPath = useRouter().pathname.slice(1);
  const { data } = useSession();

  return (
    <Wrapper aria-label="primary">
      <Navlist>
        <Link 
          href={ data? "/home" : "/" }
          passHref>
            <Navlink aria-current={ currentPath==="home"? "page" : undefined }>
              <NavIconHolder>
                <NavHome aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Home</SrOnly>
            </Navlink>
        </Link>
        <Link 
          href="/likedArticles"
          passHref>
            <Navlink aria-current={ currentPath==="likedArticles"? "page" : undefined }>
              <NavIconHolder>
                <NavLikes aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Liked articles</SrOnly>
            </Navlink>
        </Link>
        <Link 
          href="/followings"
          passHref>
            <Navlink aria-current={ currentPath==="followings"? "page" : undefined }>
              <NavIconHolder>
                <NavWriters aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Followed writers</SrOnly>
            </Navlink>
        </Link>
        <Link 
          href="/notifications"
          passHref>
            <Navlink aria-current={ currentPath==="notifications"? "page" : undefined }>
              <NavIconHolder>
                <NavNotifications aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Notifications</SrOnly>
            </Navlink>
        </Link>
        { data?.user?.userType==="writer" && (
          <Link 
            href="/writings"
            passHref>
            <Navlink aria-current={ currentPath==="writings"? "page" : undefined }>
              <NavIconHolder>
                <NavWritings aria-hidden="true" />
              </NavIconHolder>
              <SrOnly>Writings</SrOnly>
            </Navlink>
        </Link>
        ) }
      </Navlist>
    </Wrapper>
  );
  }


export default Sidebar;