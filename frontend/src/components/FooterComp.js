import Container from 'react-bootstrap/Container';

export default function FooterComp() {
  return (
    <div>
      <footer
        className="mt-5"
        style={{
          backgroundColor: '#252525',
          height: '120px',
          color: 'white',
        }}
      >
        <Container
          className="d-flex justify-content-md-between align-items-center flex-wrap justify-content-center"
          style={{ height: '100%' }}
        >
          <div></div>

          <div>
            <h1 style={{ fontSize: '18px' }}>
              WEB DESIGN BY LAURISSEAU JOSEPH
            </h1>
          </div>
        </Container>
      </footer>
    </div>
  );
}
