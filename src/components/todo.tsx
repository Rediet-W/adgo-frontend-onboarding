import React from "react";
import { useQuery } from "@tanstack/react-query";

export default function GetTodo() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["tododata"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos/1").then((res) =>
        res.json()
      ),
  });

  if (isLoading) return <p className="font-semibold">Loading...</p>;
  if (error) return <p className="text-red-400">Error: {error.message}</p>;

  return (
    <div className="font-semibold">
      <p> Todo: #{data.id}</p>
      <p> Title: {data.title}</p>
    </div>
  );
}
