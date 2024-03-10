"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Profile from "@components/Profile";

const UserProfile = () => {
  const router = useRouter();
  const { query } = router;
  const userName = query.name;

  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/users/${query.userId}/posts`);
        if (!response.ok) {
          throw new Error("Failed to fetch user posts");
        }
        const data = await response.json();
        setUserPosts(data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    if (query.userId) {
      fetchPosts();
    }
  }, [query.userId]);

  return (
    <Profile
      name={userName}
      desc={`Welcome to ${userName}'s personalized profile page`}
      data={userPosts}
    />
  );
};

export default UserProfile;
