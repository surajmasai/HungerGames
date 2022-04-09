import React, { useEffect, useState } from 'react'
import { Addrestaurant } from './Addrestaurant';
import axios from "axios";


export const RestaurantDetails = () => {

    const [database, setDatabase] = useState([]);
    const [sorting, setSorting] = useState("");
    const [rating, setRating] = useState(0);
    const [payment, setPayment] = useState("all");


    const [page, setPage] = useState(1);


    const limit = 9;



    useEffect(() => {
        const getData = async (page) => {
            return axios({
                url: "http://localhost:3001/restaurantDetails",
                method: "GET",
                params: {
                    _page: page,
                    _limit: limit
                }
            })
                .then((res) => {

                    setDatabase(res.data)
                })
                .catch((err) => {
                    console.log(err)
                });
        }

        getData(page)
    }, [page]);

    useEffect(() => {

        var res = database
            .filter((data) => data.rating >= rating)
            .filter((data) => {
                if (payment === "all") {
                    return true
                } else {
                    return data.payment_methods[payment]
                }
            })
            .sort((a, b) => {
                if (sorting === "asc") {
                    return a.costforone - b.costforone
                }
                else if (sorting === "desc") {
                    return b.costforone - a.costforone
                } else {
                    return 0
                }
            })
        // console.log(res)
        setDatabase(res);
    }, [sorting, payment, rating]);

    // console.log(database)
    const getPaymentMethod = (obj) => {
        // console.log(obj)
        var res = []
        for (var key in obj) {
            if (obj[key] === true) {
                // return key
                res.push(key)
            }
        }
        return res.join(",")
    }


    // setDatabase(res)

    return (
        <div>
            <h1 style={{ textAlign: "center" }} >RestaurantDetails</h1>
            <h4>filter by tating</h4>
            <button onClick={() => setRating(1)}>rating 1</button>
            <button onClick={() => setRating(2)}>rating 2</button>
            <button onClick={() => setRating(3)}>rating 3</button>
            <button onClick={() => setRating(4)}>rating 4</button>
            <button onClick={() => setRating(0)}>all</button>
            <hr />
            <h4>filter by payment</h4>
            <button onClick={() => setPayment("cash")}>cash</button>
            <button onClick={() => setPayment("card")}>card</button>
            <button onClick={() => setPayment("all")}>all</button>
            <hr />
            <h4>sort by cost</h4>
            <button onClick={() => setSorting("asc")}>low to high</button>
            <button onClick={() => setSorting("desc")}>high to low</button>
            <hr />

            <div className="container" >
                {database.map((e, i) => {
                    return (
                        <>
                            <div className="maincontainer" style={{ backgroundColor: "lightgrey", width: 500 }}>
                                <div key={i} className="containerItem">
                                    <div className="itemImage">
                                        <img src={e.immageUrl} alt={e.name} />
                                    </div>
                                    <div className="itemDetails">
                                        <div className="itemDetail">
                                            <h3 style={{ color: "red" }}>{e.name}</h3>
                                            <p>{e.menu}</p>
                                            <p> payment:-{getPaymentMethod(e.payment_methods)}</p>
                                            <p> Rs.{e.costforone}</p>

                                        </div>
                                        <div className="itemReview">
                                            <p>{e.rating}</p>
                                            <p>{e.reviews} votes</p>
                                            <p>{e.totalvotes} reviews</p>
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="orderbutton">
                                    <button>Order Online</button>
                                </div>
                            </div>
                        </>
                    )
                })
                }
            </div>
            <div className="paginationbutton">
                <button onClick={() => setPage((p) => p - 1)} disabled={page === 1}>prev</button>
                <button onClick={() => setPage((p) => p + 1)}>next</button>

            </div>

            <Addrestaurant />

        </div>
    )
}
