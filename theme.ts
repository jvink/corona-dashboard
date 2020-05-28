export interface ThemeProps {
  bg: string;
  fontColor: string;
  primaryColor: string;
  hintColor: string;
}

const light: ThemeProps = {
  bg: '#FFFFFF',
  fontColor: '#000000',
  primaryColor: '#0652DD',
  hintColor: '#757575',
};

const dark: ThemeProps = {
  bg: '#2C2F33',
  fontColor: '#FFFFFF',
  primaryColor: '#4E7DD4',
  hintColor: '#d9d9d9',
};

export const darkTheme = { ...dark };
export const lightTheme = { ...light };
