import React from 'react';
import Header from '../Header';

interface Props {
  children?: React.ReactNode;
}

// TODO разобраться с тайпингом
export const colors = {
  accent: 'var(--accent-color)',
  accentHover: 'var(--accent-hover-color)',
  pageBg: 'var(--page-bg-color)',
  inputBg: 'var(--input-bg-color)',
  tileBg: 'var(--tile-bg-color)',
  fontPrimary: 'var(--font-primary-color)',
  fontSecondary: 'var(--font-secondary-color)',
  fontLight: 'var(--font-light-color)',
  fontMenu: 'var(--font-menu-color)',
  fontBtn: 'var(--font-btn-color)',
  btnPrimary: 'var(--btn-primary-color)',
  btnPrimaryHover: 'var(--btn-primary-hover-color)',
  btnSecondary: 'var(--btn-secondary-color)',
  positive: 'var(--positive-color)',
  positiveDark: 'var(--positive-dark-color)',
  negative: 'var(--negative-color)',
  negativeDark: 'var(--negative-dark-color)',
  neutral: 'var(--neutral-color)',
  neutralDark: 'var(--neutral-dark-color)',
  inactive: 'var(--inactive-color)',
  border: 'var(--border-color)',
  menuBtnHover: 'var(--menu-btn-hover-color)',
};

export const Layout = ({ children }: Props) => {
  if (typeof window !== 'undefined') {
    const appThemeLS = localStorage.getItem('appTheme');
    const html = document.querySelector('html');

    if (html && appThemeLS) {
      html.classList.remove('themeDefault');
      html.classList.add(appThemeLS);
    }
  }

  return (
    <>
      <Header />
      {children}
    </>
  );
};
