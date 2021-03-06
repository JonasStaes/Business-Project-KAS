
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/tw-elements/dist/js/**/*.js"],
  theme: {
    extend: {
      colors: {
        "main-0": "#448AE6",
        "main-1": "#FFFFFF",
        "main-2": "#F1F1F1",
        "main-1-transparent": "#448AE65F",
        "main-input": "#C1C1C15F",
        "main-accepted": "#5AC129",
        "main-declined": "#C33212"
      },
      transitionProperty: {
        'width': 'width'
      },
    },
  },
  plugins: [
    require('tw-elements/dist/plugin')
    // ...
  ],
}
