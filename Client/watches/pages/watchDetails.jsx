import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./watchDetails.css"

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
                    </div>
                </div>
            </div>
        </>
    );
};

export default WatchDetails;
