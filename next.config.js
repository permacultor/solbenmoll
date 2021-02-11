const withPreact = require('next-plugin-preact')
const withNextTranslate = require('next-translate')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withNextTranslate(withPreact(withBundleAnalyzer({})))
