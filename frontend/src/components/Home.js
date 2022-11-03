import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";

export default function Home() {
  const history = useHistory();
  return (
    <div className="align-items-center justify-content-center">
      <Container>
        <Row>
          <Col>
            <Card
              className="mt-5 mx-auto pb-5 pt-5"
              style={{
                boxShadow: "1px 2px 9px #5621f4",
                maxWidth: "500px",
                minWidth: "300px",
                // width: "30vw",
                minHeight: "60vh",
                maxHeight: "70vh",
                fontFamily: "QuickSand",
                backgroundColor: "#4f4fff14 ",
              }}
            >
              <Card.Body>
                <Card.Title className="text-left">
                  <h1>Reschedule TT </h1>
                </Card.Title>
                <Card.Text className="text-left pl-4">
                  TIme Table HOME TAB
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
