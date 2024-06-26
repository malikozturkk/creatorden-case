import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Influencer } from "@/types/index.types";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const getInfluencers: Influencer[] = await prisma.Influencer.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json(getInfluencers);
  } catch (error) {
    return res.status(200).json("Influencerlar getirilirken bir hata oluştu");
  }
};
