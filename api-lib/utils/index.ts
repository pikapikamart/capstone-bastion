import { NextApiRequest } from "next";
import { getSession } from "next-auth/react";
import { WriterDocument } from "../models/writerModel";
import { findWriter } from "../service/writer.service";
import { v2 as cloudinary} from "cloudinary";


export const getCurrentWriter = async ( req: NextApiRequest ): Promise<WriterDocument | null> => {
  const writerSession = await getSession({ req });

  if ( writerSession && writerSession.user ) {
    const writerAccount = await findWriter({ email: writerSession.user.email })

    return writerAccount;
  }

  return null;
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const sendCloudinaryImage = async( image: string, folder: string ) =>{
  if ( image ) {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder
    });

    return uploadResponse.url;
  }

  return "";
}

export const deleteCloudinaryImage = async( asset: string, url: string ) =>{
  const publicId = asset + url.slice(url.lastIndexOf("/")+1, url.lastIndexOf("."));
  await cloudinary.uploader.destroy(publicId);
}