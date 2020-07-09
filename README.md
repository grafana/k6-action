<div align="center">
  
  <img
    src="https://raw.githubusercontent.com/k6io/action/master/k6.gif" 
    width="600"
    style="pointer-events: none;" />

  </br>
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
        uses: actions/checkout@v2
      - name: Run k6 local test
        uses: k6io/action@v0.1
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
        uses: actions/checkout@v2
      - name: Run k6 cloud test
        uses: k6io/action@v0.1
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
    uses: k6io/action@v0.1
    with:
      filename: my-script-file.js
```

Sets the filename of the test script to execute. This property is relative to the workspace directory. If omitted, it defaults to `test.js`.

### Cloud

```yaml
steps:
  - name: Run k6 cloud test
    uses: k6io/action@v0.1
    with:
      cloud: true
      token: ${{ secrets.K6_CLOUD_API_TOKEN }}
```

Enables execution in the k6 cloud. Additional details on the k6 cloud offering are available at https://k6.io/docs/cloud/.

### Flags

```yaml
steps:
  - name: Run k6 local test
    uses: k6io/action@v0.1
    with:
      flags: --vus 50 --duration 10s
```

Any additional arguments or flags to pass to the k6 cli. The full list of possible options is available at https://k6.io/docs/using-k6/options.

For additional information, and help getting started, see https://k6.io

## Side-by-side with the System under Test.

Unfortunately, running the local system under test and k6 at the same time is currently not supported by the marketplace action. Howeer, this is easily accomplished by downloading the k6 binary and running it from the same step as the server start:

```yaml
name: Main Workflow
on: [push]
jobs:
  build:
    name: Run k6 test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Install k6
        run: |
          curl https://github.com/loadimpact/k6/releases/download/v0.26.2/k6-v0.26.2-linux64.tar.gz -L | tar xvz --strip-components 1
      - name: Install packages
        run: |
          npm install
      - name: Start server and run tests
        run: |
          npm start & npx wait-on http://localhost:3000
          ./k6 run test.js
```

Thanks to [Amy Hoad](https://www.linkedin.com/in/amy-hoad/) for contributing on the solution for this.
