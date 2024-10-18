import React from 'react';
import styled from 'styled-components';

const readBaseUrl = () => {
  const baseUrl = `${window.location.protocol}//${window.location.hostname}`;

  if (process.env.NODE_ENV === 'production') {
    return baseUrl;
  }

  return `${baseUrl}:8080`;
};

const Container = styled.div`
  max-width: 600px;
  margin: 20px auto;
`;

export default class App extends React.Component {
  state = {
    users: [],
    name: '',
  };


  async componentDidMount() {
    const req = await fetch(`${readBaseUrl()}/api/v1/users`);
    this.setState({
      users: await req.json()
    })
  }

  render() {
    return (
      <Container>
        <h2>Hello Users</h2>

        {this.state.users.map(user => (
          <div>
            {user.name}
          </div>
        ))}

        <br />
        Add New User
        <form
          onSubmit={async (e) => {
            e.preventDefault();

            await fetch(`${readBaseUrl()}/api/v1/users`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ name: this.state.name }),
            });

            const req = await fetch(`${readBaseUrl()}/api/v1/users`);
            this.setState({
              users: await req.json(),
              name: '',
            });
          }}
        >
          <input
            type="text"
            placeholder="Name"
            onChange={e => {
              this.setState({ name: e.target.value });
            }}
          />
          <button type="submit">Add</button>
        </form>
      </Container>
    );
  }
}
