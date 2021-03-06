module.exports = {
    apps : [{
        name   : "preview-wp-plumb-all",
        script : "npm",
        args : "start",
        env_production: {
            NODE_ENV : "production"
        },
        env_development: {
            NODE_ENV : "development",
            ENABLE_GATSBY_REFRESH_ENDPOINT: "true"
        },
        autorestart: true,
        watch: false
    }],

    // Deployment to server configuration
    deploy: {
        development: {
            "key": "deploy.pem",
            "user": "root",
            "host": "ftp.preview-wp.plumb-all.com",
            "ref": "origin/staging",
            "repo": "https://github.com/DeathCamel58/plumb-all-gatsby.git",
            "path": "/root/plumb-all-gatsby",
            "post-deploy" : "npm install; pm2 startOrRestart ecosystem.config.js --env development"
        }
    }
}
