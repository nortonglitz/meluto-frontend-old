declare namespace NodeJS {
  interface ProcessEnv {
      NODE_ENV: 'development' | 'production'
      PUBLIC_URL: string
      REACT_APP_API_URL: string
      REACT_APP_BUCKET_URL: string
  }
}
