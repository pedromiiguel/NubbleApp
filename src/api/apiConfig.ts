import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:3333',
  headers: {
    Authorization:
      'Bearer MQ.wuahDLFI0FVLrqKLq1UJ3pIqFB2yApVpfds20a8p3Sg8r5NZUfTfLQ8wPq2W',
  },
});
