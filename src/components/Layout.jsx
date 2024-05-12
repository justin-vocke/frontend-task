import { Component } from "react";
import { Container } from "react-bootstrap";
import { NavMenu } from "./NavMenu";
import "./styles/Layout.css";

export class Layout extends Component {
  static displayName = Layout.name;

  render() {
    return (
      <>
        <NavMenu className="nav-container" />
        <Container>{this.props.children}</Container>
        {console.log(this.props.children)}
      </>
    );
  }
}
