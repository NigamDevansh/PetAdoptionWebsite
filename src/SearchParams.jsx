import { useState, useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import useBreedList from "./useBreedList";
import Results from "./ListResults";
import fetchSearch from "./fetchSearch";
import AdoptedPetContext from "./AdoptedPetsContext";
const ANIMALS = ["bird", "dog", "cat", "rabbit", "reptile"];

// As soon as you set animal it will call the useBreedList and then the list will be loaded in the dropdown
// if not given then the use effect ewill call the lsit onece and ot again but it will call again if you set
// all of the three fields and on submit it will call just the one you set up via the fields

const SearchParams = () => {
	const [requestParams, setRequestParams] = useState({
		location: "",
		animal: "",
		breed: "",
	});
	const [animal, setAnimal] = useState("");
	const [breeds] = useBreedList(animal);
	// jsut read the adopted pets as we dont need the function
	const [adoptedpets, _] = useContext(AdoptedPetContext);

	//The initial value of requestParams is an object with all three properties set to an empty string.
	// setRequestParams is the function that is returned by the useState hook. You can use this function
	// to update the requestParams state value.When you call setRequestParams, you pass in a new value
	// for the state.In the example you provided, setRequestParams will update the requestParams state
	// value to a new object that you pass in as an argument.

	//OLD CODE WITH USEeffect
	// useEffect(() => {
	// 	requestPets();
	// }, []);

	// async function requestPets() {
	// 	const res = await fetch(
	// 		`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`,
	// 	);
	// 	const json = await res.json();

	// 	setPets(json.pets);
	// }
	//////////////////

	//We have sued requestParams and we call setRequestParams on submit as we want the fetch ot run only onsubmit
	// else ir will run everytime.
	const results = useQuery(["search", requestParams], fetchSearch);
	//^^^^the above requestparams is empty as it has empty string^^^^
	const pets = results?.data?.pets ?? [];

	return (
		<div className="search-params">
			<form
				onSubmit={(e) => {
					e.preventDefault();
					//this is function from the HTML not from react
					const formData = new FormData(e.target);
					const obj = {
						//.get is fetching the new values form the name param
						animal: formData.get("animal") ?? "",
						location: formData.get("location") ?? "",
						breed: formData.get("breed") ?? "",
					};
					//So this will again set the requestParams with current form value form the page hence uncontrolled
					// as we are not caling for any state function on change and assigning the value to it
					setRequestParams(obj);
				}}>
				{/* if we ahve a pet the show the pet */}
				{adoptedpets ? (
					<div className="pet image-container">
						<img
							src={adoptedpets.images[0]}
							alt={adoptedpets.name}
						/>
					</div>
				) : null}
				{/* /.../ */}
				<label htmlFor="location">
					Location
					<input
						id="location"
						name="location"
						placeholder="Location"
					/>
				</label>

				{/* /.../ */}
				<label htmlFor="animal">
					Animal
					<select
						id="animal"
						name="animal"
						onChange={(e) => {
							setAnimal(e.target.value);
						}}>
						{/* /.../ */}
						<option />
						{ANIMALS.map((animal) => (
							<option key={animal}>{animal}</option>
						))}
					</select>
					{/* /.../ */}
				</label>

				{/* /.../ */}
				<label htmlFor="breed">
					Breed
					<select
						id="breed"
						disabled={breeds.length === 0}
						name="breed">
						{/* /.../ */}
						<option />
						{breeds.map((breed) => (
							<option key={breed}>{breed}</option>
						))}
					</select>
					{/* /.../ */}
				</label>
				{/* /.../ */}
				<button>Submit</button>
				{/* /.../ */}
			</form>
			{/* /.../ */}
			<Results pets={pets} />
			{/* /.../ */}
		</div>
	);
};

export default SearchParams;
