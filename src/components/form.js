import React from "react";

const Form = props => (
<form onSubmit={props.weatherGetter}>
        <input type="text" name="city" placeholder="Enter city" />
        <button>Get a forecast!</button>
      </form>
);
export default Form;
