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


const Header = () => {
  const { isExpanded, handleExpansion } = useExpansion();
  const { 
    isExpanded: signUp, 
    handleExpansion: handleSignUp } = useExpansion();
  const { 
    isExpanded: userExpanded, 
    handleExpansion: handleUserExpansion } = useExpansion();
  const { data, status } = useSession();
  
  return (
    <Wrapper>
      { signUp && <SignUpModal handleSignUp={ handleSignUp } /> }
      <Link href="/" passHref>
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
      { !data && <>
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
      { data &&  data.user && (
        <UserNavbar>
          <FirstName>
            Hello, 
            <span> { data.user.firstName }</span>
          </FirstName>
          <Relative>
            <button onClick={ handleUserExpansion }>
              <UserImage
                src={ data.user.image as string }
                alt={ `${ data.user.firstName } ${ data.user.lastName }` }  />
            </button>
            { userExpanded && (
              <UserDropdown>
                <Link 
                  href="/home"
                  passHref>
                    <UserProfile>
                      <UserImage
                        src={ data.user.image as string }
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
    </Wrapper>
  );
}


export default Header;