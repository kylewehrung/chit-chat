import React from 'react';
import styled from 'styled-components';
import useAuthentication from '../hooks/useAuthentication';



const HomePage = () => {
  const { logout } = useAuthentication();

  
  return (
    <Container>
      <Header>
        <Logo>Chit Chat</Logo>
          <button onClick={logout}>Logout</button> {/* Logout button */}
      </Header>

      {/* Create Chit-Chat Section */}
      <Section className="create-post">
        <textarea placeholder="Add audio clip" disabled></textarea>
        <div className="post-actions">
          <input type="file" accept="audio/*" />
          <button disabled>Post</button>
        </div>
      </Section>

      {/* Timeline */}
      <Section className="timeline">
        {/* Scrollable section for user posts */}
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {/* Example post */}
          <Post>
            <img src="placeholder-user-image.jpg" alt="User Profile" />
            <div className="post-content">
              <span className="username">Username</span>
              <span className="time">2 hours ago</span>
              <AudioCard>
                <AudioIcon>🔊</AudioIcon>
                {/* Example audio clip */}
                <audio controls>
                  <source src="example-audio.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </AudioCard>
            </div>
          </Post>
          {/* Additional posts */}
        </div>
      </Section>


  
       <Section className="timeline">
        <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {/* Example post # 2 */}
          <Post>
            <img src="placeholder-user-image.jpg" alt="User Profile" />
            <div className="post-content">
              <span className="username">Username</span>
              <span className="time">2 hours ago</span>
              <AudioCard>
                <AudioIcon>🔊</AudioIcon>
                {/* Example audio clip */}
                <audio controls>
                  <source src="example-audio.mp3" type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
              </AudioCard>
            </div>
          </Post>
        </div>
      </Section>
    </Container>
  );
};


// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
`;

const Logo = styled.div`
  font-size: 24px;
`;


const Section = styled.section`
  margin-top: 20px;
  width: 80%;
`;

const Post = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const AudioCard = styled.div`
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  margin-right: 10px;
`;

const AudioIcon = styled.span`
  font-size: 24px;
`;



export default HomePage;
