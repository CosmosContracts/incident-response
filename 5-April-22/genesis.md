## Genesis

It's time for the phoenix genesis.

Download it via the links below if you're uncertain, and _ensure the hash matches_.

### Generate yourself

```bash
cosmovisor export --height=2578096 2> juno-96.json
cat juno-96.json | jq -r '.chain_id = "juno-1" | .genesis_time = "2022-04-07T21:00:00Z" | .initial_height = "2578099"' > genesis.json
cat genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id + " - Initial Height: " + .initial_height'; jq -S -c -M '' genesis.json | shasum -a 256
```

### Download

Get from `Null`:



Spend `the-frey`'s money by using S3:

```sh
wget https://juno-phoenix.s3.eu-west-1.amazonaws.com/juno-phoenix-genesis.tar.gz
tar -xvf juno-phoenix-genesis.tar.gz -C $HOME/.juno/config

# check initial block is 2578099
cat $HOME/.juno/config/genesis.json | jq '.initial_height'

# check hash
shasum -a 256 $HOME/.juno/config/genesis.json
```

### Expected Genesis Hash

`a957ad217d2f83b4aa8d73d49d24470f3c9d2c0f4eebd21d18ee912911671b99`
