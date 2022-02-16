const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  presets: [
    'next/babel',
  ],
  plugins: [
    [
      isDev ? 'effector-logger/babel-plugin' : 'effector/babel-plugin',
      {
        reactSsr: true,
      },
    ],
  ],
};
