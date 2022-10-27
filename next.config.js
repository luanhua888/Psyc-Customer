const nextConfig = require('next-transpile-modules')([
  '@fullcalendar/common',
  '@babel/preset-react',
  '@fullcalendar/common',
  '@fullcalendar/daygrid',
  '@fullcalendar/interaction',
  '@fullcalendar/react'
])

/** @type {import('next').NextConfig} */
module.exports = nextConfig({
  reactStrictMode: false,
  swcMinify: true
})


