import { useState, useContext } from "react";

import Modal from "./Modal";
//hook given to us by the react-router
import { useParams, useNavigate } from "react-router-dom";
// useMutataions are used for teh post in the react
import { useQuery } from "@tanstack/react-query";
//it is used in the xport statement below
import ErrorBoundary from "./ErrorBoundary";
import AdoptedPetContext from "./AdoptedPetsContext";
import Carousel from "./Carousel";
import fetchPet from "./fetchPets";

const Details = () => {
	const { id } = useParams();
	//this is a function which allows use to navigate to other page which we pulled out of routerDom
	const navigate = useNavigate();
	const [_, setAdoptedPet] = useContext(AdoptedPetContext);
	const [showModal, setShowModal] = useState(false);
	// details will have the cached thing from the fetchPets so, the details, id will be passed to the
	// fetchPets
	// we can put more things after , and it will be taken care off when you put it in react-query
	const results = useQuery(["details", id], fetchPet);

	//if we get an error
	if (results.isError) {
		return <h1>Oh No!</h1>;
	}
	//This will be called when the firts load is happening as next time it will becched hence no need
	// and after this we can assume that we have got the data from the api and we can moe to the render
	//part that is the return part.
	if (results.isLoading) {
		return (
			<div className="loading-pane">
				<h2 className="loader">🍥</h2>
			</div>
		);
	}

	const pet = results.data.pets[0];

	return (
		<div className="details">
			{/* this is the class based Component */}
			<Carousel images={pet.images} />
			<div>
				<h1>{pet.name}</h1>
				<h2>
					{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}
					<button onClick={() => setShowModal(true)}>
						Adopt {pet.name}
					</button>
					<p>{pet.description}</p>
					{showModal ? (
						<Modal>
							{/* this all will go to the modal and be on it */}
							<div>
								<h1>Would you like to adopt {pet.name}?</h1>
								<div className="buttons">
									<button
										onClick={() => {
											setAdoptedPet(pet);
											//we ued it here 😊
											navigate("/");
										}}>
										Yes
									</button>
									<button onClick={() => setShowModal(false)}>
										No
									</button>
								</div>
							</div>
						</Modal>
					) : null}
				</h2>
			</div>
		</div>
	);
};

// this is where errorboundary is used
export default function DetailsErrorBoundary(props) {
	return (
		<ErrorBoundary>
			<Details {...props} />
		</ErrorBoundary>
	);
}
