// this is the component for the footer that will be displayed on the bottom of the page

import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-success text-white text-center p-3">
      <div className="container">
        <div className="row">
          <div className="col-md-6">© Proveeagro 2024</div>
        </div>
      </div>
    </footer>
  );
}
