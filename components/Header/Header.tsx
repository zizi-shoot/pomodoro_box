import React from 'react';
import Link from 'next/link';
import styles from './header.module.css';

export const Header = () => (
  <header className={styles.container}>
    <svg width="241" height="40" viewBox="0 0 241 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <title>Логотип Pomodoro box</title>
      <path d="M65.2249 16.16C66.4569 16.16 67.5609 16.432 68.5369 16.976C69.5129 17.52 70.2729 18.28 70.8169 19.256C71.3769 20.232 71.6569 21.36 71.6569 22.64C71.6569 23.92 71.3769 25.056 70.8169 26.048C70.2729 27.024 69.5129 27.784 68.5369 28.328C67.5609 28.872 66.4569 29.144 65.2249 29.144C64.3129 29.144 63.4729 28.968 62.7049 28.616C61.9529 28.264 61.3129 27.752 60.7849 27.08V33.656H58.4809V16.28H60.6889V18.296C61.2009 17.592 61.8489 17.064 62.6329 16.712C63.4169 16.344 64.2809 16.16 65.2249 16.16ZM65.0329 27.128C65.8489 27.128 66.5769 26.944 67.2169 26.576C67.8729 26.192 68.3849 25.664 68.7529 24.992C69.1369 24.304 69.3289 23.52 69.3289 22.64C69.3289 21.76 69.1369 20.984 68.7529 20.312C68.3849 19.624 67.8729 19.096 67.2169 18.728C66.5769 18.36 65.8489 18.176 65.0329 18.176C64.2329 18.176 63.5049 18.368 62.8489 18.752C62.2089 19.12 61.6969 19.64 61.3129 20.312C60.9449 20.984 60.7609 21.76 60.7609 22.64C60.7609 23.52 60.9449 24.304 61.3129 24.992C61.6809 25.664 62.1929 26.192 62.8489 26.576C63.5049 26.944 64.2329 27.128 65.0329 27.128ZM80.2883 29.144C79.0243 29.144 77.8883 28.864 76.8803 28.304C75.8723 27.744 75.0803 26.976 74.5043 26C73.9443 25.008 73.6643 23.888 73.6643 22.64C73.6643 21.392 73.9443 20.28 74.5043 19.304C75.0803 18.312 75.8723 17.544 76.8803 17C77.8883 16.44 79.0243 16.16 80.2883 16.16C81.5523 16.16 82.6803 16.44 83.6723 17C84.6803 17.544 85.4643 18.312 86.0243 19.304C86.6003 20.28 86.8883 21.392 86.8883 22.64C86.8883 23.888 86.6003 25.008 86.0243 26C85.4643 26.976 84.6803 27.744 83.6723 28.304C82.6803 28.864 81.5523 29.144 80.2883 29.144ZM80.2883 27.128C81.1043 27.128 81.8323 26.944 82.4723 26.576C83.1283 26.192 83.6403 25.664 84.0083 24.992C84.3763 24.304 84.5603 23.52 84.5603 22.64C84.5603 21.76 84.3763 20.984 84.0083 20.312C83.6403 19.624 83.1283 19.096 82.4723 18.728C81.8323 18.36 81.1043 18.176 80.2883 18.176C79.4723 18.176 78.7363 18.36 78.0803 18.728C77.4403 19.096 76.9283 19.624 76.5443 20.312C76.1763 20.984 75.9923 21.76 75.9923 22.64C75.9923 23.52 76.1763 24.304 76.5443 24.992C76.9283 25.664 77.4403 26.192 78.0803 26.576C78.7363 26.944 79.4723 27.128 80.2883 27.128ZM105.987 16.16C107.587 16.16 108.851 16.624 109.779 17.552C110.723 18.48 111.195 19.856 111.195 21.68V29H108.891V21.944C108.891 20.712 108.603 19.784 108.027 19.16C107.467 18.536 106.659 18.224 105.603 18.224C104.435 18.224 103.507 18.592 102.819 19.328C102.131 20.048 101.787 21.088 101.787 22.448V29H99.4826V21.944C99.4826 20.712 99.1946 19.784 98.6186 19.16C98.0586 18.536 97.2506 18.224 96.1946 18.224C95.0266 18.224 94.0986 18.592 93.4106 19.328C92.7226 20.048 92.3786 21.088 92.3786 22.448V29H90.0746V16.28H92.2826V18.176C92.7466 17.52 93.3546 17.024 94.1066 16.688C94.8586 16.336 95.7146 16.16 96.6746 16.16C97.6666 16.16 98.5466 16.36 99.3146 16.76C100.083 17.16 100.675 17.744 101.091 18.512C101.571 17.776 102.235 17.2 103.083 16.784C103.947 16.368 104.915 16.16 105.987 16.16ZM120.952 29.144C119.688 29.144 118.552 28.864 117.544 28.304C116.536 27.744 115.744 26.976 115.168 26C114.608 25.008 114.328 23.888 114.328 22.64C114.328 21.392 114.608 20.28 115.168 19.304C115.744 18.312 116.536 17.544 117.544 17C118.552 16.44 119.688 16.16 120.952 16.16C122.216 16.16 123.344 16.44 124.336 17C125.344 17.544 126.128 18.312 126.688 19.304C127.264 20.28 127.552 21.392 127.552 22.64C127.552 23.888 127.264 25.008 126.688 26C126.128 26.976 125.344 27.744 124.336 28.304C123.344 28.864 122.216 29.144 120.952 29.144ZM120.952 27.128C121.768 27.128 122.496 26.944 123.136 26.576C123.792 26.192 124.304 25.664 124.672 24.992C125.04 24.304 125.224 23.52 125.224 22.64C125.224 21.76 125.04 20.984 124.672 20.312C124.304 19.624 123.792 19.096 123.136 18.728C122.496 18.36 121.768 18.176 120.952 18.176C120.136 18.176 119.4 18.36 118.744 18.728C118.104 19.096 117.592 19.624 117.208 20.312C116.84 20.984 116.656 21.76 116.656 22.64C116.656 23.52 116.84 24.304 117.208 24.992C117.592 25.664 118.104 26.192 118.744 26.576C119.4 26.944 120.136 27.128 120.952 27.128ZM142.739 11.192V29H140.531V26.984C140.019 27.688 139.371 28.224 138.587 28.592C137.803 28.96 136.939 29.144 135.995 29.144C134.763 29.144 133.659 28.872 132.683 28.328C131.707 27.784 130.939 27.024 130.379 26.048C129.835 25.056 129.563 23.92 129.563 22.64C129.563 21.36 129.835 20.232 130.379 19.256C130.939 18.28 131.707 17.52 132.683 16.976C133.659 16.432 134.763 16.16 135.995 16.16C136.907 16.16 137.747 16.336 138.515 16.688C139.283 17.024 139.923 17.528 140.435 18.2V11.192H142.739ZM136.187 27.128C136.987 27.128 137.715 26.944 138.371 26.576C139.027 26.192 139.539 25.664 139.907 24.992C140.275 24.304 140.459 23.52 140.459 22.64C140.459 21.76 140.275 20.984 139.907 20.312C139.539 19.624 139.027 19.096 138.371 18.728C137.715 18.36 136.987 18.176 136.187 18.176C135.371 18.176 134.635 18.36 133.979 18.728C133.339 19.096 132.827 19.624 132.443 20.312C132.075 20.984 131.891 21.76 131.891 22.64C131.891 23.52 132.075 24.304 132.443 24.992C132.827 25.664 133.339 26.192 133.979 26.576C134.635 26.944 135.371 27.128 136.187 27.128ZM152.546 29.144C151.282 29.144 150.146 28.864 149.138 28.304C148.13 27.744 147.338 26.976 146.762 26C146.202 25.008 145.922 23.888 145.922 22.64C145.922 21.392 146.202 20.28 146.762 19.304C147.338 18.312 148.13 17.544 149.138 17C150.146 16.44 151.282 16.16 152.546 16.16C153.81 16.16 154.938 16.44 155.93 17C156.938 17.544 157.722 18.312 158.282 19.304C158.858 20.28 159.146 21.392 159.146 22.64C159.146 23.888 158.858 25.008 158.282 26C157.722 26.976 156.938 27.744 155.93 28.304C154.938 28.864 153.81 29.144 152.546 29.144ZM152.546 27.128C153.362 27.128 154.09 26.944 154.73 26.576C155.386 26.192 155.898 25.664 156.266 24.992C156.634 24.304 156.818 23.52 156.818 22.64C156.818 21.76 156.634 20.984 156.266 20.312C155.898 19.624 155.386 19.096 154.73 18.728C154.09 18.36 153.362 18.176 152.546 18.176C151.73 18.176 150.994 18.36 150.338 18.728C149.698 19.096 149.186 19.624 148.802 20.312C148.434 20.984 148.25 21.76 148.25 22.64C148.25 23.52 148.434 24.304 148.802 24.992C149.186 25.664 149.698 26.192 150.338 26.576C150.994 26.944 151.73 27.128 152.546 27.128ZM164.54 18.416C164.94 17.68 165.532 17.12 166.316 16.736C167.1 16.352 168.052 16.16 169.172 16.16V18.392C169.044 18.376 168.868 18.368 168.644 18.368C167.396 18.368 166.412 18.744 165.692 19.496C164.988 20.232 164.636 21.288 164.636 22.664V29H162.332V16.28H164.54V18.416ZM177.343 29.144C176.079 29.144 174.943 28.864 173.935 28.304C172.927 27.744 172.135 26.976 171.559 26C170.999 25.008 170.719 23.888 170.719 22.64C170.719 21.392 170.999 20.28 171.559 19.304C172.135 18.312 172.927 17.544 173.935 17C174.943 16.44 176.079 16.16 177.343 16.16C178.607 16.16 179.735 16.44 180.727 17C181.735 17.544 182.519 18.312 183.079 19.304C183.655 20.28 183.943 21.392 183.943 22.64C183.943 23.888 183.655 25.008 183.079 26C182.519 26.976 181.735 27.744 180.727 28.304C179.735 28.864 178.607 29.144 177.343 29.144ZM177.343 27.128C178.159 27.128 178.887 26.944 179.527 26.576C180.183 26.192 180.695 25.664 181.063 24.992C181.431 24.304 181.615 23.52 181.615 22.64C181.615 21.76 181.431 20.984 181.063 20.312C180.695 19.624 180.183 19.096 179.527 18.728C178.887 18.36 178.159 18.176 177.343 18.176C176.527 18.176 175.791 18.36 175.135 18.728C174.495 19.096 173.983 19.624 173.599 20.312C173.231 20.984 173.047 21.76 173.047 22.64C173.047 23.52 173.231 24.304 173.599 24.992C173.983 25.664 174.495 26.192 175.135 26.576C175.791 26.944 176.527 27.128 177.343 27.128ZM184.289 29H196.289V30.488H184.289V29ZM205.217 16.16C206.449 16.16 207.553 16.432 208.529 16.976C209.505 17.52 210.265 18.28 210.809 19.256C211.369 20.232 211.649 21.36 211.649 22.64C211.649 23.92 211.369 25.056 210.809 26.048C210.265 27.024 209.505 27.784 208.529 28.328C207.553 28.872 206.449 29.144 205.217 29.144C204.273 29.144 203.409 28.96 202.625 28.592C201.841 28.224 201.193 27.688 200.681 26.984V29H198.473V11.192H200.777V18.2C201.289 17.528 201.929 17.024 202.697 16.688C203.465 16.336 204.305 16.16 205.217 16.16ZM205.025 27.128C205.841 27.128 206.569 26.944 207.209 26.576C207.865 26.192 208.377 25.664 208.745 24.992C209.129 24.304 209.321 23.52 209.321 22.64C209.321 21.76 209.129 20.984 208.745 20.312C208.377 19.624 207.865 19.096 207.209 18.728C206.569 18.36 205.841 18.176 205.025 18.176C204.225 18.176 203.497 18.36 202.841 18.728C202.185 19.096 201.673 19.624 201.305 20.312C200.937 20.984 200.753 21.76 200.753 22.64C200.753 23.52 200.937 24.304 201.305 24.992C201.673 25.664 202.185 26.192 202.841 26.576C203.497 26.944 204.225 27.128 205.025 27.128ZM220.28 29.144C219.016 29.144 217.88 28.864 216.872 28.304C215.864 27.744 215.072 26.976 214.496 26C213.936 25.008 213.656 23.888 213.656 22.64C213.656 21.392 213.936 20.28 214.496 19.304C215.072 18.312 215.864 17.544 216.872 17C217.88 16.44 219.016 16.16 220.28 16.16C221.544 16.16 222.672 16.44 223.664 17C224.672 17.544 225.456 18.312 226.016 19.304C226.592 20.28 226.88 21.392 226.88 22.64C226.88 23.888 226.592 25.008 226.016 26C225.456 26.976 224.672 27.744 223.664 28.304C222.672 28.864 221.544 29.144 220.28 29.144ZM220.28 27.128C221.096 27.128 221.824 26.944 222.464 26.576C223.12 26.192 223.632 25.664 224 24.992C224.368 24.304 224.552 23.52 224.552 22.64C224.552 21.76 224.368 20.984 224 20.312C223.632 19.624 223.12 19.096 222.464 18.728C221.824 18.36 221.096 18.176 220.28 18.176C219.464 18.176 218.728 18.36 218.072 18.728C217.432 19.096 216.92 19.624 216.536 20.312C216.168 20.984 215.984 21.76 215.984 22.64C215.984 23.52 216.168 24.304 216.536 24.992C216.92 25.664 217.432 26.192 218.072 26.576C218.728 26.944 219.464 27.128 220.28 27.128ZM237.757 29L234.085 24.128L230.365 29H227.797L232.813 22.496L228.037 16.28H230.605L234.109 20.864L237.589 16.28H240.109L235.309 22.496L240.373 29H237.757Z" fill="#F64032" />
      <g clipPath="url(#clip0_2453_1914)">
        <path d="M38.9151 23.2834C38.9151 33.7058 30.466 40 20.0437 40C9.62098 40 1.17188 31.5509 1.17188 21.1282C1.17188 10.7059 9.88496 4.2981 20.3073 4.2981C30.73 4.2981 38.9151 12.8607 38.9151 23.2834Z" fill="#F64032" />
        <path d="M28.238 12.6065C27.3211 11.6729 25.8377 10.8048 24.733 10.551C25.3401 10.0127 25.4623 9.99491 26.2227 9.61813C28.1713 8.65362 31.0576 8.56482 31.0576 8.56482C31.0576 8.56482 27.6509 6.80417 25.1601 6.91465C24.5259 6.94254 23.8571 7.16655 23.2118 7.484C23.5757 6.97051 23.9205 6.45995 24.1409 6.0764C24.8152 4.90365 25.524 3.42624 25.524 3.42624C25.524 3.42624 22.9122 3.5657 21.7008 5.01562C21.2407 5.56642 20.8934 6.26622 20.6392 6.92272C20.1878 6.40416 19.6896 5.94239 19.1913 5.58192C16.6999 3.77893 12.7192 4.169 12.7192 4.169C12.7192 4.169 15.7263 5.87482 17.0793 7.57653C17.6076 8.24107 18.1437 8.54839 18.4642 9.29349C17.3564 9.05364 14.8569 9.13562 13.63 9.59054C10.4771 10.7599 9.11852 15.4649 9.11852 15.4649C9.11852 15.4649 12.1952 13.3442 16.3813 11.8565C17.3017 11.5295 18.2748 11.4428 19.1229 11.4577C18.7379 12.0575 18.3173 12.8363 17.999 13.7546C17.2247 15.9904 18.2479 21.3113 18.2479 21.3113C18.2479 21.3113 20.4896 18.1646 21.403 15.6156C21.8718 14.3073 21.9879 12.9936 21.9904 12.0242C22.8217 12.3931 23.8009 12.9319 24.5326 13.398C28.2794 15.7852 30.072 20.1435 30.072 20.1435C30.072 20.1435 30.5941 15.0059 28.238 12.6065V12.6065Z" fill="#899441" />
        <path d="M20.5008 10.3094C20.4889 10.3094 20.477 10.3091 20.4651 10.3088C19.7242 10.2896 19.1391 9.67376 19.1572 8.9334C19.1587 8.86931 19.2234 4.36125 16.7191 2.40111C16.135 1.94395 16.0318 1.09984 16.489 0.515424C16.9465 -0.0686834 17.7906 -0.171833 18.3747 0.285626C21.9559 3.08806 21.8491 8.76128 21.843 9.00145C21.8238 9.73083 21.2262 10.3094 20.5008 10.3094V10.3094Z" fill="#A8B64F" />
      </g>
      <defs>
        <clipPath id="clip0_2453_1914">
          <rect width="40" height="40" fill="white" />
        </clipPath>
      </defs>
    </svg>
    <Link href="/">
      <a className={styles.statistics}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 20H14V4H10V20ZM4 20H8V12H4V20ZM16 9V20H20V9H16Z" fill="inherit" />
        </svg>
        Статистика
      </a>
    </Link>
  </header>
);
