import BRX, { BRK } from "brx-node";
import { auth } from "@clerk/nextjs";
import { getKnowledge } from "./helpers";
import { NextResponse } from "next/server";
import { MongoClient, ServerApiVersion } from "mongodb";
import { embeddingSchema, responseSchema } from "./constants";

const brx_emb = async (embeddingSchema: any, query: string) => {
  const brx = new BRX(
    "brx4978bee80875c4566795dbb5512e0a1a3ff65e8757cc1dcb91ef724986404d5d",
    { verbose: false }
  );
  let brxObject = new BRK(embeddingSchema);
  brxObject.input["input1"].value = query;
  const response = await brx.execute(brxObject);
  return response[0].brxRes.output;
};

const brx_response = async (query: string, knowledge: string) => {
  const brx = new BRX(
    "brx38cadc3c6ad8a28262d69b2f5cedf154a9ff3e8bb72b51d2252c1f521a88ac8f",
    { verbose: false }
  );
  let brxObject = new BRK(responseSchema);
  brxObject.input["query"].value = query;
  brxObject.input["knowledge"].value = knowledge;
  const response = await brx.execute(brxObject);
  console.log("Response: ", response);

  return response[0].brxRes.output;
};

export async function POST(req: Request) {
  try {
    // TODO: Add authentication
    //const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!messages) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    const DB_CONN_STRING =
      "mongodb+srv://ignaciogvalverde:6ZpXONJtUxWHhhIV@cluster0.veifprb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
    const client = new MongoClient(DB_CONN_STRING, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
      },
    });

    // Get embeddings from BRX.ai
    const embeddings = await brx_emb(embeddingSchema, messages);
    const mogocliente = await client.connect();

    const database = mogocliente.db("exercises");
    // This should include all the joints
    const collection = database.collection("ankle");
    const pipeline = [
      {
        $vectorSearch: {
          index: "anckle_vs",
          path: "pain_embedding",
          queryVector: embeddings,
          numCandidates: 10,
          limit: 2,
        },
      },
    ];
    const outputs = await collection.aggregate(pipeline).toArray();
    const knowledge = getKnowledge(outputs);
    console.log("Knowledge: ", knowledge);

    // Get response
    const response = await brx_response(messages, knowledge);

    return NextResponse.json({ role: "bot", content: response });
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
