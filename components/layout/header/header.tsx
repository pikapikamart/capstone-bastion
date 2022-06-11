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
  NavSocialMedia} from "./header.styled";
import { MainButton } from "@/styled/shared/collection";
import { SignUpModal } from "@/components/modal/signup";


const Header = () => {
  const { isExpanded, handleExpansion } = useExpansion();
  const { 
    isExpanded: signUp, 
    handleExpansion: handleSignUp } = useExpansion();

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
      <nav>
        <Hamburger 
          aria-expanded={ isExpanded }
          onClick={ handleExpansion }>
          <SrOnly>Toggle navbar menu</SrOnly>
        </Hamburger>
        <NavbarContent>
          <NavControls>
            <li>
              <button>Sign In</button>
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
    </Wrapper>
  );
}


export default Header;