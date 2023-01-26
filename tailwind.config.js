/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./docs/*.html"],
    theme: {
      extend: {},
    },
    plugins: [
      require("@catppuccin/tailwindcss")({
        prefix: "cat",
        defaultFlavour: "frappe",
      }),
      require("tailwindcss"),
      require("autoprefixer"),
    ],
  };
  