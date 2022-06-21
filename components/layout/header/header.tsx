import Link from "next/link";
import { useExpansion } from "@/lib/hooks";
import { SrOnly } from "@/styled/shared/helpers";
import { 
  Wrapper,
  LogoLink,
  LogoImg,
  LogoText, 
  Hamburger,
  NavbarContent,
  NavControls,
  NavSocialMedia,
  UserNavbar,
  FirstName,
  UserImage,
  UserDropdown,
  UserProfile,
  UserName,
  Signout} from "./header.styled";
import { MainButton, Relative, TextMedium } from "@/styled/shared/collection";
import { SignUpModal } from "@/components/modal/signup";
import { 
  signIn, 
  signOut,
  useSession } from "next-auth/react";
import { useTrackedState } from "@/store/tracked";
import { useRouter } from "next/router";
import { PublishControls } from "./publish";
import { useEffect } from "react";


const Header = () => {
  const { isExpanded, handleExpansion } = useExpansion();
  const { 
    isExpanded: signUp, 
    handleExpansion: handleSignUp } = useExpansion();
  const { 
    isExpanded: userExpanded, 
    handleExpansion: handleUserExpansion } = useExpansion();
  const { data } = useSession();
  const { writing } = useTrackedState();
  const currentPath = useRouter().pathname;

  useEffect(() =>{
    if ( signUp ) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [ signUp ])

  return (
    <Wrapper>
      { signUp && <SignUpModal handleSignUp={ handleSignUp } /> }
      <Link 
        href={ data? "/home" : "/" }
        passHref>
        <LogoLink>
          <LogoImg 
            src="/icons/logo.png"
            alt="The Bastion" />
            <LogoText aria-hidden="true">
              <span>The Bastion</span>
              <span>Group of Publications</span>
            </LogoText>
        </LogoLink>
      </Link>
      { !data && currentPath!=="/write" && <>
        <nav>
          <Hamburger 
            aria-expanded={ isExpanded }
            onClick={ handleExpansion }>
            <SrOnly>Toggle navbar menu</SrOnly>
          </Hamburger>
          <NavbarContent>
            <NavControls>
              <li>
                <button onClick={ () => signIn(undefined, { callbackUrl: "/home" }) }>Sign In</button>
              </li>
              <li>
                <MainButton onClick={ handleSignUp }>Get Started</MainButton>
              </li>
            </NavControls>
            <div>
              <NavSocialMedia href="#">
                <SrOnly>Facebook</SrOnly>
                <img 
                  src="/icons/facebook.svg" 
                  alt="" />
              </NavSocialMedia>
            </div>
          </NavbarContent>
        </nav>
      </> 
      }
      { data && data.user && currentPath!=="/write" && (
        <UserNavbar>
          <FirstName>
            Hello, 
            <span> { data.user.firstName }</span>
          </FirstName>
          <Relative>
            <button onClick={ handleUserExpansion }>
              <UserImage
                src={  data.user.image? data.user.image : "/icons/default-avatar.png" }
                alt={ `${ data.user.firstName } ${ data.user.lastName }` }  />
            </button>
            { userExpanded && (
              <UserDropdown>
                <Link 
                  href={`/writer/${ data.user.username }`}
                  passHref>
                    <UserProfile>
                      <UserImage
                        src={ data.user.image? data.user.image : "/icons/default-avatar.png" }
                        alt={ `${ data.user.firstName } ${ data.user.lastName }` }  />
                      <div>
                        <UserName>{ `${ data.user.firstName }  ${ data.user.lastName }` }</UserName>
                        <TextMedium color="greyTwo">See your profile</TextMedium>
                      </div>
                    </UserProfile>
                </Link>
                <Signout
                 onClick={ () => signOut({ callbackUrl: "/" }) } >
                  Sign out
                </Signout>
              </UserDropdown>
            ) } 
          </Relative>
        </UserNavbar>
      ) }
      { currentPath=="/write" && <PublishControls />}
    </Wrapper>
  );
}


export default Header;