import { useEffect, useState } from 'react';
import './grid.css'
import React from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Grid = ({ limit, isTitle, showFilter = true, gender, showTypeF = true }) => {
    const [watches, setWatches] = useState([]);
    const [filter, setFilter] = useState(gender || "all"); // "all" will show all watches, "men" will filter for men's watches
    const [type, setType] = useState("all");

    const fetchAPI = async () => {
        try {
            const response = await axios.get("http://localhost:5000/watches");
            setWatches(response.data);

        } catch (error) {
            console.error("Error fetching watches:", error);
        }
    };

    useEffect(() => {
        fetchAPI();
    }, []);


    const navigate = useNavigate();

    const handleCardClick = (id) => {
        navigate(`/watches/${id}`); // Redirect to the watch details page
    };

    const filteredWatches = watches.filter((watch) => {
        const genderMatch = filter === "all" || watch.gender === filter;
        const typeMatch = type === "all" || watch.type === type;
        return genderMatch && typeMatch;
    });

    const displayProducts = limit ? filteredWatches.slice(0, limit) : filteredWatches;


    return (
        <>
            <div>
                <h1 className='gridHeading'>{isTitle ? isTitle : "Watches"} </h1>

                {showFilter && (
                    <div className="gridFilter home-grid">
                        <label>Filter by Gender: </label>
                        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                            <option value="all">All</option>
                            <option value="Men">Men</option>
                            <option value="Women">Women</option>
                        </select>
                    </div>
                )}
                {showTypeF && (
                    <div>
                        <label>Filter by Type: </label>
                        <select onChange={(e) => setType(e.target.value)} value={type}>
                            <option value="all">All</option>
                            <option value="Analog">Analog</option>
                            <option value="Digital">Digital</option>
                        </select>
                    </div>
                )}

                <div className='watchSection'>
                    {displayProducts.map((watch) => (
                        <div key={watch._id} className='watchCard' onClick={() => handleCardClick(watch.id)}>
                            <div className='watchImagecard'>
                                <img src={watch.imageUrl} className='watchImage' alt={watch.name} />
                            </div>
                            <div className='watchName'>
                                <h3>{watch.name.slice(0, 20) + "..."}</h3>
                            </div>
                            <div className='watchDetails'>
                                <h3 className='watch-type'>{"(" + watch.type + ")"}</h3>
                                <h3 className='watch-price'>${watch.price}</h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Grid;
