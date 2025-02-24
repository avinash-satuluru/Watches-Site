import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./watchDetails.css"
import AddtoCart from "../Components/addtoCart";
import Grid from '../Components/grid'

const WatchDetails = () => {
    const { id } = useParams();
    const [watch, setWatch] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`http://localhost:5000/watches/${id}`)
            .then(response => response.json())
            .then(data => {
                setWatch(data);
                setLoading(false);
            })
            .catch(error => console.error("Error fetching watch:", error));
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!watch) return <p>Watch not found.</p>;

    return (
        <>
            <div className="wrapper">
                <div className="detailsCard">
                    <div className="Image detailImage">
                        <img src={watch.imageUrl} className='watchImage' alt={watch.name} />
                    </div>
                    <div>
                        <h1 className="watchName">{watch.name}</h1>
                        <p>{watch.description}</p>
                        <p className="watchPrice">${watch.price}</p>
                        <AddtoCart />
                    </div>
                </div>
            </div>

            <div>
                <Grid limit={4} isTitle={"Also Explore"} showFilter={false} showTypeF={false} />
            </div>

        </>
    );
};

export default WatchDetails;
