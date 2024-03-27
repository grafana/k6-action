#!/bin/sh

# Set environment variables
export K6_CLOUD_TOKEN=$INPUT_TOKEN
export K6_COMMAND=$([[ $INPUT_CLOUD == "true" ]] && echo 'cloud' || echo 'run')

# Execute k6 command
k6 $K6_COMMAND $INPUT_FILENAME $INPUT_FLAGS
