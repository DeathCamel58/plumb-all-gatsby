import * as React from "react"
import Layout from "../components/layout";
import { StaticImage } from "gatsby-plugin-image";
import { Link } from "gatsby";

// markup
const NotFoundPage = () => {
  return (
    <Layout postOrPage={'404'} pageName={'404 - Not Found'}>
      <section className="not-front-page" itemProp="articleBody">
        <h1>Page not found</h1>
        <p>Sorry, we couldn't find what you're looking for.</p>

        <div className="text-center">
          <StaticImage
              src="https://http.cat/404"
              alt="HTTP Cat 404"
          />
        </div>

        {process.env.NODE_ENV === 'development'? (
          <>
            <br />
            <p>Try creating a page with this URL, or create a page in <code>src/pages/</code>.</p>
          </>
        ) : null}

        <p>Check out our <Link to={"/news/"}>blog</Link> or head back to our <Link to={"/"}>home page</Link>?</p>
      </section>
    </Layout>
  )
}

export default NotFoundPage
