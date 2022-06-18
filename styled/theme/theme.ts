

interface Theme {
  colors: {
    [ key: string ]: string
  },
  fontSizes: {
    [ key: string ]: number
  },
  breakpoints: {
    [ key: string ]: number
  }
}

const theme: Theme = {
  colors: {
    darkBlue: "#00243A",
    darkOne: "#000000",
    darkTwo: "#1D1D1D",
    darkThree: "#292929",
    darkFour: "#343434",
    greyOne: "#4B4B4B",
    greyTwo: "#707070",
    greyThree: "#959595",
    greyFour: "#BFBFBF",
    whiteOne: "#FFFFFF",
    whiteTwo: "#FBFBFB",
    whiteThree: "#F6F6F4",
    whiteFive: "#CCCCCC",
    red: "#FF0000"
  },
  fontSizes: {
    homeHero: 70,
    headingLarge: 32,
    headingMedium: 22,
    headingSmall: 20,
    headingVSmall: 15,
    headingSmallest: 14,
    buttonOne: 16,
    linkOne: 14,
    textLargest: 22,
    textMedium: 15,
    textSmall: 13,
    default: 16
  },
  breakpoints: {
    tablet: 768,
    desktop: 1000
  }
}


export default theme;