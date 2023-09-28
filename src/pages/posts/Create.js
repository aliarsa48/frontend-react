import React, { useState } from 'react'; // Import React along with useState
import { Card, Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [validation, setValidation] = useState({});
  const navigate = useNavigate();

  const storePost = async (e) => {
    e.preventDefault();

    try {
      // Send data to the server using async/await instead of .then()/.catch()
      await axios.post('http://localhost:3000/api/posts/store', {
        title: title,
        content: content,
      });

      // Redirect upon successful submission
      navigate('/posts');
    } catch (error) {
      // Assign validation errors to state
      if (error.response && error.response.data) {
        setValidation(error.response.data);
        console.log(error.response.data)
      } else {
        // Handle unexpected errors here
        console.error('An unexpected error occurred:', error);
      }
    }
  };

  return (
    <Container className="mt-3">
      <Row>
        <Col md={12}> {/* Use curly braces for expression */}
          <Card className="border-0 rounded shadow-sm">
            <Card.Body>
              {validation.errors && (
                <Alert variant="danger">
                  <ul className="mt-0 mb-0">
                    {validation.errors.map((error, index) => (
                      <li key={index}>{`${error.path} : ${error.msg}`}</li>
                    ))}
                  </ul>
                </Alert>
              )}

              <Form onSubmit={storePost}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>TITLE</Form.Label>
                  <Form.Control
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Masukkan Title"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>CONTENT</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Masukkan Content"
                  />
                </Form.Group>

                <Button variant="primary" type="submit">
                  SIMPAN
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default CreatePost;
