import Modal from "../Modal/Modal";
import PostList from "../PostList/PostList";
import SearchBox from "../SearchBox/SearchBox";
import Pagination from "../Pagination/Pagination";

import css from "./App.module.css";
import { useState } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../services/postService";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [query, setQuery] = useState("")
  const [page, setPage] = useState(1)
  const heandleSubmit = useDebouncedCallback((newQuery: string) => {
    setQuery(newQuery)
    setPage(1)
  }, 500)
  const { data } = useQuery({
    queryKey: ["posts", query, page],
    queryFn: () => fetchPosts(query, page),
    placeholderData: keepPreviousData
  })
  const totalPages = data?.totalCount ? Math.ceil(data.totalCount / 8) : 0
  const posts = data?.posts ?? []
  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSubmit = {heandleSubmit} value = {query} />
        {totalPages > 1 && <Pagination totalPages={totalPages} currentPage={page} onPageChange={setPage} />}
        <button className={css.button}>Create post</button>
      </header>
      {/* <Modal></Modal> */}
      {posts.length > 0 && <PostList posts={posts } /> }
    </div>
  );
}
