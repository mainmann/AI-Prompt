"use client";
import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
  //Session
  const { data: session } = useSession();
  //PathName
  const pathName = usePathname();
  //Router
  // const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 4000);
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
          <Link href={`/profile?userId=${post.creator._id}`}>
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rounded-full object-contain"
            />
          </Link>
          <div className="flex flex-col">
            <Link href={`/profile?userId=${post.creator._id}`}>
              <h3 className="font-satoshi font-semibold text-gray-900">{post.creator.username}</h3>
            </Link>
          </div>
        </div>
        <div className="copy_btn" onClick={handleCopy}>
          <Image
            src={copied === post.prompt ? "/assets/icons/tick.svg" : "/assets/icons/copy.svg"}
            width={20}
            height={20}
            alt="copy_button"
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>
      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className=" mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer " onClick={handleEdit}>
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer border border-rose-700 rounded-full p-1 "
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
