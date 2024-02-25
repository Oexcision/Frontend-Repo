import Pagination from 'react-bootstrap/Pagination'

function Paginate({ currentPage, pageNumbers, handleClick }){

    return (
        <Pagination>
          <Pagination.First onClick={() => handleClick(1)} />
          <Pagination.Prev onClick={() => currentPage - 1 >= 1 ? handleClick(currentPage - 1) : handleClick(1)} />
          {pageNumbers.map((number) => (
            <Pagination.Item key={number} active={number === currentPage} onClick={() => handleClick(number)}>
              {number}
            </Pagination.Item>
          ))}
          <Pagination.Next onClick={() => currentPage + 1 <= pageNumbers.length ? handleClick(currentPage + 1) : handleClick(pageNumbers.length)} />
          <Pagination.Last onClick={() => handleClick(pageNumbers.length)} />
        </Pagination>
      );

}
export default Paginate;