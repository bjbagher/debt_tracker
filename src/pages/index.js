import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import App from "../components/app"


const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>Hello User!</h1>
    <App />
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
    </div>
  </Layout>
)

export default IndexPage
