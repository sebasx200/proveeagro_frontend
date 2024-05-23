// this is the component for the footer that will be displayed on the bottom of the page

import React from "react";
import { Link } from "react-router-dom";
import styles from "./UiComponents.module.css";

export default function Footer() {
  return (
    <footer className={`bg-success text-white text-center p-3 ${styles.footerStyle}`}>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            © Proveeagro 2024
            </div>
            <div className="col-md-4">
              Politécnico Colombiano Jaime Isaza Cadavid
            </div>
            <div className="col-md-4">
              Medellín, Colombia
            </div>
        </div>
      </div>
    </footer>
  );
}
