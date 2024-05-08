import React from 'react';

function Paginate({ currentPage, pageNumbers, handleClick }) {
    return (
        <nav className="flex justify-center">
            <ul className="flex space-x-2">
                <li>
                    <button
                        onClick={() => handleClick(1)}
                        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        First
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => currentPage - 1 >= 1 ? handleClick(currentPage - 1) : handleClick(1)}
                        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Prev
                    </button>
                </li>
                {pageNumbers.map((number) => (
                    <li key={number}>
                        <button
                            onClick={() => handleClick(number)}
                            className={`px-3 py-1 rounded-md ${number === currentPage ? 'bg-blue-600 text-white' : 'bg-blue-200 text-blue-800 hover:bg-blue-300'}`}
                        >
                            {number}
                        </button>
                    </li>
                ))}
                <li>
                    <button
                        onClick={() => currentPage + 1 <= pageNumbers.length ? handleClick(currentPage + 1) : handleClick(pageNumbers.length)}
                        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Next
                    </button>
                </li>
                <li>
                    <button
                        onClick={() => handleClick(pageNumbers.length)}
                        className="px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Last
                    </button>
                </li>
            </ul>
        </nav>
    );
}

export default Paginate;
