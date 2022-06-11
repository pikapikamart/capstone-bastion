import styled from "styled-components";
import { 
  rem,
  fluid,
  breakpoint } from "@/styled/functions";
import { BorderedButton } from "@/styled/shared/collection";


export const Wrapper = styled.div`
  background-color: rgba(0, 0, 0, .7);
  inset: 0;
  min-height: 100vh;
  overflow-y: scroll;
  padding: ${ rem(48) } ${ rem(16) };
  position: fixed;
  z-index: 50;
`

export const Form = styled.form`
  border-radius: ${ rem(4) };
  margin: auto;
  max-width: ${ rem(672) };
  min-height: ${ rem(592) };
  padding: ${ fluid(24, 6, 48) };

  ${ ({theme}) =>`
    background-color: ${ theme.colors.whiteOne };
    color: ${ theme.colors.darkTwo };
  ` }
`

export const TopControls = styled.div`
  display: flex;
  width: 100%;
`

export const TopControl = styled.button`
  border-radius: 50%;
  background: url("/icons/icon-previous.png") no-repeat center center;
  display: grid;
  height: ${ fluid(32, 5, 40) };
  place-content: center;
  width: ${ fluid(32, 5, 40) };

  &:last-of-type {
    background: url("/icons/icon-close.png") no-repeat center center;
    margin-left: auto;
  }
`

export const ContentContainer = styled.div`
  max-width: ${ rem(416) };
  padding-top: ${ fluid(40, 6, 48) };
`

export const Heading = styled.h2`
  font-size: ${ fluid(28, 6, 38) };
  font-family: 'Source Serif Pro', serif;
  font-weight: 400;
  margin-top: ${ rem(8) };
  text-align: center;

  ${ breakpoint("desktop", `
    margin-top: 0;
  `) }
`

export const UserFieldset = styled.fieldset`
  border: none;
  margin-top: ${ fluid(112, 20, 160) };
  padding-top: ${ rem(35) };
  position: relative;
  text-align: center;
`

export const UserLegend = styled.legend`
  padding: 0;
`

export const UserControlContainer = styled.div`
  margin: auto;
  position: relative;

  ${ BorderedButton } {
    &:first-of-type {
      margin-right: ${ rem(8) };
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
  min-height: ${ rem(35) };
  position: relative;
  width: 100%;  

  &:not(&:last-of-type) {
    margin-bottom: ${ fluid(32, 8, 40) };
  }
`

export const InputLabel = styled.label`
  color: ${ ({theme}) => theme.colors.darkTwo };
  inset: auto auto ${ rem(16) } 0;
  font-size: ${ fluid(14, 2, 15) };
  position: absolute;
`

export const Input = styled.input`
  border: none;
  border-bottom: .5px solid ${ ({theme}) => theme.colors.greyFour };
  padding-bottom: ${ rem(4) };

  &:focus-within {
    border-bottom-color: ${ ({theme}) => theme.colors.darkOne };
    outline: none;

    & + ${ InputLabel } {
      color: ${ ({theme}) => theme.colors.greyTwo };
      transform: translate(-5%, -50%) scale(.85);
    }
  }

  &:valid {

    & + ${ InputLabel } {
    color: ${ ({theme}) => theme.colors.greyTwo };
    transform: translate(-5%, -50%) scale(.85);
  }
`

export const ControlContainer = styled.div`
  margin-top: ${ rem(32) };
`