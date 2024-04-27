import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Paginate from "./Paginate";
import DataRow from "./DataRow";

function DataTable({ columns, data, fetchData}){

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10); // número de elementos por página

    // Calcular índices de los elementos a mostrar en la página actual
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Calcular números de página
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data.length / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleClick = (number) => {
        setCurrentPage(number);
    };

    return(
        <>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                    {
                        columns.map((column) =>(
                            <th key={column.id}>{column.name}</th>
                            ))
                    }
                            <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        currentItems.map(item => (
                            <DataRow
                                key={item.id}
                                columns={columns}
                                item={item}
                                /*
                                onView={() => handleView(item)}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleDelete(item.id)}
                                onRecover={() => handleRecover(item.id)}
                                permissionsOfUser = { permissionsOfUser }*/
                            />
                        ))
                    }
                </tbody>
            </Table>
            <Paginate currentPage={currentPage} pageNumbers={pageNumbers} handleClick={handleClick}/>
        </>
    );
}
export default DataTable;