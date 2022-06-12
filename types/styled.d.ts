import "styled-components";


declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
    darkBlue: string,
    darkOne: string,
    darkTwo: string,
    darkThree: string,
    greyOne: string,
    greyTwo: string,
    greyThree: string,
    greyFour: string,
    whiteOne: string,
    whiteTwo: string,
    whiteThree: string,
    red: string
    },
    fontSizes: {
      homeHero: number,
      headingLarge: number,
      headingMedium: number,
      headingSmall: number,
      headingVSmall: number,
      headingSmallest: number,
      buttonOne: number,
      linkOne: number,
      textLargest: number,
      textMedium: number,
      textSmall: number,
      default: number
    },
    breakpoints: {
      tablet: number,
      desktop: number
    }
  }
}