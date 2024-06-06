import React from "react";
import { Map } from "../Maps";

function FarmForm() {
    return (
        <div className="container mt-5">
            <div className="row d-flex justify-content-center align-items-center">
                <div className="col-md-6 pb-5 text-white">
                    <h3>Añadir nueva finca</h3>

                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nombre</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                id="name"
                                required
                            />
                            <label htmlFor="address">Dirección</label>
                            <input
                                type="text"
                                className="form-control mb-2"
                                id="address"
                                required
                            />
                            <h4>Selecciona la ubicación en el mapa</h4>

                            <Map />

                        </div>
                        <div className="d-flex justify-content-center align-items-center mt-3">
                            <button type="submit" className="btn btn-success">
                                Añadir finca
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FarmForm;