/* eslint-disable no-unused-vars */
import { createTheme, responsiveFontSizes } from '@mui/material'

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    surface: {
      0: string
      1: string
      2: string
      3: string
      4: string
      6: string
      8: string
      12: string
      16: string
      24: string
    };
  }
  // allow configuration using `createTheme`
  interface PaletteOptions {
    surface?: {
      0?: string
      1?: string
      2?: string
      3?: string
      4?: string
      5?: string
      6?: string
      8?: string
      12?: string
      16?: string
      24?: string
    };
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    innerShadows: {
      0: string
      1: string
      2: string
      3: string
      4: string
      5: string
      6: string
      7: string
      8: string
      9: string
      10: string
      11: string
      12: string
      13: string
      14: string
      15: string
      16: string
      17: string
      18: string
      19: string
      20: string
      21: string
      22: string
      23: string
      24: string
    }
  }

  interface ThemeOptions {
    innerShadows?: {
      0: string
      1: string
      2: string
      3: string
      4: string
      5: string
      6: string
      7: string
      8: string
      9: string
      10: string
      11: string
      12: string
      13: string
      14: string
      15: string
      16: string
      17: string
      18: string
      19: string
      20: string
      21: string
      22: string
      23: string
      24: string
    }
  }
}

const darkTheme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          borderWidth: '2px',
          color: 'white',
          ':hover': {
            borderWidth: '2px'
          }
        }
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: '0.8em'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none'
        }
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: '1.1em'
        }
      }
    }
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#0D1321',
      paper: '#141D33'
    },
    primary: {
      main: '#06BDE1'
    },
    secondary: {
      main: '#FF4D00'
    },
    surface: {
      0: '#141D33',
      1: '#20293D',
      2: '#252D41',
      3: '#262F43',
      4: '#293145',
      6: '#2E3649',
      8: '#31384C',
      12: '#353D50',
      16: '#373F51',
      24: '#3A4154'
    }
  },
  mixins: {
    toolbar: {
      height: '64px',
      '@media (min-width:0px) and (orientation:landscape)': {
        height: '64px'
      },
      '@media (min-width:600px)': {
        height: '64px'
      }
    }
  },
  transitions: {
    duration: {
      shortest: 300,
      shorter: 200,
      short: 300,
      standard: 300,
      complex: 300,
      enteringScreen: 500,
      leavingScreen: 500
    }
  },
  innerShadows: {
    0: 'none',
    1: 'inset 0px 2px 1px -1px rgba(0,0,0,0.2), inset 0px 1px 1px 0px rgba(0,0,0,0.14), inset 0px 1px 3px 0px rgba(0,0,0,0.12)',
    2: 'inset 0px 3px 1px -2px rgba(0,0,0,0.2), inset 0px 2px 2px 0px rgba(0,0,0,0.14), inset 0px 1px 5px 0px rgba(0,0,0,0.12)',
    3: 'inset 0px 3px 3px -2px rgba(0,0,0,0.2), inset 0px 3px 4px 0px rgba(0,0,0,0.14), inset 0px 1px 8px 0px rgba(0,0,0,0.12)',
    4: 'inset 0px 2px 4px -1px rgba(0,0,0,0.2), inset 0px 4px 5px 0px rgba(0,0,0,0.14), inset 0px 1px 10px 0px rgba(0,0,0,0.12)',
    5: 'inset 0px 3px 5px -1px rgba(0,0,0,0.2), inset 0px 5px 8px 0px rgba(0,0,0,0.14), inset 0px 1px 14px 0px rgba(0,0,0,0.12)',
    6: 'inset 0px 3px 5px -1px rgba(0,0,0,0.2), inset 0px 6px 10px 0px rgba(0,0,0,0.14), inset 0px 1px 18px 0px rgba(0,0,0,0.12)',
    7: 'inset 0px 4px 5px -2px rgba(0,0,0,0.2), inset 0px 7px 10px 1px rgba(0,0,0,0.14), inset 0px 2px 16px 1px rgba(0,0,0,0.12)',
    8: 'inset 0px 5px 5px -3px rgba(0,0,0,0.2), inset 0px 8px 10px 1px rgba(0,0,0,0.14), inset 0px 3px 14px 2px rgba(0,0,0,0.12)',
    9: 'inset 0px 5px 6px -3px rgba(0,0,0,0.2), inset 0px 9px 12px 1px rgba(0,0,0,0.14), inset 0px 3px 16px 2px rgba(0,0,0,0.12)',
    10: 'inset 0px 6px 6px -3px rgba(0,0,0,0.2), inset 0px 10px 14px 1px rgba(0,0,0,0.14), inset 0px 4px 18px 3px rgba(0,0,0,0.12)',
    11: 'inset 0px 6px 7px -4px rgba(0,0,0,0.2), inset 0px 11px 15px 1px rgba(0,0,0,0.14), inset 0px 4px 20px 3px rgba(0,0,0,0.12)',
    12: 'inset 0px 7px 8px -4px rgba(0,0,0,0.2), inset 0px 12px 17px 2px rgba(0,0,0,0.14), inset 0px 5px 22px 4px rgba(0,0,0,0.12)',
    13: 'inset 0px 7px 8px -4px rgba(0,0,0,0.2), inset 0px 13px 19px 2px rgba(0,0,0,0.14), inset 0px 5px 24px 4px rgba(0,0,0,0.12)',
    14: 'inset 0px 7px 9px -4px rgba(0,0,0,0.2), inset 0px 14px 21px 2px rgba(0,0,0,0.14), inset 0px 5px 26px 4px rgba(0,0,0,0.12)',
    15: 'inset 0px 8px 9px -5px rgba(0,0,0,0.2), inset 0px 15px 22px 2px rgba(0,0,0,0.14), inset 0px 6px 28px 5px rgba(0,0,0,0.12)',
    16: 'inset 0px 8px 10px -5px rgba(0,0,0,0.2), inset 0px 16px 24px 2px rgba(0,0,0,0.14), inset 0px 6px 30px 5px rgba(0,0,0,0.12)',
    17: 'inset 0px 8px 11px -5px rgba(0,0,0,0.2), inset 0px 17px 26px 2px rgba(0,0,0,0.14), inset 0px 6px 32px 5px rgba(0,0,0,0.12)',
    18: 'inset 0px 9px 11px -5px rgba(0,0,0,0.2), inset 0px 18px 28px 2px rgba(0,0,0,0.14), inset 0px 7px 34px 6px rgba(0,0,0,0.12)',
    19: 'inset 0px 9px 12px -6px rgba(0,0,0,0.2), inset 0px 19px 29px 2px rgba(0,0,0,0.14), inset 0px 7px 36px 6px rgba(0,0,0,0.12)',
    20: 'inset 0px 10px 13px -6px rgba(0,0,0,0.2), inset 0px 20px 31px 3px rgba(0,0,0,0.14), inset 0px 8px 38px 7px rgba(0,0,0,0.12)',
    21: 'inset 0px 10px 13px -6px rgba(0,0,0,0.2), inset 0px 21px 33px 3px rgba(0,0,0,0.14), inset 0px 8px 40px 7px rgba(0,0,0,0.12)',
    22: 'inset 0px 10px 14px -6px rgba(0,0,0,0.2), inset 0px 22px 35px 3px rgba(0,0,0,0.14), inset 0px 8px 42px 7px rgba(0,0,0,0.12)',
    23: 'inset 0px 11px 14px -7px rgba(0,0,0,0.2), inset 0px 23px 36px 3px rgba(0,0,0,0.14), inset 0px 9px 44px 8px rgba(0,0,0,0.12)',
    24: 'inset 0px 11px 15px -7px rgba(0,0,0,0.2), inset 0px 24px 38px 3px rgba(0,0,0,0.14), inset 0px 9px 46px 8px rgba(0,0,0,0.12)'
  }
})

export default responsiveFontSizes(darkTheme, {
  factor: 3
})
