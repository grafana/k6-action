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

```yaml
name: Main Workflow
on: [push]
jobs:
  build:
    name: Run load test using the action
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v2
      - name: Run local load test
        uses: k6io/action@v0.1
        with:
          cloud: true
          token: ${{ secrets.K6_TOKEN }}
          flags: --vus 1 --duration 10s'
```

## Inputs

### Filename

```yaml
steps:
  - name: Run local load test
    uses: k6io/action@v0.1
    with:
      filename: my-script-file.js
```

Sets the filename of the test script to execute. This property is relative to the workspace directory.

### Cloud

```yaml
steps:
  - name: Run local load test
    uses: k6io/action@v0.1
    with:
      cloud: true
      token: ${{ secrets.K6_TOKEN }}
```

Enables execution in the k6 cloud. Additional details on the k6 cloud offering are available at https://k6.cloud/.

### Flags

```yaml
steps:
      - name: Run local load test
        uses: k6io/action@v0.1
        with:
          flags: --vus 1 --duration 10s
```

Any additional arguments or flags to pass to the k6 cli. The full list of possible options is available at https://k6.io/docs/using-k6/options.

For additional information, and help getting started, see https://k6.io
