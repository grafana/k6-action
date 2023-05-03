import http from 'k6/http';

import { Rate } from 'k6/metrics';
import { check } from 'k6';

const failRate = new Rate('failed_requests');

export const options = {
  thresholds: {
    failed_requests: ['rate<=0'],
    http_req_duration: ['p(95)<500'],
  },
  ext: {
    loadimpact: {
      projectID: 3542013,
    },
  },
};

export default function () {
  const result = http.get('https://test-api.k6.io');
  check(result, {
    'http response status code is 200': result.status === 200,
  });
  failRate.add(result.status !== 200);
}
