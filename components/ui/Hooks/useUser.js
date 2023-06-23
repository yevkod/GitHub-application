import axios from "axios";
import { useInfiniteQuery } from "react-query";

const fetchUsers = async ({ pageParam = 1 }) => {
    const response = await axios.get(
      `https://api.github.com/repos/angular/angular/contributors?page=${pageParam}&per_page=25`
    );
    const allUsers = response.data;

    const contributorsWithUserInfo = await Promise.all(
        allUsers.map(async (contributor) => {
        const userResponse = await axios.get(contributor.url);
        const userInfo = userResponse.data;
        return {
          ...contributor,
          user_info: userInfo,
        };
      })
    );

    return {
      items: contributorsWithUserInfo,
      nextCursor: pageParam + 1,
      prevCursor: pageParam - 1,
    };
  };

export const useUsers = () => {
    return useInfiniteQuery({
      queryKey: "contributors",
      queryFn: ({ pageParam = 1 }) => fetchUsers({ pageParam }),
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      getPreviousPageParam: (firstPage) => firstPage.prevCursor,
    });
  };

