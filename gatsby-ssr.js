const React = require("react")
import { Script } from "gatsby"

export function onRenderBody(
    {setPostBodyComponents, setHeadComponents}) {

    // Only add tracking codes in `production` mode
    if (process.env.NODE_ENV === `production`) {
        setHeadComponents([
            // <script
            //     key="google-optimize"
            //     src="https://www.googleoptimize.com/optimize.js?id=OPT-MH4QC29"
            // />,
            <Script
                key="facebook-tracking-events"
                strategy="post-hydrate"
                src="/js/fbevents.js"
            />,
            <Script key="bing-tracking-events"
                    strategy="post-hydrate"
                    src="/js/bat.js"
            />
        ])
    }

    setPostBodyComponents([
        <Script
            key="popper"
            src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"
            integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r"
            crossOrigin="anonymous" />,

        <Script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL"
            crossOrigin="anonymous" />,
    ]);
}
