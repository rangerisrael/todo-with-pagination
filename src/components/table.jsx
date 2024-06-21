import { isEmpty, startCase } from 'lodash'
import React from 'react'

const RenderTable = ({headers,bodies}) => {
  return (
		<table>
			<thead>
				{!isEmpty(headers) &&
					headers.map((head, headIndex) => (
						<th className='border-b border-1 border-slate-300' key={headIndex}>
							{startCase(head)}
						</th>
					))}
			</thead>

			<tbody>
				{!isEmpty(bodies) ? (
					bodies.map((rows, rowIndex) => (
						<tr key={rowIndex}>
							{rows.map((cellContent, cellIndex) => (
								<td key={cellIndex} className='px-4 text-center border-b border-1 border-slate-300'>
									{cellContent}
								</td>
							))}
						</tr>
					))
				) : (
					<tr>
						<td className='text-red-500 text-center' colSpan={headers.length}>
							No data found
						</td>
					</tr>
				)}
			</tbody>
		</table>
	);
}

export default RenderTable
