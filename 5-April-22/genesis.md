## Genesis

### How-to

cosmovisor export --height=2578096 2> juno-96.json
jq '.genesis_time = "2021-10-01T15:00:00Z"' juno-96.json > juno-1-96.json
jq '.chain_id = "juno-1"' juno-1-96.json > juno-2-96.json
cat juno-2-96.json | jq '.genesis_time'; cat juno-2-96.json | jq '.chain_id'; jq -S -c -M '' juno-2-96.json | shasum -a 256


### Genesis Link

- https://ezstaking.io/juno-96.json
