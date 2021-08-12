const React = require("react")

export function onRenderBody(
    {setPostBodyComponents}) {

    setPostBodyComponents([
        <script key="popper" src="https://unpkg.com/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossOrigin="anonymous" />,
        <script key="bootstrap" src="https://unpkg.com/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossOrigin="anonymous" />,
        <script key="facebook-tracking-events"
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
        <script key="bing-tracking-events"
                dangerouslySetInnerHTML={{
                    __html: `
                    (function(w,d,t,r,u){var f,n,i;w[u]=w[u]||[],f=function(){var o={ti:"17508257"};o.q=w[u],w[u]=new UET(o),w[u].push("pageLoad")},n=d.createElement(t),n.type="text/javascript",n.src=r,n.async=1,n.onload=n.onreadystatechange=function(){var s=this.readyState;s&&s!=="loaded"&&s!=="complete"||(f(),n.onload=n.onreadystatechange=null)},i=d.getElementsByTagName(t)[0],i.parentNode.insertBefore(n,i)})(window,document,"script","/js/bat.js","uetq");
                `,
                }}
        />,
        <!-- begin ClickGUARD Tracking Code -->
        <script defer type="application/javascript" src="https://io.clickguard.com/s/cHJvdGVjdG9y/JAHfDVdP" />,
        <script defer type="application/javascript"
                dangerouslySetInnerHTML={{
                    __html:
                        `(function () {
                            window.cg_convert = function (x, y) { if (window._cg_convert) window._cg_convert(x || null, y || null); else setTimeout(function () { cg_convert(x || null, y || null) }, 500); };
                        })();`
                }}
        />
        <!-- end ClickGUARD Tracking Code -->
    ]);
}
