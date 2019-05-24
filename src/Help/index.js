import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import HelpHtml from './helphtml';

const HelpPage = () =>
  <div className="mb-4">
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
        <div className="bg-light align-self-baseline border rounded w-100 p-4">
            <HelpHtml/> 
        </div>
        </Col>
        </Row>      
      </Container>
  </div>


export default HelpPage;