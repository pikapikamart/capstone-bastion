import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.header`
  align-items: center;
  border-bottom: 1px solid ${ ({theme}) => theme.colors.darkBlue };
  display: flex;
  justify-content: space-between;
  min-height: ${ fluid(62, 10, 72) };
  padding: 0 ${ rem(16) };
  position: relative;

  ${ breakpoint("tablet", `
    padding: 0 ${ fluid(40, 7.3, 96) };
  `) }
`

export const LogoLink = styled.a`
  align-items: center;
  display: flex;
`

export const LogoImg = styled.img`
  height: ${ fluid(40, 6.5, 56) };
  width: ${ fluid(40, 6.5, 56) };

  ${ breakpoint("tablet", `
    margin-right: ${ rem(8) };
  `) }
`

export const LogoText = styled.p`
  color: ${ ({theme}) => theme.colors.darkBlue };
  display: none;
  font-family: 'Source Serif Pro', serif;
  font-size: ${ fluid(18, 2, 20) };
  letter-spacing: -1px;
  line-height: 1;

  span {
    display: block;
  }

  ${ breakpoint("tablet", `
    display: block;
  `) }
`

export const Navbar = styled.nav`

`

export const NavbarContent = styled.div`
  align-items: center;
  background-color: ${ ({theme}) => theme.colors.whiteThree };
  display: none;
  flex-direction: column;
  inset: ${ rem(62) } auto auto 0;
  justify-content: flex-start;
  min-height: ${ rem(368) };
  padding-top: ${ rem(64) };
  position: absolute;
  width: 100%;

  ${ breakpoint("tablet", `
    background-color: transparent;
    display: flex;
    flex-direction: row-reverse;
    min-height: revert;
    padding-top: 0;
    position: static;
  `) }
`

export const Hamburger = styled.button`
  background: url("/icons/hamburger.png") no-repeat center center;
  background-size: 100% 100%;
  height: ${ rem(14) };
  width: ${ rem(22) };

  &[aria-expanded="true"] {
    background-image: url("/icons/hamburger-close.png");
    background-size: ${ rem(16) } ${ rem(16) };

    & + ${ NavbarContent } {
      display: flex;
    }
  }

  ${ breakpoint("tablet", `
    display: none;
  `) }
`

export const NavControls = styled.ul`
  align-items: center;
  color: ${ ({theme}) => theme.colors.darkOne };
  display: flex;
  flex-direction: column;
  margin-bottom: ${ rem(56) };
  position: relative;

  &::before {
    content: "";
    background-color: ${ ({theme}) => theme.colors.darkBlue };
    bottom: ${ rem(-32) };
    height: 1px;
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
    width: ${ rem(208) };
  }

  li:first-of-type {
    margin-bottom: ${ rem(24) };
  }

  ${ breakpoint("tablet", `
    flex-direction: row;
    margin: 0 0 0 ${ rem(56) };

    li:first-of-type {
      margin: 0 ${ rem(24) } 0;
    }

    &::before {
      height: ${ rem(32) };
      inset: 50% 0 0 ${ rem(-32) };
      left: ${ rem(-32) };
      top: 50%;
      transform: translate(0, -50%);
      width: 1px;
    }
  `) }
`

export const NavSocialMedia = styled.a`
  display: block;
`