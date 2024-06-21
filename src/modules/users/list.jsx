import React from 'react'
import { useContext } from 'react'

import { isEmpty } from 'lodash';
import RenderTable from '../../components/table';

import FormField from './forms';
import { UserContext } from '../../utils/providers/userProvider';
import usePagination from '../../utils/hooks/usePagination';
import clsx from 'clsx';

const UserList = () => {

const { users, setModal, deleteUser, filterUser } = useContext(UserContext);


const { totalPage, paginatedRecord, paginationHandler, currentPage, pageSortSize, setPageSize, pageDisplayContinues,setData } = usePagination(users, 5);


console.log(pageDisplayContinues);

// header
const thead = ['id','name','email','address','profile','action'];



// body
const tbody =
	!isEmpty(paginatedRecord) &&
	paginatedRecord.map((row) => [
		row.uuid,
		row.fullName,
		row.email,
		row.address,
		<img src={row.profile} alt='profile' width={60} height={60} className='rounded-full shadow-md p-1' />,
		<p className='flex justify-center gap-2'>
			<span onClick={() => setModal({ toggle: true, action: 'edit', user: row })}>Edit</span>
			<span onClick={() => deleteUser(row.uuid)}>Delete</span>
		</p>,
	]);

  return (
		<div className='flex flex-col justify-center mt-5'>
			{/* search  */}
			<div className='flex gap-2 justify-center my-5 w-full '>
				<label htmlFor='filter'>Search</label>
				<input className='w-full h-[34px] px-5 rounded-md border border-1 border-gray-300' type='search' name='filter' id='filter' onChange={(e) => filterUser(e.target.value)} />
			</div>

			{/* table */}
			<RenderTable headers={thead} bodies={tbody} />
			{/* end tablre */}

			<div className='flex justify-between items-center'>
				<div className='flex gap-2 justify-start items-center my-3'>
					<span
						className={clsx('text-indigo-500 font-medium cursor-pointer', {
							'text-slate-300': currentPage == 1,
						})}
						onClick={() => paginationHandler('prev')}
					>
						{'<'}
					</span>
					{!isEmpty(pageDisplayContinues) &&
						pageDisplayContinues.map((counter, i) => (
							<>
								<button
									key={i}
									className={clsx('w-[2rem] h-[2rem] rounded-full text-white font-semibold', {
										'bg-indigo-800': counter == currentPage,
										'bg-slate-300': counter != currentPage,
									})}
								>
									{counter}
								</button>
								{currentPage < totalPage - 4 && i == pageDisplayContinues.length - 1 && <span>...</span>}
								{currentPage < totalPage - 4 && i == pageDisplayContinues.length - 1 && <button className={clsx('w-[2rem] h-[2rem] rounded-full text-white font-semibold bg-slate-300')}>{totalPage}</button>}
							</>
						))}
					<span
						className={clsx('text-indigo-500 font-medium cursor-pointer', {
							'text-slate-300': currentPage == totalPage,
						})}
						onClick={() => paginationHandler('next')}
					>
						{'>'}
					</span>
				</div>
				<div className='flex gap-2 justify-end my-3'>
					<span>Rows per page</span>

					<span>
						<select
							name='sorting'
							id='sorting'
							className='border border-1 border-slate-300 rounded-md'
							onChange={(e) => {
								setData(users);
								setPageSize(e.target.value);
							}}
						>
							{pageSortSize?.map((value, i) => (
								<option key={i} value={value}>
									{value}
								</option>
							))}
						</select>
						&nbsp;
						{currentPage} - {totalPage} of {users.length}
					</span>
					<span
						className={clsx('text-indigo-500 font-medium cursor-pointer', {
							'text-slate-300': currentPage == 1,
						})}
						onClick={() => paginationHandler('prev')}
					>
						{'<'}
					</span>
					<span
						className={clsx('text-indigo-500 font-medium cursor-pointer', {
							'text-slate-300': currentPage == totalPage,
						})}
						onClick={() => paginationHandler('next')}
					>
						{'>'}
					</span>
				</div>
			</div>

			<FormField />
		</div>
	);
}

export default UserList
