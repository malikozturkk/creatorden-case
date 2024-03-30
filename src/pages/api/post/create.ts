import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { postData } = req.body;
  try {
    await prisma.Post.createMany({
      data: postData,
    });
    return res.status(200).json("Post başarıyla eklendi");
  } catch (error) {
    return res.status(200).json("Post eklenirken bir hata oluştu");
  }
};
