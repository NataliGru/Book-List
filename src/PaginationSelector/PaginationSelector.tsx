import React, {  useState } from 'react';

type Props = {
  onChange: (value: number) => void;
  itemsOnPage: number;
}

export const PaginationSelector: React.FC<Props> = ({ onChange, itemsOnPage }) => {

  const onSelectChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    onChange(+event.target.value);
  };

  return (
  <div className="form-group row">
  <div className="col-3 col-sm-2 col-xl-1">
    <select
      value={itemsOnPage}
      onChange={onSelectChange}
      data-cy="perPageSelector"
      id="perPageSelector"
      className="form-control"
    >
      <option value="3">3</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
    </select>
  </div>

  <label htmlFor="perPageSelector" className="col-form-label col">
    items per page
  </label>
</div>
)}
