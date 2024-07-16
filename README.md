> ⚠️ This action has been archived and is no longer maintained. 
> 
> Please use the [Setup K6 Action](https://github.com/grafana/setup-k6-action) and [Run K6 Action](https://github.com/grafana/run-k6-action) instead. To learn about using the new GitHub actions, check out the [tutorial on using Grafana k6 and GitHub Actions](https://grafana.com/blog/2024/07/15/performance-testing-with-grafana-k6-and-github-actions/).  

# k6-action

### See also
- [Performance testing with Grafana k6 and GitHub Actions](https://grafana.com/blog/2024/07/15/performance-testing-with-grafana-k6-and-github-actions/)

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

### Inputs

#### Filename

```yaml
steps:
  - name: Run k6 local test
    uses: grafana/k6-action@v0.3.1
    with:
      filename: my-script-file.js
```

Sets the filename of the test script to execute. This property is relative to the workspace directory. If omitted, it defaults to `test.js`.

#### Cloud

```yaml
environment: test

steps:
  - name: Run k6 cloud test
    uses: grafana/k6-action@v0.3.1
    with:
      cloud: true
      token: ${{ secrets.K6_CLOUD_API_TOKEN }}
```

Enables execution in Grafana Cloud k6. Additional details on the k6 cloud offering are available at [https://grafana.com/docs/grafana-cloud/k6/](https://grafana.com/docs/grafana-cloud/k6/).

You can use a Grafana Cloud k6 personal API token, or a Grafana Stack API token. For more details, refer to [Authenticate on the CLI](https://grafana.com/docs/grafana-cloud/k6/author-run/tokens-and-cli-authentication/#authenticate-on-the-cli).

#### Flags

```yaml
steps:
  - name: Run k6 local test
    uses: grafana/k6-action@v0.3.1
    with:
      flags: --vus 50 --duration 10s
```

Any additional arguments or flags to pass to the k6 CLI. The full list of possible options is available at https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/.

For additional information, and help getting started, see https://grafana.com/docs/k6/latest/get-started/running-k6/.

#### Environment Variables

Environment variables can be added the same way as you do it [locally](https://grafana.com/docs/k6/latest/using-k6/k6-options/reference/#supply-environment-variables), using the [`flags` action option](https://github.com/grafana/k6-action#flags):

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

