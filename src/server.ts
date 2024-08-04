import app from './app';
import { PORT } from './utils/constants'
import { Amplify } from 'aws-amplify';
import awsconfig from './config/aws-exports';

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Configure AWS Amplify with the settings provided in awsconfig
Amplify.configure(awsconfig);

