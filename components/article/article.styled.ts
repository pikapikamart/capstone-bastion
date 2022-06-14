import styled from "styled-components";
import {
  rem,
  fluid,
  breakpoint
} from "@/styled/functions";


export const Wrapper = styled.main`
  padding: ${ fluid(40, 8.5, 80) } 0 ${ rem(132) };

  ${ breakpoint("desktop", `
    align-items: flex-start;
    display: flex;
  `) }
`

export const ArticleInformationContainer = styled.div`
  max-width: ${ rem(826) };
  margin-bottom: ${ rem(64) };
`

export const ImageHolder = styled.div`
  margin-bottom: ${ rem(24) };
`

export const ContentContainer = styled.div`
  padding: 0 ${ rem(16) };

  ${ breakpoint("tablet", `
    padding: 0 ${ rem(40) };
  `) }

  ${ breakpoint("desktop", `
    padding: 0;
  `) }
`

export const Title = styled.h1`
  line-height: 1.4;

  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ fluid(theme.fontSizes.headingMedium, 3.4, theme.fontSizes.headingLarge) };
  ` }
`

export const ArticleDate = styled.p`
  margin: ${ rem(16) } 0 ${ rem(40) };
  
  ${ ({theme}) => `
    color: ${ theme.colors.darkOne };
    font-size: ${ rem(theme.fontSizes.textMedium) };
    font-style: italic;
  ` }
`

export const TextsContainer = styled.div`
  border-bottom: 3px dashed rgba(0, 0, 0, .3);
`

export const Text = styled.p`
  font-weight: 300;
  font-family: 'Source Serif Pro', serif;
  font-size: ${ ({theme}) => fluid(theme.fontSizes.default, 2.4, theme.fontSizes.textLargest) };
  line-height: 2;
  margin-bottom: ${ fluid(40, 5, 44) };
  text-shadow: 0 0 #000000;
`

export const LikeButton = styled.button`
  height: ${ rem(28) };
  margin-top: ${ rem(24) };
  width: ${ rem(28) };

  svg {
    height: 100%;
    width: 100%;
  }
`

export const WritersContainer = styled.div`
  padding: 0 ${ rem(16) };

  ${ breakpoint("tablet", `
    padding: 0 ${ rem(40) };
  `) }

  ${ breakpoint("desktop", `
    margin-left: ${ rem(40) };
    padding: 0;
    position: sticky;
    top: ${ rem(80) };
  `) }
`