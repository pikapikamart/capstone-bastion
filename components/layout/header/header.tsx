import { useExpansion } from "@/lib/hooks";
import { SrOnly } from "@/styled/shared/helpers";
import Link from "next/link";
import { 
  Wrapper,
  LogoLink,
  LogoImg,
  LogoText, 
  Navbar,
  Hamburger,
  NavbarContent,
  NavControls,
  NavSocialMedia} from "./header.styled";
import { MainButton } from "@/styled/shared/collection";


const Header = () => {
  const { isExpanded, handleExpansion } = useExpansion();

  return (
    <Wrapper>
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
      <Navbar>
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
              <MainButton>Get Started</MainButton>
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
      </Navbar>
    </Wrapper>
  );
}


export default Header;