/** @type { import('@storybook/react-vite').StorybookConfig } */

const config = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
    "@storybook/addon-links",
  ],
  core: {
    builder: "@storybook/builder-vite",
  },
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  //async viteFinal(config) {
  //  config.optimizeDeps = {
  //    ...(config.optimizeDeps || {}),
  //    exclude: ["vite-plugin-dts"]
  //  };
  //  return config;
  //}
};
export default config;
