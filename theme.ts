export interface ThemeProps {
  bg: string;
  fontColor: string;
  primaryColor: string;
  hintColor: string;
  totaalAantal: string;
  ziekenhuisopnameAantal: string;
  overledenAantal: string;
}

const light: ThemeProps = {
  bg: '#FFFFFF',
  fontColor: '#000000',
  primaryColor: '#0652DD',
  hintColor: '#757575',
  // totaalAantal: '#3B5FA3',
  // ziekenhuisopnameAantal: '#006E25',
  // overledenAantal: '#943918',
  totaalAantal: '#4E7DD4',
  ziekenhuisopnameAantal: '#F79F1F',
  overledenAantal: '#EA2027',
};

const dark: ThemeProps = {
  bg: '#2C2F33',
  fontColor: '#FFFFFF',
  primaryColor: '#4E7DD4',
  hintColor: '#d9d9d9',
  totaalAantal: '#4E7DD4',
  ziekenhuisopnameAantal: '#F79F1F',
  overledenAantal: '#EA2027',
};

export const darkTheme = { ...dark };
export const lightTheme = { ...light };
