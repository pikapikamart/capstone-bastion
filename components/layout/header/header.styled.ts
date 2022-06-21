import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";
import { BorderedButton } from "@/styled/shared/collection";


export const Wrapper = styled.header`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-height: ${ fluid(62, 10, 72) };
  padding: 0 ${ rem(16) };
  position: relative;

  ${ ({theme}) => `
    background-color: ${ theme.colors.whiteOne };
    border-bottom: 1px solid ${ theme.colors.darkBlue };
  ` }

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

export const NavbarContent = styled.div`
  align-items: center;
  display: none;
  flex-direction: column;
  inset: ${ rem(62) } auto auto 0;
  justify-content: flex-start;
  min-height: ${ rem(368) };
  padding-top: ${ rem(64) };
  position: absolute;
  width: 100%;
  z-index: 25;

  ${ ({theme}) => `
    background-color: ${ theme.colors.whiteThree };
    border-bottom: 1px solid ${ theme.colors.darkBlue };
  ` }

  ${ breakpoint("tablet", `
    background-color: transparent;
    border-bottom: none;
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

export const UserNavbar = styled.nav`
  align-items: center;
  display: flex;
`

export const FirstName = styled.p`
  margin-right: ${ rem(12) };

  ${ ({theme}) => `
    color: ${ theme.colors.darkThree };
    font-size: ${ fluid(theme.fontSizes.linkOne, 2, theme.fontSizes.default) };
  ` }

  span {
    font-weight: 600;
  }
`

export const UserImage = styled.img`
  box-shadow: 2px 2px 4px 0 rgba(0, 0, 0, .35);
  border-radius: 50%;
  height: ${ fluid(32, 7, 40) };
  width: ${ fluid(32, 7, 40) };
`

export const UserDropdown = styled.div`
  background-color: ${ ({theme}) => theme.colors.whiteOne };
  box-shadow: 0 0 2px 0 rgba(0, 0, 0, .7);
  border-radius: ${ rem(2) };
  inset: calc(100% + ${ rem(24) }) 0 auto auto;
  min-width: ${ rem(296) };
  position: absolute;

  &::before {
    content: "";
    background: url("/icons/dropdown-point.svg") no-repeat center center;
    height: ${ rem(22) };
    inset: ${ rem(2) } ${ rem(12) } auto auto;
    position: absolute;
    transform: translateY(-100%);
    width: ${ rem(32) };
  }

  &::after {
    content: "";
    background-color: inherit;
    height: ${ rem(10) };
    inset: 0 ${ rem(2) } auto auto;
    position: absolute;
    width: ${ rem(70) };
    z-index: 50;
  }
`

export const UserProfile = styled.a`
  align-items: center;
  border-bottom: 1px solid ${({theme}) => theme.colors.whiteFive};
  display: grid;
  gap: 0 ${ rem(12) }; 
  grid-template-columns: max-content auto;
  min-height: ${ rem(88) };
  padding-left: ${ rem(20) };
  width: 100%;
`

export const UserName = styled.p`
  color: ${ ({theme}) => theme.colors.darkOne };
  font-weight: 500;
  margin-bottom: ${ rem(4) };
`

export const Signout = styled.button`
  padding: ${ rem(16) } 0 ${ rem(16) } ${ rem(24) };
  text-align: left;
  width: 100%;

  ${ ({theme}) => `
    color: ${ theme.colors.greyOne };
    font-size: ${ rem(theme.fontSizes.default) };
  `}
`

export const PublishContainer = styled.div`
  align-items: center;
  display: flex;

  ${ BorderedButton } {
    margin-right: ${ rem(4) };
  }
`