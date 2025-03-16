import api, {initalizeApi} from './api/api';

// initalize the api
await initalizeApi();

// start the API server
const PORT = process.env.PORT || 4000;
api.listen(PORT, () => console.log(`Server running on port ${PORT}`));
