import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const getInfluencers = await prisma.Influencer.findMany({
      orderBy: {
        year: "asc",
      },
    });
    return res.status(200).json(getInfluencers);
  } catch (error) {
    console.log(error, "error");
    return res.status(200).json("Influencerlar getirilirken bir hata oluştu");
  }
};
