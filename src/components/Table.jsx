import React from 'react';

const Table = ({ columns, data, actions }) => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-2 text-left dark:bg-meta-4">
                            {columns.map((col, index) => (
                                <th key={index} className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                                    {col.header}
                                </th>
                            ))}
                            {actions && <th className="py-4 px-4 font-medium text-black dark:text-white">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                {columns.map((col, colIndex) => (
                                    <td key={colIndex} className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                                        {col.render ? col.render(row) : (
                                            <p className="text-black dark:text-white">{row[col.accessor]}</p>
                                        )}
                                    </td>
                                ))}
                                {actions && (
                                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                                        <div className="flex items-center space-x-3.5">
                                            {actions(row)}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Table;
