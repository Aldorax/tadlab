import { v2 as cloudinary } from 'cloudinary';

// Using the provided Cloudinary URL format configuration
// By default, Cloudinary uses the CLOUDINARY_URL environment variable if it corresponds
cloudinary.config({
    secure: true
});

export default cloudinary;
