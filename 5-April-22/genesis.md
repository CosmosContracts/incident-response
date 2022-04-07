## Genesis

### How-to

```bash
cosmovisor export --height=2578096 2> juno-96.json
cat juno-96.json | jq -r '.chain_id = "juno-1" | .genesis_time = "2022-04-07T21:00:00Z"' > genesis.json
cat genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id'; jq -S -c -M '' genesis.json | shasum -a 256
```

### Genesis Link

- https://ezstaking.io/genesis.json

### Expected Genesis Hash

`f142446345090216c6d0c80faf6426cda917920568db0450d5a7bfc1c7ba6618`
