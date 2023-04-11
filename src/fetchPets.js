const fetchPet = async ({ queryKey }) => {
	const id = queryKey[1];
	const apiRes = await fetch(`http://pets-v2.dev-apis.com/pets?id=${id}`);
	// react query will always want to throw error like below
	if (!apiRes.ok) {
		throw new Error(`details/${id} fetch not ok`);
	}
	// the return need to be a promise so we can do await apiRes.json()
	//or just apiRes.json both are sme as both will return a promise
	return apiRes.json();
};

export default fetchPet;
