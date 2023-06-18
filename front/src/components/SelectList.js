import React from "react";

import Form from "react-bootstrap/Form";

function SelectList({ items, placeholder }) {
  return (
    <>
      {items.length > 0 && (
        <Form.Select aria-label={placeholder}>
          <option>{placeholder}</option>
          {items.map(({ name, value }) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Form.Select>
      )}
    </>
  );
}

export default SelectList;
