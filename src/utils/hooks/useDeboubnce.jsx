import React from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'

const useDebounce = (cb, delay) => {
	const argsRef = useRef();
	const timeRef = useRef();

	function clearTimer() {
		if (timeRef.current) {
			clearTimeout(timeRef.current);
		}
	}

	useEffect(() => clearTimer(), []);

	const debounceCb = (...args) => {
		argsRef.current = args;

		clearTimer();

		timeRef.current = setTimeout(() => {
			if (argsRef.current) {
				cb(...argsRef.current);
			}
		}, delay);
	};

	return debounceCb;
}

export default useDebounce;
