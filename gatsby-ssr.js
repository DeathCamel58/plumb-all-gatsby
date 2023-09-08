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
                dangerouslySetInnerHTML={{
                    __html: `
                    ! function(f, b, e, v, n, t, s) {
                        if (f.fbq) return;
                        n = f.fbq = function() {
                            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
                        };
                        if (!f._fbq) f._fbq = n;
                        n.push = n;
                        n.loaded = !0;
                        n.version = '2.0';
                        n.queue = [];
                        t = b.createElement(e);
                        t.async = !0;
                        t.src = v;
                        s = b.getElementsByTagName(e)[0];
                        s.parentNode.insertBefore(t, s)
                    }(window, document, 'script', '/js/fbevents.js');
                    fbq('init', '194958962316240');
                    fbq('track', "PageView");
                `,
                }}
            />,
            <Script key="bing-tracking-events"
                    strategy="post-hydrate"
                    dangerouslySetInnerHTML={{
                        __html: `
                    (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"17508257"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.type="text/javascript",n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","/js/bat.js","uetq");
                `,
                    }}
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
            key="bootstrap-bundle-js"
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm"
            crossOrigin="anonymous" />
    ]);
}
