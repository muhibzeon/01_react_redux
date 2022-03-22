import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    console.log(meta);
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} autoComplete="off" />
        {this.renderError(meta)}
      </div>
    );
  };

  onSubmit = (formValues) => {
    //event.preventDefault();//redux form willl take care of this
    //console.log(formValues);
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
        className="ui form error"
      >
        <Field name="title" component={this.renderInput} label="Enter Title" />
        <Field
          name="description"
          component={this.renderInput}
          label="Enter Description"
        />

        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = (formValues) => {
  const errors = {};
  if (!formValues.title) {
    //will run if there is no title enetered
    errors.title = "You must enter a title"; //here the names are identical "name" from the Field property. Thats how the value is passed to the renderInput function
  }

  if (!formValues.description) {
    errors.description = "You must enter a description"; //So its totally about the Field name. they must be similar
  }

  return errors;
};

const formWrapped = reduxForm({
  form: "streamCreate", //name can be capitalized or any form
  validate,
})(StreamCreate);

export default connect(null, { createStream })(formWrapped);
