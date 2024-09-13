// import { NextApiRequest, NextApiResponse } from "next";
// import * as line from "@line/bot-sdk";

// const config = {
//   channelAccessToken: process.env.NEXT_PUBLIC_CHANNEL_ACCESSTOKEN,
//   channelSecret: process.env.NEXT_PUBLIC_CHANNEL_SECRET,
// };

// const client = new line.Client(config);

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   try {
//     const message = req.body.message;

//     await client.pushMessage(process.env.NEXT_PUBLIC_MYUSERID, {
//       type: "text",
//       text: message,
//     });

//     res.status(200).json({ message: `${message}というメッセージが送信されました。` });
//   } catch (e) {
//     res.status(500).json({ message: `error! ${e} ` });
//   }
// }



import { NextApiRequest, NextApiResponse } from "next";
import * as line from "@line/bot-sdk";

// 環境変数の存在チェックと型アサーション
const channelAccessToken = process.env.CHANNEL_ACCESSTOKEN;
const channelSecret = process.env.CHANNEL_SECRET;
const myUserId = process.env.MYUSERID;

if (!channelAccessToken || !channelSecret || !myUserId) {
  throw new Error("必要な環境変数が設定されていません");
}

const config: line.ClientConfig = {
  channelAccessToken,
  channelSecret,
};

const client = new line.Client(config);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const message = req.body.message;

    if (myUserId !== undefined) {
        await client.pushMessage(myUserId, {
          type: "text",
          text: message,
        });
    }


    res.status(200).json({ message: `${message}というメッセージが送信されました。` });
  } catch (e) {
    res.status(500).json({ message: `error! ${e} ` });
  }
}