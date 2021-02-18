import React from "react";
import {
  useCreateEventMutation,
  useDeleteEventMutation,
  useListEventsQuery,
} from "../appsync/generated";

const limit = 100;

export const Events: React.FC = () => {
  const { data, refetch } = useListEventsQuery({ variables: { limit } });
  const [addEvent] = useCreateEventMutation();
  const [deleteData] = useDeleteEventMutation();

  const handleCreateClick = async () => {
    await addEvent({
      variables: {
        name: Math.random().toString(32).substring(2),
        when: new Date().toDateString(),
        where: "My House",
        description: "TestTest",
      },
    });
    await refetch();
  };

  const handleDeleteClick = async (id?: string) => {
    if (id == null) {
      return;
    }
    await deleteData({ variables: { id } });
    await refetch();
  };

  return (
    <>
      <h1>Events</h1>
      <button
        onClick={() => {
          handleCreateClick();
        }}
      >
        Create
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>When</th>
            <th>Where</th>
          </tr>
        </thead>
        <tbody>
          {data?.listEvents?.items?.map((value) => (
            <tr key={value?.id}>
              <td>{value?.id}</td>
              <td>{value?.name}</td>
              <td>{value?.description}</td>
              <td>{value?.when}</td>
              <td>{value?.where}</td>
              <td>
                <button
                  onClick={() => {
                    handleDeleteClick(value?.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
