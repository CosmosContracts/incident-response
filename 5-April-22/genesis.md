## Genesis

It's time for the phoenix genesis.

Download it via the links below, and _ensure the hash matches_.

### Download

Get from `EZ Staking`:

- https://snapshots.ezstaking.io/juno-phoenix-genesis.tar.gz
- https://static.ezstaking.io/juno-phoenix-genesis.tar.gz
- https://static-2.ezstaking.io/juno-phoenix-genesis.tar.gz
- https://static-3.ezstaking.io/juno-phoenix-genesis.tar.gz
- https://ezstaking.io/juno-phoenix-genesis.tar.gz

```sh
wget https://snapshots.ezstaking.io/juno-phoenix-genesis.tar.gz
tar -xvf juno-phoenix-genesis.tar.gz -C $HOME/.juno/config
# check chain is juno-1, genesis time is correct & initial block is 2578099
# note if using zsh that you may need to break this up, and run steps individually
# i.e. cat $HOME/juno/config/genesis.json | jq '.chain_id'
cat $HOME/.juno/config/genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id + " - Initial Height: " + .initial_height'
# check hash - returns 36753f4f726aec8816dc38fa2453e4e70f8f4fccf0f0458e71ee37f362d758f1 
shasum -a 256 $HOME/.juno/config/genesis.json
```

Spend `the-frey`'s money by using S3:

```sh
wget https://juno-phoenix.s3.eu-west-1.amazonaws.com/juno-phoenix-genesis.tar.gz
tar -xvf juno-phoenix-genesis.tar.gz -C $HOME/.juno/config

# check chain is juno-1, genesis time is correct & initial block is 2578099
# note if using zsh that you may need to break this up, and run steps individually
# i.e. cat $HOME/juno/config/genesis.json | jq '.chain_id'
cat $HOME/.juno/config/genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id + " - Initial Height: " + .initial_height'

# check hash - returns 36753f4f726aec8816dc38fa2453e4e70f8f4fccf0f0458e71ee37f362d758f1 
shasum -a 256 $HOME/.juno/config/genesis.json
```

## Verification

If you want to make sure that the genesis has not been corrupted (which is the role of any good validator here is the procedure to follow)

cosmovisor export --height=2578097 2> juno-96.json
cat juno-96.json | jq -r '.chain_id = "juno-1" | .genesis_time = "2022-04-07T21:00:00Z" | .initial_height = "2578099"' > genesis.json

Then you just have to make a diff between genesis.json and your original genesis.json file

The only one difference expected that will exist is the modification of the last proposal and the consistency of the data for the devil contract 

## Check sorted shasum

```sh
jq -S -c -M '' $HOME/.juno/config/genesis.json | sha256sum
36753f4f726aec8816dc38fa2453e4e70f8f4fccf0f0458e71ee37f362d758f1  -
```
