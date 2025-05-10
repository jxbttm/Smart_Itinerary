/** @type {import('next').NextConfig} */

const nextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.daisyui.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
        pathname: "/**"
      }
    ],
  },
  ...(process.env.NEXT_TEST === '1' ? {
    webpack: (config) => {
      config.module.rules.push({
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ["next/babel"],
            plugins: [
              ["istanbul", {
                exclude: ["**/*.cy.tsx"]
              }]
            ]
          }
        }
      })
      return config
    }
  } : {})
};

export default nextConfig;
