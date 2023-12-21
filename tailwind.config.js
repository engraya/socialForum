// const withMT = require("@material-tailwind/react/utils/withMT");


// module.exports = withMT({
//   content: [
//     './src/**/*.{js,jsx,ts,tsx}',
//     'node_modules/flowbite-react/lib/esm/**/*.js'
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require('flowbite/plugin')
//   ],
// });



import withMT from "@material-tailwind/html/utils/withMT";
 
export default withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
});

