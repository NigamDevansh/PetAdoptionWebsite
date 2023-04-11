import { useEffect, useRef } from "react";
//this is methods given to us by reactdom for more check notes.
import { createPortal } from "react-dom";

//if there are children then it is going to pass it through else doesn't matter
const Modal = ({ children }) => {
	// by default it is null and is basically telling that we wnat the same div every time we call it
	// or basically something which we want to have back when we call it not the different one as everytime
	// it will call in general i will create a new div but with use ref it will call the same something

	// best way
	const elRef = useRef(null);
	if (!elRef.current) {
		elRef.current = document.createElement("div");
	}

	useEffect(() => {
		const modalRoot = document.getElementById("modal");
		modalRoot.appendChild(elRef.current);
		// this will run before it totally unmountes hence in this case it will totally removes the modal
		return () => modalRoot.removeChild(elRef.current);
	}, []);

	// return createPortal(children);
	//it basically in return wants the what to render and where to render which will directly push it theres
	return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
