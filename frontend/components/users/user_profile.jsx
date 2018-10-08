import React from 'react';

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoFile: null,
      photoUrl: null
    };
    this.handleFile = this.handleFile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFile(e) {
    const file = e.currentTarget.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      this.setState({
        photoFile: file,
        photoUrl: fileReader.result
      });
    };
    if (file) {
      fileReader.readAsDataURL(file);
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    if (this.state.photoFile) {
      formData.append('user[photo]', this.state.photoFile);
    } else {
      formData.append('user[password]', "short");
    }
    $.ajax({
      url: `/api/users/${this.props.currentUser.id}`,
      method: 'PATCH',
      data: formData,
      contentType: false,
      processData: false
    }).then(
      response => console.log(response),
      response => console.log(response)
    );
  }

  render() {
    console.log(this.state);
    const preview = this.state.photoUrl ? <img src={this.state.photoUrl} /> : null;
    return (
      <form onSubmit={this.handleSubmit}>
        <h2>Choose a dope prof pic</h2>
        <input
          type="file"
          onChange={this.handleFile}
          />
        <h3>Image Preview</h3>
        {preview}
        <input
          type="submit"
          value="Upload Photo"
          />
      </form>
    );
  }
}

export default UserProfile;
