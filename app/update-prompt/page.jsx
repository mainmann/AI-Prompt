"use client";
//import Here
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Form from "@components/Form";

// Main Component
const EditPrompt = () => {
  const router = useRouter();
  // Intialzing search of prompt
  const searchParams = useSearchParams();
  const promptId = searchParams.get("id");

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  useEffect(() => {
    const getPromptDetails = async () => {
      try {
        const response = await fetch(`/api/prompt/${promptId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch prompt details");
        }
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });
      } catch (error) {
        console.error("Error fetching prompt details:", error);
      }
    };
    if (promptId) getPromptDetails();
  }, [promptId]);

  //Function Update prompt

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) return alert("Prompt ID not found");

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default EditPrompt;
