import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TableComponent.css';
import { Input } from '../Index';

const TableComponent = ({
  tableHeaders,
  tableData,
  sortableField,
  searchable,
  statusFilterOptions,
  actionButton,
  currentPage,
  totalPages, 
  onPageChange,
  rowsPerPage,
  onSearchChange,
  onSortChange,   
  totalTasks
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [statusFilter, setStatusFilter] = useState('All');

  const handleSort = (field) => {
    const newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    setSortOrder(newSortOrder);
    onSortChange(field, newSortOrder);
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearchChange(e.target.value); 
  };

  const renderPagination = () => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    return (
      <div className="pagination-controls">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={page === currentPage ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="table-container">
      <div className="search-filter-container">
        {searchable && (
          <Input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        )}

        {statusFilterOptions && (
          <select
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All</option>
            {statusFilterOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="table-or-cards">
        {tableData.length > 0 ? (
          <>
            <table className="custom-table">
              <thead>
                <tr>
                  {tableHeaders.map((header) => (
                    <th key={header.field} onClick={() => handleSort(header.field)}>
                      {header.label}
                      {sortableField === header.field && (
                        <span>{sortOrder === 'asc' ? ' 🔼' : ' 🔽'}</span>
                      )}
                    </th>
                  ))}
                  {actionButton && <th>Actions</th>}
                </tr>
              </thead>
              <tbody>
                {tableData.slice(0, rowsPerPage).map((row, index) => (
                  <tr key={index}>
                    {tableHeaders.map((header) => (
                      <td key={header.field}>{row[header.field]}</td>
                    ))}
                    {actionButton && <td>{actionButton(row)}</td>}
                  </tr>
                ))}
              </tbody>
            </table>

            {renderPagination()}
          </>
        ) : (
          <p>No data available</p>
        )}

        {tableData.length > 0 &&
          tableData.map((row, index) => (
            <div className="card-view" key={index}>
              {tableHeaders.map((header) => (
                <div key={header.field} className="card-row">
                  <strong>{header.label}:</strong> {row[header.field]}
                </div>
              ))}
              {actionButton && (
                <div className="card-actions">{actionButton(row)}</div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

TableComponent.propTypes = {
  tableHeaders: PropTypes.arrayOf(
    PropTypes.shape({
      field: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortableField: PropTypes.string,
  searchable: PropTypes.bool,
  statusFilterOptions: PropTypes.arrayOf(PropTypes.string),
  actionButton: PropTypes.func,
  currentPage: PropTypes.number.isRequired, 
  totalPages: PropTypes.number.isRequired, 
  onPageChange: PropTypes.func.isRequired,
  rowsPerPage: PropTypes.number.isRequired,  
  onSearchChange: PropTypes.func.isRequired,
  onSortChange: PropTypes.func.isRequired,   
};

TableComponent.defaultProps = {
  sortableField: null,
  searchable: false,
  statusFilterOptions: null,
  actionButton: null,
};

export default TableComponent;
