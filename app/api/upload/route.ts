import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getCurrentUser } from "@/lib/auth";

export async function POST(request: Request) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file received." }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        return await new Promise<Response>((resolve) => {
            const uploadStream = cloudinary.uploader.upload_stream(
                { folder: "tadlab" },
                (error, result) => {
                    if (error) {
                        console.error(error);
                        resolve(NextResponse.json({ error: error.message }, { status: 500 }));
                    } else {
                        resolve(NextResponse.json({ url: result!.secure_url }, { status: 200 }));
                    }
                }
            );

            const stream = require('stream');
            const readableStream = new stream.PassThrough();
            readableStream.end(buffer);
            readableStream.pipe(uploadStream);
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Upload failed" }, { status: 500 });
    }
}
