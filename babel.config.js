module.exports = (api) => {
  const isProd = api.env('production');

  const presets = [
    [
      '@babel/preset-env',
      {
        targets: '> 0.25%, not ie <= 8',
        useBuiltIns: 'usage',
        corejs: { version: 3, shippedProposals: true },
        debug: !isProd
      }
    ],
    '@babel/preset-react'
  ];

  const setPlugins = (settings) => {
    return [
      [
        'babel-plugin-styled-components',
        { ssr: false, fileName: settings.isProd }
      ]
    ]
  };

  const env = {
    development: { presets, plugins: setPlugins({ isProd: false }) },
    production: { presets, plugins: setPlugins({ isProd: true }) },
  };

  return { presets, env, plugins: setPlugins({ isProd }) };
}
