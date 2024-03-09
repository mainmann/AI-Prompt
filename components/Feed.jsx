"use client";
//Importing state
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

//--
const PromptCardList = ({ data, handleTagClick }) => {
  // Check if data is an array before using map
  if (!Array.isArray(data)) {
    return null; // or render an appropriate fallback UI
  }

  return (
    <div className="mt-16 prompt_layout ">
      {data.map((post) => (
        <PromptCard key={post._id} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch("/api/prompt");
    const data = await response.json();
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    const regexTag = new RegExp(`#${searchText.slice(1)}`, "i");
    return posts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt) ||
        regexTag.test(item.tag)
    );
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchedResults = filteredPrompts(e.target.value);
        setSearchedResults(searchedResults);
      }, 500)
    );
  };

  const handleTagClick = (tagName) => {
    // when tag is clicked, update searchText
    setSearchText(tagName);
    const searchedResults = filteredPrompts(tagName);
    setSearchedResults(searchedResults);
  };

  return (
    <section className="feed">
      <form className="relative flex-center w-full">
        <input
          type="text"
          placeholder="search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* Render PromptCardList based on searchText */}
      <PromptCardList data={searchText ? searchedResults : posts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
