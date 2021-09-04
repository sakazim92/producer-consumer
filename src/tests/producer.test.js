const axios = require('axios')
const config = require('../utils/config.utility')

describe('Producer', () => {

  it('should process the generate request', async () => {
    const res = await axios.get(`http://localhost:${config.PRODUCER_PORT}/generate`)  
    expect(res.status).toEqual(200);
    expect(res.data).toContain('Generated Expression');
  });
});
