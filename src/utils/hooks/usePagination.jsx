import { isEmpty } from 'lodash';
import React, { useMemo, useEffect, useState, useCallback } from 'react';

const usePagination = (data, pageSize) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [recentData, setData] = useState([]);

  const [size, setPageSize] = useState(pageSize);

	useEffect(() => {
		setData(data);
     console.log(data);
	}, [data]);

	const getTotalPage = useMemo(() => {
		if (!isEmpty(data)) {
			if (size > 5) {
				return Math.ceil(data.length / size);
			} else {
				return Math.ceil(data.length / pageSize);
			}
		} else {
			return currentPage;
		}
	}, [data, pageSize, currentPage, size]);

	const paginationHandler = useCallback(
		(action) => {
			setCurrentPage((prevPage) => {
				if (action.toLowerCase().includes('prev') && prevPage > 1) {
					return prevPage - 1;
				} else if (action.toLowerCase().includes('next') && prevPage < getTotalPage) {
					return prevPage + 1;
				} else {
					return prevPage;
				}
			});
		},
		[getTotalPage],
	);

	const paginated = useMemo(() => {
		if (!isEmpty(data)) {
			let pageList = recentData?.slice((currentPage - 1) * size, currentPage * size);

			return pageList;
		} else {
			return [];
		}
	}, [recentData, currentPage, size]);


  const pageSortSize = useMemo(()=>{
    if(!isEmpty(data)){

      let data = [5,10,25,100];
    
      if(recentData.length >= 5){
          return data;
          
      }
    }
    
  },[recentData])


  const pageDisplayContinues = useMemo(() => {
		let data = [];



		for (let i = 1; i <= getTotalPage; i++) {
			data.push(i);
		}

		// Logic to determine which pages to display
		if (currentPage <= 5) {
			// If current page is within the first set of 6 pages
			return data.slice(0, Math.min(getTotalPage, 5)); // Display up to 6 pages or all if less
		} else {
			// Calculate the starting index of the current group of 6 pages
			let start = Math.floor((currentPage - 1) / 5) * 5;
			// Display the next 6 pages after current page's group
			return data.slice(start, Math.min(start + 5, getTotalPage));
		}
	}, [getTotalPage, currentPage]);

    
	return { totalPage: getTotalPage, paginatedRecord: paginated, paginationHandler: paginationHandler, currentPage, setPageSize: setPageSize, pageSortSize: pageSortSize, pageDisplayContinues: pageDisplayContinues, setData: setData };
};

export default usePagination;
