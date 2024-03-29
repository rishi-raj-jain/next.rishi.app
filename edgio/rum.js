import { Metrics } from '@edgio/rum'

// Implementing Real Time User Monitoring (Core Web Vitals)
// https://docs.layer0.co/guides/core_web_vitals#npm-or-yarn
export default function Layer0RUM(token) {
  new Metrics({
    // Set this TOKEN as an environment variable at Layer0 Console
    // More on creating env variables: https://docs.layer0.co/guides/environments#creating-environment-variables
    token: token,
  }).collect()
}
