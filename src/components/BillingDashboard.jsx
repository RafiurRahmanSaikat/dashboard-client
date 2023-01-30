import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { DELETE } from "../utilities/utilities";
import logo from "../assets/logo.png"
import EditModal from './EditModal'
import PostModal from "./PostModal";
const BillingDashboard = () => {
  const [ID, setID] = useState(null)
  const [search, setSearch] = useState('')
  const [DATA, setDATA] = useState(null)
  const [totalPaid, setTotalPaid] = useState(0)
  const [LoadTotal, setLoadTotal] = useState(false)
  const [limit, setLimit] = useState(10)

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["billing-list", search],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/billing-list?search=${search}`
      );
      const data = await res.json();
      return data;
    }
  });
  console.log("object", data);

  useEffect(() => {
    fetch('http://localhost:5000/billing-list')
      .then((response) => response.json())
      .then((DATA) => {
        console.log(DATA)
        setDATA(DATA)
        let sum = DATA?.reduce((a, b) => a + parseInt(b.amount), 0)
        setTotalPaid(sum)
        console.log(sum)
        setLoadTotal(!LoadTotal)
      });

  }, [LoadTotal])


  const SEARCH = (event) => {
    event.preventDefault()
    const form = event.target
    const query = form.search.value
    setSearch(query)

  }


  return (

    <section>
      <div className="  flex justify-around  space-x-6 items-center p-1 mx-auto bg-emerald-400 ">
        <img className="rounded-lg h-10 " src={logo} alt="logo" />
        <form onSubmit={SEARCH} className="flex space-x-3">
          <input
            type="text"
            placeholder="Search"
            name="search"
            className="input input-bordered w-full max-w-xs"
          />
          <button type="submit" className="rounded-full p-2 bg-blue-800 w-[7vw] text-white font-bold ">
            Search
          </button>
        </form>

        <p className="  text-2xl font-semibold ">Total Paid /= <span className="text-red-700"> {totalPaid} TAKA</span> </p>
        <label

          htmlFor="PostModal"
          className="p-2 rounded-full  bg-amber-600 hover:bg-amber-800   w-[7vw] text-white font-bold "
        >
          Add New
        </label>
      </div>

      {/* TABLE START */}
      <div className="overflow-x-auto">

        {

          data ? <table className="table-auto table-normal mt-2 table-zebra  w-screen">
            <thead>
              <tr className="bg-gray-300">
                <th>Serial</th>
                <th>Billing ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Paid Amount</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {



                data?.map((items, index) => <tr key={items._id}>
                  <th>{index + 1}</th>
                  <th>{items._id}</th>
                  <td>{items.fullName}</td>
                  <td>{items.email}</td>
                  <td>{items.phone}</td>
                  <td>{items.amount}</td>

                  <td className="flex justify-center">
                    <label htmlFor="EditModal" onClick={() => setID(items._id)} className="btn btn-xs btn-primary ">Edit</label>
                    <button onClick={() => DELETE(items._id, refetch)} className="btn btn-xs btn-error ml-4">Delete</button>
                  </td>
                </tr>)

              }
            </tbody>
          </table> : <p className="text-info text-[10vw] text-center items-center">
            NO DATA ..
          </p>
        }



        {
          ID && <EditModal refetch={refetch} ID={ID}></EditModal>
        }
        <PostModal refetch={refetch}></PostModal>
      </div>



      {/* TABLE End */}

    </section>
  );
};

export default BillingDashboard;
