import { useState, useEffect } from "react";
import { addFarm, getFarms } from "../../api/farmApi";
import { toast } from "react-hot-toast";
import { LocationMap } from "../mapSupplier";
import Modal from "react-modal";

function FarmList() {
    const [farms, setFarms] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedFarm, setSelectedFarm] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const responseFarms = await getFarms();
                setFarms(responseFarms.data);
            } catch (error) {
                toast.error("Error al cargar los datos " + error.message, {
                    duration: 5000,
                });
            }
        }
        fetchData();
    }, []);

    return (
        <div className="row mt-5">
            <h2>Mis fincas</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Dirección</th>
                    </tr>
                </thead>
                <tbody>
                    {farms.map((farm) => (
                        <tr key={farm.id} onClick={() => setSelectedFarm(farm)}>
                            <td>{farm.name}</td>
                            <td>{farm.location.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default FarmList;