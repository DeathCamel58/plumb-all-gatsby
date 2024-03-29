const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
    // Query our posts from the GraphQL server
    const posts = await getPosts(gatsbyUtilities)
    console.log(`Found ${posts.length} posts`)

    // Query our pages from the GraphQL server
    const pages = await getPages(gatsbyUtilities)
    console.log(`Found ${pages.length} pages`)

    // If there are no posts in WordPress, don't do anything
    // if (!posts.length) {
    //     return
    // }

    // If there are posts and pages, create Gatsby pages for them
    console.log(`createSinglePosts firing with ${posts.length} items on posts.`)
    //console.log(posts)
    await createSinglePosts({ posts, gatsbyUtilities })
    console.log(`createSinglePages firing with ${pages.length} items on pages.`)
    // console.log(pages)
    await createSinglePages({ pages, gatsbyUtilities })

    // And a paginated archive
    await createBlogPostArchive({ posts, gatsbyUtilities })
}

/**
 * This function creates all the individual blog pages in this site
 * @param posts An array of pages
 * @param gatsbyUtilities
 * @returns None. Pages are created
 */
const createSinglePages = async ({ pages, gatsbyUtilities }) =>
    // dd(pages)
    Promise.all(
        pages.map((page) =>
            // dd(page.page)
            // console.log(`id is ${page.page.id}\nuri is ${page.page.uri}`)
            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            gatsbyUtilities.actions.createPage({
                // Use the WordPress uri as the Gatsby page path
                // This is a good idea so that internal links and menus work 👍
                path: page.page.uri,

                // use the blog post template as the page component
                component: path.resolve(
                    `./src/templates/Page.js`
                ),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // we need to add the post id here
                    // so our blog post template knows which blog post
                    // the current page is (when you open it in a browser)
                    id: page.page.id,

                    // We also use the next and previous id's to query them and add links!
                    // previousPostId: previous ? previous.id : null,
                    // nextPostId: next ? next.id : null,
                },
            })
        )
    )

/**
 * This function creates all the individual blog posts in this site
 * @param posts An array of posts
 * @param gatsbyUtilities
 * @returns None. Pages are Created
 */
const createSinglePosts = async ({ posts, gatsbyUtilities }) =>
    Promise.all(
        posts.map(({ previous, post, next }) =>
            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            gatsbyUtilities.actions.createPage({
                // Use the WordPress uri as the Gatsby page path
                // This is a good idea so that internal links and menus work 👍
                path: post.uri,

                // use the blog post template as the page component
                component: path.resolve(
                    `./src/templates/${post.__typename.replace(`Wp`, ``)}.js`
                ),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // we need to add the post id here
                    // so our blog post template knows which blog post
                    // the current page is (when you open it in a browser)
                    id: post.id,

                    // We also use the next and previous id's to query them and add links!
                    previousPostId: previous ? previous.id : null,
                    nextPostId: next ? next.id : null,
                },
            })
        )
    )

/**
 * This function creates all the individual blog pages in this site
 */
async function createBlogPostArchive({ posts, gatsbyUtilities }) {
    const graphqlResult = await gatsbyUtilities.graphql(/* GraphQL */ `
    {
      wp {
        readingSettings {
          postsPerPage
        }
      }
    }
  `)

    const { postsPerPage } = graphqlResult.data.wp.readingSettings

    const postsChunkedIntoArchivePages = chunk(posts, postsPerPage)
    const totalPages = postsChunkedIntoArchivePages.length

    return Promise.all(
        postsChunkedIntoArchivePages.map(async (_posts, index) => {
            const pageNumber = index + 1

            const getPagePath = page => {
                if (page > 0 && page <= totalPages) {
                    // We want the first page to be "/news/" and any additional pages
                    // to be numbered.
                    // "/blog/2" for example
                    return page === 1 ? `/news/` : `/news/${page}/`
                }

                return null
            }

            // createPage is an action passed to createPages
            // See https://www.gatsbyjs.com/docs/actions#createPage for more info
            await gatsbyUtilities.actions.createPage({
                path: getPagePath(pageNumber),

                // use the blog post archive template as the page component
                component: path.resolve(`./src/templates/blog-post-archive.js`),

                // `context` is available in the template as a prop and
                // as a variable in GraphQL.
                context: {
                    // the index of our loop is the offset of which posts we want to display
                    // so for page 1, 0 * 10 = 0 offset, for page 2, 1 * 10 = 10 posts offset,
                    // etc
                    offset: index * postsPerPage,

                    // We need to tell the template how many posts to display too
                    postsPerPage,

                    nextPagePath: getPagePath(pageNumber + 1),
                    previousPagePath: getPagePath(pageNumber - 1),
                },
            })
        })
    )
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPages({ graphql, reporter }) {
    const graphqlResult = await graphql(/* GraphQL */ `
    query WpPage {
      allWpPage(sort: { date: DESC }) {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          page: node {
            __typename
            id
            uri
          }
        }
      }
    }
  `)

    if (graphqlResult.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            graphqlResult.errors
        )
        return
    }

    return [
        ...graphqlResult.data.allWpPage.edges,
    ]
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
    const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      allWpPost(sort: { date: DESC }) {
        edges {
          previous {
            id
          }
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            __typename
            id
            uri
          }
          next {
            id
          }
        }
      }
    }
  `)

    if (graphqlResult.errors) {
        reporter.panicOnBuild(
            `There was an error loading your blog posts`,
            graphqlResult.errors
        )
        return
    }

    return [
        ...graphqlResult.data.allWpPost.edges,
    ]
}
