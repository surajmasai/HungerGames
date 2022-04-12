import React, { useState } from 'react'

export const Addrestaurant = () => {

    const [form, setForm] = useState({
        name: "",
        menu: "",
        costforone: "",
        totalvotes: "",
        reviews: "",
        rating: "",
        payment_methods: {
            card: "",
            cash: "",
            upi: "",
        },
        immageUrl: ""

    })

    const handleChange = (e) => {

        let { name, value, checked, type } = e.target
        value = type === "checkbox" ? checked : value;

        setForm({
            ...form,
            [name]: value,
        })

    }

    const postData = () => {

        // console.log(form)
        const payload = {
            name: form.name,
            menu: form.menu,
            costforone: form.costforone,
            totalvotes: form.totalvotes,
            reviews: form.reviews,
            rating: form.rating,
            payment_methods: {
                card: form.card,
                cash: form.cash,
                upi: form.upi,
            },
            immageUrl: form.immageUrl
        }
        // console.log(payload)
        fetch("http://localhost:3001/restaurantDetails", {
            method: "POST",
            body: JSON.stringify(payload),
            headers: {
                "Content-Type": "application/json"
            }
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }


    return (
        <div>
            <h1>Add Restaurant</h1>
            <div>
                <input type="text" name="name" onChange={handleChange} placeholder='Hotel Name' />
                <input type="text" name="menu" onChange={handleChange} placeholder='Menu' />
                <input type="number" name="costforone" onChange={handleChange} placeholder='Price' />
                <input type="number" name="totalvotes" onChange={handleChange} placeholder='Votes' />
                <input type="number" name="reviews" onChange={handleChange} placeholder='Reviews' />
                <input type="number" name="rating" onChange={handleChange} placeholder='Ratinng' />
                <table>
                    <tr>
                        <th>
                            <span>card</span>
                            <input type="checkbox" name="card" onChange={handleChange} />
                        </th>

                        <th>
                            <span>cash</span>
                            <input type="checkbox" name="cash" onChange={handleChange} />
                        </th>

                        <th>
                            <span>upi</span>
                            <input type="checkbox" name="upi" onChange={handleChange} />
                        </th>
                    </tr>
                </table>
                <input type="text" name="immageUrl" onChange={handleChange} placeholder='Image Url' />

                <button className='savedata' onClick={postData}>save</button>
            </div>
        </div>
    )
}
