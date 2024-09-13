import { NextResponse } from 'next/server';
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body.message;

    if (!message) {
      return NextResponse.json({ message: 'メッセージが提供されていません' }, { status: 400 });
    }

    if (myUserId !== undefined) {
        await client.pushMessage(myUserId, {
          type: "text",
          text: message,
        });
    }
    return NextResponse.json({ message: `${message}というメッセージが送信されました。` });
  } catch (e) {
    console.error('LINE メッセージ送信エラー:', e);
    return NextResponse.json({ message: `エラーが発生しました: ${e instanceof Error ? e.message : '不明なエラー'}` }, { status: 500 });
  }
}