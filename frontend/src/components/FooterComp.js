import Container from 'react-bootstrap/Container';


export default function FooterComp() {
    return (
        <div>
            <footer
          className="mt-5"
          style={{
            backgroundColor: '#252525',
            height: '170px',
            color: 'white',
          }}
        >
          <Container
            className="d-flex justify-content-md-between align-items-center flex-wrap justify-content-center"
            style={{ height: '100%' }}
          >
            <div>
              <h1 style={{ fontSize: '18px' }}>© 2023 Lawn Service</h1>
              <p>Icon by www.wishforge.games on freeicons.io</p>
              <a
                style={{ color: 'white' }}
                href="https://www.instagram.com/yardi_kitchen/"
              >
                <i
                  className="fa-brands fa-instagram"
                  style={{ fontSize: '30px' }}
                ></i>
              </a>
            </div>

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