<div align="center">
  
  <img
    src="https://raw.githubusercontent.com/grafana/k6-action/master/k6.gif"
    width="600"
    style="pointer-events: none;" />

  <br />
  Open source load testing tool and SaaS for ambitious engineering teams.

</div>

## Getting started

It's as easy as:

### Local test

```yaml
name: Main Workflow
on: [push]
jobs:
  build:
    name: Run k6 test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run k6 local test
        uses: grafana/k6-action@v0.3.1
        with:
          filename: my-load-test.js
          flags: --vus 50 --duration 10s
```

### Cloud test

```yml
name: Main Workflow
on: [push]
jobs:
  build:
    name: Run k6 test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Run k6 cloud test
        uses: grafana/k6-action@v0.3.1
        with:
          filename: my-load-test.js
          flags: --vus 50 --duration 10s
          cloud: true
          token: ${{ secrets.K6_CLOUD_API_TOKEN }}
```

## Inputs

### Filename

```yaml
steps:
  - name: Run k6 local test
    uses: grafana/k6-action@v0.3.1
    with:
      filename: my-script-file.js
```

Sets the filename of the test script to execute. This property is relative to the workspace directory. If omitted, it defaults to `test.js`.

### Cloud

```yaml
environment: test

steps:
  - name: Run k6 cloud test
    uses: grafana/k6-action@v0.3.1
    with:
      cloud: true
      token: ${{ secrets.K6_CLOUD_API_TOKEN }}
```

Enables execution in the k6 cloud. Additional details on the k6 cloud offering are available at https://k6.io/docs/cloud/. You'll need to specify the name of the `environment` where `K6_CLOUD_API_TOKEN` secret has been defined.

### Flags

```yaml
steps:
  - name: Run k6 local test
    uses: grafana/k6-action@v0.3.1
    with:
      flags: --vus 50 --duration 10s
```

Any additional arguments or flags to pass to the k6 cli. The full list of possible options is available at https://k6.io/docs/using-k6/k6-options/reference/.

For additional information, and help getting started, see https://k6.io

### Environment Variables

Environment variables can be added the same way as you do it [locally](https://k6.io/docs/using-k6/k6-options/reference/#supply-environment-variables), using the [`flags` action option](https://github.com/grafana/k6-action#flags):

```yaml
steps:
  - name: Run k6 local test
    uses: grafana/k6-action@v0.3.1
    with:
      filename: my-script-file.js
      flags: --env MY_VAR=42
```

Or can be scoped to the action step:

```yaml
steps:
  - name: Run k6 local test
    uses: grafana/k6-action@v0.3.1
    with:
      filename: my-script-file.js
    env:
      MY_VAR: 42
```

## Side-by-side with the System under Test

You might want to host the system under test (SUT) within the workflow for testing. If you have dockerized your application or SUT, you can use [service containers](https://docs.github.com/en/actions/using-containerized-services/about-service-containers) to make it available for testing within the same job. 

The following example runs the application on port 3333. It passes the URL of the SUT as an environment variable to the k6 test and then runs the test.


```yaml
name: Testing QuickPizza
on: push

jobs:
  runner-job:
    runs-on: ubuntu-latest

    services:
      quickpizza:
        image: ghcr.io/grafana/quickpizza-local:0.4.0
        ports:
          - 3333:3333
          
    steps:
      - name: Checkout
        uses: actions/checkout@v4
  
      - name: Run local k6 test
        uses: grafana/k6-action@v0.3.1
        with:
          filename: script.js
        env:
          BASE_URL: "http://quickpizza:3333"
```

For non-Dockerized apps, you can download the k6 binary and run the k6 test from the same step as the app starts:

```yaml
name: Main Workflow
on: [push]
jobs:
  build:
    name: Run k6 test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Install k6
        run: |
          curl https://github.com/grafana/k6/releases/download/v0.47.0/k6-v0.47.0-linux-amd64.tar.gz -L | tar xvz --strip-components 1
      - name: Install packages
        run: |
          npm install
      - name: Start server and run tests
        run: |
          npm start & npx wait-on http://localhost:3000
          ./k6 run test.js
```

Thanks to [Amy Hoad](https://www.linkedin.com/in/amy-hoad/) for contributing on the solution for this.
