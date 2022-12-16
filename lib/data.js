export const defaultDescription = 'Currently, I am working as a Technical Customer Success Manager at Edgio.'

export const defaultTitle = 'Rishi Raj Jain - Software Engineer, Developer, Designer, Writer'

export const profileLinks = {
  twitter: 'https://twitter.com/rishi_raj_jain_',
  linkedin: 'https://linkedin.com/in/rishi-raj-jain',
  behance: 'https://behance.net/rishi-raj-jain',
  medium: 'https://rishi-raj-jain.medium.com/',
  dribbble: 'https://dribbble.com/rishi-raj-jain',
  github: 'https://github.com/rishi-raj-jain',
  youtube: 'https://www.youtube.com/channel/UCshnsm7ND7kccgYc67KSeig/',
}

export const structuredData = (url = 'https://next.rishi.app') => ({
  url,
  '@type': 'Website',
  name: defaultTitle,
  '@id': url,
  description: defaultDescription,
  '@context': 'https://schema.org',
  sameAs: Object.keys(profileLinks).map((item) => profileLinks[item]),
})
