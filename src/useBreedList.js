// import { useEffect, useState } from "react";

// // for not again calling the fetch rather calling the cache as in last 13 seconds the list won't
// // be updated
// const localCache = {};

// export default function useBreedList(animal) {
// 	const [breedList, setBreedList] = useState([]);
// 	const [status, setStatus] = useState("unloaded");

// 	useEffect(() => {
// 		//no animal send
// 		if (!animal) {
// 			setBreedList([]);
// 			//first we search in the localcache and then retur nthe list
// 		} else if (localCache[animal]) {
// 			setBreedList(localCache[animal]);
// 			//if not then we call the fetch
// 		} else {
// 			requestBreedList();
// 		}

// 		async function requestBreedList() {
// 			setBreedList([]);
// 			setStatus("loading");

// 			const res = await fetch(
// 				`http://pets-v2.dev-apis.com/breeds?animal=${animal}`,
// 			);
// 			const json = await res.json();
// 			localCache[animal] = json.breeds || [];
// 			setBreedList(localCache[animal]);
// 			setStatus("loaded");
// 		}
// 	}, [animal]);

// 	return [breedList, status];
// }

import { useQuery } from "@tanstack/react-query";
import fetchBreedList from "./fetchBreedList";

// always use results when using useQuery hook
export default function useBreedList(animal) {
	const results = useQuery(["breeds", animal], fetchBreedList);

	//if we have results then call data and if that is their then call breeds
	//return the breeds array if their else return empty array
	return [results?.data?.breeds ?? []];
}
