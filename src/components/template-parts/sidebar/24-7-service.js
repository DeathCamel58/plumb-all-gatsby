import React from "react"
import { Col, Row } from "react-bootstrap";
import { Link } from "gatsby";

const TwentyFourSeven = () => {
    return (
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">

                <h3 className="card-title">24/7 Service</h3>
                <p className="card-text">We're here to help you with plumbing emergencies anytime, day or night. Our expert plumbers are just a phone call away.</p>

                <Row>
                    <Col>
                        <Link to="/contact/" className="btn btn-primary">Contact Us!</Link>
                    </Col>
                    <Col className="text-end">
                        <a href="tel:+17709143877" className="btn btn-primary">(770) 914-3877</a>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default TwentyFourSeven
