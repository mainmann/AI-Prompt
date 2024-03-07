import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

// GET(Read)
export const GET = async (request, { params }) => {
  try {
    await connectToDB();

    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return new Response("Prompt not found", { status: 404 });
    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch prompts", { status: 500 });
  }
};

//PATCH(Update)
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    const existingPrompt = await Prompt.findById(params.id);
    // If Not Found
    if (!existingPrompt) return new Response("Prompt not found", { status: 404 });
    //updating
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    //returning Successful operation.

    return new Response(JSON.stringify(existingPrompt), { status: 200 });
  } catch (error) {
    return new Response("Failed to update prompt ", { status: 500 });
  }
};
//DELETE
export const DELETE = async (request, { params }) => {
  try {
    await connectToDB();

    await Prompt.findByIdAndRemove(params.id);
    return new Response("Prompt Deleted Successfully", { status: 200 });
  } catch (error) {
    return new Response("Failed To Remove Prompt", { status: 500 });
  }
};
