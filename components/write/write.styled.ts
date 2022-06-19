import styled, { css } from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.form`
  margin: auto;
  max-width: ${ rem(826) };
`

export const TitleHolder = styled.div`
  align-items: stretch;
  display: grid;
  font-family: 'Source Serif Pro', serif;
  font-weight: 600;
  line-height: 1.4;
  margin-bottom: ${ rem(32) };
  max-width: 100%;
  width: 100%;

  &::after {
    content: attr(data-value) " ";
    font: inherit;
    grid-area: 2/1;
    line-height: inherit;
    padding: ${ rem(4) };
    visibility: hidden;
    white-space: pre-wrap;
  }

  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ fluid(theme.fontSizes.headingMedium, 3.5, theme.fontSizes.headingLarge) };
  ` }
`

interface TextareaProps {
  isShadowed?: boolean
}

export const Textarea = styled.textarea<TextareaProps>`
  grid-area: 2/1;
  padding: ${ rem(4) };
  resize: none;
  text-shadow: ${ ({isShadowed}) => isShadowed? "0 0 rgb(0, 0, 0  )" : "none" };
`

interface StoryAreaProps {
  isWriting: boolean
}

export const StoryArea = styled.div<StoryAreaProps>`
  font-family: 'Source Serif Pro', serif;
  font-weight: 300;
  font-size: ${ ({theme}) => fluid(theme.fontSizes.default, 3, theme.fontSizes.textLargest) };
  line-height: 2;
  outline: none;
  position: relative;
  text-shadow: 0 0 rgb(0, 0, 0);

  &:focus-within::before {
    visibility: hidden;
  }

  &::before {
    content: attr(data-placeholder);
    color: ${ ({theme}) => theme.colors.greyThree };
    position: absolute;
  }

  p {
    &:not(:last-of-type) {
      margin-bottom: ${ rem(32) };
    }
  }

  ${ ({isWriting}) => {
    switch(isWriting) {
      case true: return css`
        &::before {
          visibility: hidden;
        }
      `
    }
  } }
`