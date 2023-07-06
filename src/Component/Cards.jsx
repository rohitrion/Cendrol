

import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import ReactLoading from "react-loading";

const Cards = () => {
    const [cardData, setCardData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [joke, setJoke] = useState("");
    const [modalShow, setModalShow] = useState(false);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        // Fetch data from API
        fetch("https://api.chucknorris.io/jokes/categories")
            .then((response) => response.json())
            .then((data) => setCardData(data))
            .catch((error) => console.error(error));
    }, []);

    const fetchRandomJoke = async () => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://api.chucknorris.io/jokes/random?category=${selectedCategory}`
            );
            const data = await response.json();
            setJoke(data.value);
        } catch (error) {
            console.error("Error fetching random joke:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
        setModalShow(true);
        fetchRandomJoke();
    };

    const handleCloseModal = () => {
        setModalShow(false);
        setJoke("");
    };

    const handleNextJoke = () => {
        setLoading(true);
        fetchRandomJoke();
    };

    if (cardData.length === 0) {
        return (
            <div className=" d-flex justify-content-center text-center ">
                <ReactLoading type="bars" color="white" height={"15%"} width={"15%"} />
            </div>
        );
    }

    return (
        <div className="container">
            <div className="row">
                {cardData.map((category) => (
                    <div className="col-md-3 mb-3" key={category}>
                        <Card
                            onClick={() => handleCategoryClick(category)}
                            className="d-flex justify-content-center align-items-center card-zoom  "
                            style={{ width: "15rem", height: "10rem"  }}
                        >
                            <Card.Body>
                                <Card.Title
                                    className="text-center l pt-3"
                                    style={{
                                        color: "#1E3A8A",
                                        fontSize: "20px",
                                        fontWeight: "bold"
                                    }}
                                >
                                    {category.toUpperCase()}
                                </Card.Title>
                                <Card.Text
                                    className="text-center m "
                                    style={{ color: "#6B21A8", fontSize: "15px" }}
                                >
                                    Unlimited Jokes On {category.toUpperCase()}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </div>
                ))}
            </div>
            {modalShow && (
                <Modal

                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={modalShow} // Add show prop to control the visibility of the modal
                    onHide={handleCloseModal} // Specify the function to close the modal when the backdrop is clicked
                >
                    <Modal.Header className="modall " closeButton >
                        <Modal.Title className="contained-modal-title-vcenter  text-3xl">
                            {selectedCategory.toUpperCase()}
                        </Modal.Title>
                    </Modal.Header>

                    <Modal.Body className="modall" >
                        {loading ? (
                            <div className="d-flex justify-content-center">
                                <ReactLoading type="bars" color="white" />
                            </div>
                        ) : (
                            <p className="p " >{joke}</p>
                        )}
                    </Modal.Body>
                    <Modal.Footer className="text-center d-flex justify-content-center modall " >
                        <Button className="b" onClick={handleNextJoke}> {loading ? "Loading..." : "Next"}</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default Cards;
