import React from "react";
import Menu from "./Menu";

const Base = ({
    title = "My Title",
    decription = "My Description",
    className = "text-white p-4",
    children
}) => {
    return(
        <div>
        <Menu/>
          <div className = "container-fluid">
            <div className = "jumbotron text-white text-center">
              <h2 className = "dispaly-4">{title}</h2>
              <p className = "lead">{decription}</p>
            </div>
            <div className = {className}>{children}</div>
          </div>
          <footer className = "footer mt-auto py-3">
            <div className = "container-fluid bg-success text-white text-center py-3">
              <h4>If you get any quetions feel free to reach out!</h4>
              <buutton className = "btn btn-warning btn-large">Contact Us</buutton>
            </div>
            <div className = "container">
              <span className = "text-muted">An amazing place to buy <span className = "text-white">tshirt</span></span>
            </div>
          </footer>
        </div>
    )
}

export default Base;