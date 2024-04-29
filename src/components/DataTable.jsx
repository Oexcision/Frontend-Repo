import { useState } from "react";
import Table from "react-bootstrap/Table";

import DataRow from "./DataRow";
import Paginate from "./Paginate";

import UserModal from "./Users/UserModal";
import RoleModal from "./Roles/RoleModal";
import PermissionModal from "./Permissions/PermissionModal";
import DataModal from "./DataModal";

import axios from "axios";

import { toast } from 'react-toastify';

function DataTable({ columns, data, entity, fetchData, permissionsOfUser }){

    const apiUrl = import.meta.env.MODE === 'production'
    ? import.meta.env.VITE_REACT_APP_API_URL_PROD
    : import.meta.env.VITE_REACT_APP_API_URL_DEV;

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

    const [selectedItem, setSelectedItem] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [action, setAction] = useState('');

    const handleView = (item) => {
        setSelectedItem(item);
        setAction('view');
        setShowModal(true);
    };

    const handleEdit = (item) => {
        setSelectedItem(item);
        setAction('edit');
        setShowModal(true);
    };

    const handleDelete = (itemId) => {
        axios.delete(apiUrl + `/${entity.plural}/${itemId}`, {
            headers: {
              Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
            }
           })
            .then(response => {
                if (response.status === 200) {
                    toast.success(entity.single +' deleted successfully');
                    fetchData();
                } else {
                    throw new Error('Failed to delete '+ entity.single);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to delete '+ entity.single);
            });
    };

    const handleRecover = (itemId) => {
        axios.post(apiUrl + `/${entity.plural}/${itemId}`, {}, {
            headers: {
              Authorization: localStorage.getItem("token_type") + " " + localStorage.getItem("access_token")
            }
           })
            .then(response => {
                if (response.status === 200) {
                    toast.success(entity.single +' recover successfully');
                    fetchData();
                } else {
                    throw new Error('Failed to recover '+ entity.single);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                toast.error('Failed to recover '+ entity.single);
            });
    };


    return(
        <>
            <Table striped bordered hover variant="dark" responsive>
                <thead>
                    <tr>
                    {
                        columns.map((column) =>(
                            <th key={column.id}>{column.description}</th>
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
                                permissionsOfUser = { permissionsOfUser }
                                entity={ entity }

                                onView={() => handleView(item)}
                                onEdit={() => handleEdit(item)}
                                onDelete={() => handleDelete(item.id)}
                                onRecover={() => handleRecover(item.id)}
                            />
                        ))
                    }
                </tbody>
            </Table>

        {   entity.single=="" &&
            <DataModal
                show={showModal}
                item={selectedItem}
                action={action}
                fetchData={fetchData}
                onHide={() => setShowModal(false)}
            />
        }

        {   entity.single=="User" &&
            <UserModal
                show={showModal}
                user={selectedItem}
                action={action}
                fetchUsers={fetchData}
                onHide={() => setShowModal(false)}
            />
        }

        {   entity.single=="Role" &&
            <RoleModal
                show={showModal}
                role={selectedItem}
                action={action}
                fetchRoles={fetchData}
                onHide={() => setShowModal(false)}
            />
        }

        {   entity.single=="Permission" &&
            <PermissionModal
                show={showModal}
                permission={selectedItem}
                action={action}
                fetchPermissions={fetchData}
                onHide={() => setShowModal(false)}
            />
        }

            <Paginate currentPage={currentPage} pageNumbers={pageNumbers} handleClick={handleClick}/>
        </>
    );
}
export default DataTable;