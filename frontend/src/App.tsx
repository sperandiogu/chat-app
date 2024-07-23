import { Box, Container, CssBaseline } from '@mui/material';
import ChatPanel from './components/ChatPanel';

function App() {
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box mt={8}>
        <ChatPanel />
      </Box>
    </Container>
  );
}

export default App;
