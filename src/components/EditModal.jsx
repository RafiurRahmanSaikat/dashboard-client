import React from 'react';
import { UPDATE } from '../utilities/utilities';

const EditModal = ({ ID, refetch }) => {
    const submit = Date.now();
    const SUBMIT = async (event) => {
        event.preventDefault()
        const form = event.target
        const fullName = form.fullName.value
        const email = form.email.value
        const phone = form.phone.value
        const amount = form.amount.value
        if (phone.length !== 11) {
            alert("Phone Number Must be 11 Digit")
            return
        }
        const submitData = { fullName, email, phone, amount, submit }

        UPDATE(ID, submitData, refetch)
        form.reset()



    }



    return (
        <>
            {/* <MODAL BODY START */}
            <input type="checkbox" id="EditModal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box relative">
                    <label
                        htmlFor="EditModal"
                        className="btn btn-sm btn-circle absolute right-2 top-2"
                    >
                        ✕
                    </label>
                    {/* FORM START */}
                    <form onSubmit={SUBMIT}>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-xl font-semibold">Full Name</span>
                            </label>
                            <input
                                name='fullName'
                                type="text"
                                placeholder='Please Enter Your Full Name'
                                required
                                className="input input-bordered"
                            />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-xl font-semibold">Email</span>
                            </label>
                            <input
                                className="input input-bordered"
                                placeholder='Please Enter Your Email'
                                type="email"
                                name='email'
                                required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-xl font-semibold">Phone</span>
                            </label>

                            <input
                                type="number"
                                placeholder='Please Enter Your Phone'
                                name='phone'
                                className="input input-bordered"
                                defaultValue=""
                                required

                            />


                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="text-xl font-semibold">Payable Amount </span>
                            </label>
                            <input
                                type="number"
                                name="amount"
                                className="input input-bordered"
                                defaultValue=""
                                required
                            />
                        </div>
                        <div className="form-control mt-6">
                            <button type="submit" className="btn btn-primary">
                                Submit
                            </button>
                        </div>
                    </form>
                    {/* FORM END */}
                </div>
            </div>
            {/* <MODAL BODY END */}
        </>
    )
};

export default EditModal;