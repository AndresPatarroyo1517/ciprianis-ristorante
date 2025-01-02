import getExpeditiousCache from 'express-expeditious'

const defaultOptions = {
  namespace: 'expresscache',
  defaultTtl: '5 minute',
  statusCodeExpires: {
    404: '5 minutes',
    500: 0
  }
}

export const cache = getExpeditiousCache(defaultOptions)
