import { useQuery } from "@tanstack/react-query";

export const PostData = async (Data) => {
  const api = "http://localhost:5000/add-billing";
  const response = await fetch(api, {
    method: "POST",
    body: JSON.stringify(Data),
    headers: {
      "content-type": "application/json",
    },
  });
  return response.json();
};

export const DELETE = async (id, refetch) => {
  const DeleteApi = `http://localhost:5000/delete-billing/${id}`;

  fetch(DeleteApi, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        refetch();
        console.log(data.message);
      } else {
        refetch();
        console.error(data.error);
      }
    })
    .catch((err) => console.error(err.message));
};

export const UPDATE = async (id, updateDoc, refetch) => {
  const UpdateApi = `http://localhost:5000/update-billing/${id}`;

  fetch(UpdateApi, {
    method: "PATCH",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(updateDoc),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        console.log(data.message);
        refetch();

        // toast.success(data.message);
      } else {
        console.log(data.error);
        // toast.err(data.error);
      }
    })
    .catch((err) => {
      // toast.error(err.message)
      console.log(err.message);
    });
};


