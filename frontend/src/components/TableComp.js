import { useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useQueryClient, useMutation } from 'react-query';
import { OptionModal } from '../components/OptionModal.js';
import CenterModal from './CenterModal.js';

export default function TableComp({
  title,
  tableRows,
  data,
  search,
  rowsPerPage,
  addBar,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [modalShow, setModalShow] = useState(false);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // how data is filterd to search
  const filterData = () => {
    return data.filter((tableData) =>
      Object.values(tableData).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  const totalPages = Math.ceil(filterData().length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const currentData = filterData().slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationControls = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={
            currentPage === i
              ? 'text-center active pagination-btn pagination-btn-active'
              : 'pagination-btn '
          }
        >
          {i}
        </button>
      );
    }

    return (
      <div className="d-flex justify-content-center align-items-center">
        <button
          className="pagination-btn "
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          <span className="pt-2 material-symbols-outlined">arrow_back_ios</span>
        </button>
        {pageNumbers}
        <button
          className="pagination-btn"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          <span className="pt-2 ps-2 material-symbols-outlined">
            arrow_forward_ios
          </span>
        </button>
      </div>
    );
  };

  const updateItemDeliverey = async (text, data) => {
    if (text === 'Delivered') {
      try {
        await axios.put('/api/orders/updateDeliverey', {
          id: data.Order_Id,
          orderItemName: data.Product_Name,
          status: text,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        await axios.put('/api/orders/updateDeliverey', {
          id: data.Order_Id,
          orderItemName: data.Product_Name,
          status: text,
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const queryClient = useQueryClient();

  const updateItemToNotDeliveredMutation = useMutation(
    (data) => updateItemDeliverey('Undelivered', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
    }
  );

  const updateItemToDeliveredMutation = useMutation(
    (data) => updateItemDeliverey('Delivered', data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('orders');
      },
    }
  );

  function tableDataLoop(data) {
    const tableCells = [];
    for (let i = 0; i < tableRows.length; i++) {
      if (data.Status && tableRows[i] === 'Status') {
        tableCells.push(
          <td key={i}>
            <div className="p-3">
              {data[tableRows[i]] === 'Delivered' ? (
                <Badge
                  bg="success"
                  onClick={() => {
                    OptionModal(
                      updateItemToNotDeliveredMutation,
                      data,
                      'Are you sure you want to undeliver this item ?',
                      'This customer now knows that their item is undelivered.',
                      'This customer still knows that their item is not delivered.'
                    );
                  }}
                  className="p-2 pointer"
                  pill
                >
                  {data[tableRows[i]]}
                </Badge>
              ) : (
                <Badge
                  bg="danger"
                  onClick={() => {
                    OptionModal(
                      updateItemToDeliveredMutation,
                      data,
                      'Are you sure you want to deliver this item ?',
                      'This customer now knows that their item is delivered.',
                      'This customer still knows that their item is delivered.'
                    );
                  }}
                  className="p-2 pointer"
                  pill
                >
                  {data[tableRows[i]]}
                </Badge>
              )}
            </div>
          </td>
        );
      } else if (data.image && tableRows[i] === 'image') {
        tableCells.push(
          <td key={i}>
            <div className="d-flex justify-content-center align-items-center">
              <img
                src={data[tableRows[i]]}
                alt=""
                style={{ width: '45px', height: '45px' }}
                className="rounded-circle"
              />
            </div>
          </td>
        );
      } else if (data.Customer_Email && tableRows[i] === 'Customer_Name') {
        tableCells.push(
          <td key={i}>
            <p className="fw-bold mb-1">{data[tableRows[i]]}</p>
            <p className="text-muted mb-0">{data.Customer_Email}</p>
          </td>
        );
      } else {
        tableCells.push(
          <td key={i}>
            <p className="fw-normal p-3  mb-1">{data[tableRows[i]]}</p>
          </td>
        );
      }
    }

    return tableCells;
  }

  return (
    <div className="pe-4 mt-3 mb-5">
      <h1 className="mt-3">{title}</h1>
      {search && (
        <div className="d-flex justify-content-end">
          <div className="input-group mb-3 rounded" style={{ width: '250px' }}>
            <input
              type="search"
              className="form-control rounded"
              placeholder="Search"
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={handleSearch}
            />
            <span className="input-group-text border-0" id="search-addon">
              <i className="fas fa-search"></i>
            </span>
          </div>
        </div>
      )}
      <Card className="table-responsive">
        <table className="">
          <thead>
            <tr className="text-center">
              {tableRows.map((tableHeaders, index) => (
                <th key={index} className="p-3 bg-light">
                  {tableHeaders}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="p-2">
            {currentData.map((tableData, index) => (
              <tr key={index} className="text-center border-bottom">
                {tableDataLoop(tableData)}
              </tr>
            ))}
          </tbody>
        </table>
        {addBar === 'true' ? (
          <div>
            <div
              className="text-center pt-1 add-hover"
              onClick={() => setModalShow(true)}
            >
              <span className="material-symbols-outlined fs-2">add</span>
            </div>
            <CenterModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        ) : (
          <div></div>
        )}
      </Card>
      {renderPaginationControls()}
    </div>
  );
}
