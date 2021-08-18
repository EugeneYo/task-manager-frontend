import { createStandaloneToast } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import theme from '../myTheme';

const useToast = ({ isError, isSuccess, error, errorDescription, successTitle, successDescription }) => {
	const toast = createStandaloneToast({ theme });
	useEffect(() => {
		if (isError) {
			console.log(error);
			if (error.status === 'FETCH_ERROR') {
				var errorMessage = 'Network Error';
			} else if (typeof error.status === 'number') {
				errorMessage = error.data.error;
			} else {
				errorMessage = errorDescription;
			}
			toast({
				title: 'Error',
				description: `${errorMessage}`,
				status: 'error',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		}
	}, [isError]);

	useEffect(() => {
		if (isSuccess) {
			toast({
				title: successTitle,
				description: successDescription,
				status: 'success',
				duration: 3000,
				isClosable: true,
				position: 'top',
			});
		}
	}, [isSuccess]);
};

export default useToast;
