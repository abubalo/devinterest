

const DATABASE_URL = process.env.DATABASE_URL
const DIRECT_DATABASE_URL = process.env.DIRECT_DATABASE_URL
const SHADOW_DATABASE_URL = process.env.SHADOW_DATABASE_URL

const config = ({
    url:{
        DATABASE_URL,
        DIRECT_DATABASE_URL,
        SHADOW_DATABASE_URL
    }
});


export default config;