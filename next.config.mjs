/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        domains:[process.env.AWS_S3_URI]
    }
};

export default nextConfig;
