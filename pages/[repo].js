import { useRouter } from "next/router";
import React from "react";
import { useQuery } from "react-query";

const Repositories = () => {
    const router = useRouter();
    const { repo } = router.query;

    const { data, error, isLoading } = useQuery(
      "repositories",
      () =>
        fetch(`https://api.github.com/users/${repo}/repos`)
          .then((res) => res.json())
          .then((repos) =>
            repos.sort((a, b) => {
              const dateA = new Date(a.updated_at);
              const dateB = new Date(b.updated_at);
              return dateB.getTime() - dateA.getTime();
            })
          )
    );

    const formatDate = (dateString) => {
      const date = new Date(dateString);

      const day = date.getDate().toString().padStart(2, "0");
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const year = date.getFullYear().toString();

      return `${day}/${month}/${year}`;
    };

    if (error) return <>Error!</>;

    return (
      <div className="px-[35px]  h-full w-full">
        <h1 className="font-bold text-[18px] pb-[12px] pt-[10px] border-b-[1px] border-[#C4C4C4] mb-[30px]">
          {repo} repositories
        </h1>
        {isLoading || data?.length === 0 ? (
          <>Loading...</>
        ) : (
          <div className="flex flex-col gap-y-[10px]">
            {data?.map((repos) => (
              <div
                className="bg-white px-2 flex flex-col gap-2 py-2 rounded"
                key={repos.id}
              >
                <div>
                  Repository name: <b>{repos.name}</b>
                </div>
                <div>
                  Repository fullName: <b> {repos.full_name} </b>
                </div>
                <div>
                  Description:
                  <b>
                    {repos.description
                      ? ` ${repos.description}`
                      : " No description"}{" "}
                  </b>
                </div>
                <div>
                  Language:
                  <b>{repos.language ? ` ${repos.language}` : " No language"}</b>
                </div>
                <div>
                  Created at: <b> {formatDate(repos.created_at)}</b>
                </div>
                <div>
                  Updated at: <b> {formatDate(repos.updated_at)}</b>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default Repositories;
