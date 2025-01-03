import { useInfiniteQuery, useQuery } from "react-query";
import PostListItem from "./PostListItem";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import { SyncLoader } from "react-spinners";

const fetchPosts = async (pageParam) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}/posts`, {
    params: { page: pageParam, limit: 2 },
  });
  return res.data;
};

const PostList = (pageParam) => {
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: ({ pageParam = 1 }) => fetchPosts(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 1 : undefined,
  });

  console.log(data);

  if (status === "loading") return "Loading...";

  if (status === "error") return "SOmething went wrong!";

  const allPosts = data?.pages?.flatMap((page) => page.posts) || [];

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={hasNextPage}
      loader={
        <div className="justify-items-center mb-10">
          <SyncLoader
            color="#0A5EB0"
            margin={5}
            size={20}
            speedMultiplier={1}
          />
        </div>
      }
      endMessage={
        <p className="reenie-beanie-regular text-3xl text-center mb-10 text-blue-600">
          <b>All posts loaded!</b>
        </p>
      }
    >
      {allPosts.map((post) => (
        <PostListItem key={post._id} post={post} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
