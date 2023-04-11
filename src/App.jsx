// import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
//This is mostly used for removing the useEfect from the react and the caching part which we did in
// the useBreedList.js we used it in the fetchPets.js
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AdoptedPetContext from "./AdoptedPetsContext";
import SearchParams from "./SearchParams";
import Details from "./Details";

//the below code is asking for how long do we cache the details from the pet api
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: Infinity,
			cacheTime: Infinity,
		},
	},
});

const App = () => {
	//whole hook is passed in provider
	const adoptedPet = useState(null);
	return (
		// This is where routes will be available
		<BrowserRouter>
			<QueryClientProvider client={queryClient}>
				{/* now "everyone" has the value of adopted pets and also queryclient and browserrouter
				are also using the context under the hood */}
				{/* So "" provider value={} ""its like a wormwhole anytihng can go in an pull out in any possible file */}
				{/* we are passing the whole hook that is usestate so we ahve the value as well as the function that updates the value 
				everywhere */}
				<AdoptedPetContext.Provider value={adoptedPet}>
					<header>
						{/* not anchor tag becax it will reload the complete page again */}
						<Link to="/">Adopt Me!</Link>
					</header>
					<Routes>
						{/* This will take me to the details page if this type of url is formed asin clicking the pets 
				it make the below url but will not be redirected because the it's a single page app but using 
				react-router we can make it more than that. */}
						<Route path="/details/:id" element={<Details />} />
						<Route path="/" element={<SearchParams />} />
					</Routes>
				</AdoptedPetContext.Provider>
			</QueryClientProvider>
		</BrowserRouter>
	);
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
root.render(<App />);

// We are using fetchbreed to refactor the useBreedList and then use react query in
// fetchBreed to fetch data not the useEffect

// always use results when using useQuery hook
