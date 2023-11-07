import React, { useState, useRef, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import Spinner from "react-spinkit";

const FreeEstimates = () => {
    // Stuff for handling loading display while the iframe is loading
    const [iframeLoading, setIframeLoading] = useState(true);

    // Stuff for handling the visibility of the modal
    const [workRequestVisible, setWorkRequestVisible] = useState(false);

    const workRequestOpen = () => {
        setIframeLoading(true);
        setWorkRequestVisible(true);
    };
    const workRequestClose = () => setWorkRequestVisible(false);


    // Stuff for handling dynamically resizing the modal to the size Jobber requests
    const [modalSize, setModalSize] = useState("492px");
    const updateModalSize = (size) => setModalSize(size);

    // Stuff for receiving events from Jobber's iframe
    const iframeRef = useRef(null);
    const handleIframeEvent = (event) => {
        // Your event handling code here
        if (event.origin === "https://clienthub.getjobber.com") {

            // Once we get the first iframe event, the iframe is loaded.
            if (iframeLoading) {
                setIframeLoading(false);
            }

            switch (event.data) {
                case "scrolltop":
                    // TODO: Add a function to handle this event
                    break;
                case "close":
                    workRequestClose();
                    break;
                default:
                    if (event.data.endsWith("px")) {
                        updateModalSize(event.data);
                    }
                    break;
            }
        }
    };

    const addMessageListener = (iframe) => {
        if (iframe) {
            window.addEventListener('message', handleIframeEvent);
        }
    };

    useEffect(() => {
        addMessageListener(iframeRef.current);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('message', handleIframeEvent);
            if (iframeRef.current) {
                iframeRef.current.onload = null; // Remove the onload event handler
            }
        };
    });

    return (
        <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
            <div className="col p-4 d-flex flex-column position-static">

                <h3 className="card-title">Free Estimates</h3>
                <p className="card-text">We offer free estimates to help you get a clear understanding of your plumbing project's scope and cost. Requesting an estimate is quick and easy—simply click the link below to take the first step toward quality plumbing solutions tailored to your needs.</p>

                <Button onClick={workRequestOpen}>Book Online</Button>

                <Modal size="lg" show={workRequestVisible} onHide={workRequestClose}>
                    <Modal.Body>
                        <div style={{width: "100%", height: modalSize}} className={iframeLoading ? "" : "d-none"}>
                            <Spinner
                                name='wordpress'
                                color="#2255ce"
                                className={"position-absolute top-50 start-50"}
                                fadeIn="none"
                            />
                        </div>
                        <iframe
                            ref={(iframe) => {
                                iframeRef.current = iframe;
                                addMessageListener(iframe);
                            }}
                            title="Work Request"
                            src="https://clienthub.getjobber.com/client_hubs/4015938f-cada-4cbe-9e0f-3fa27b028598/public/work_request/embedded_dialog_new"
                            width="100%"
                            height={modalSize}
                            className={iframeLoading ? "d-none" : ""}
                        ></iframe>
                    </Modal.Body>
                </Modal>
            </div>
        </div>
    );
}

export default FreeEstimates
