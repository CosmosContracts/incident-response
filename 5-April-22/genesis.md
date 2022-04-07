## Genesis

It's time for the phoenix genesis.

Download it via the links below, and _ensure the hash matches_.

### Download

Get from `EZ Staking`:

- http://snapshots.io/juno-phoenix-genesis.tar.gz.1
- http://static.ezstaking.io/juno-phoenix-genesis.tar.gz.1
- http://static-2.ezstaking.io/juno-phoenix-genesis.tar.gz.1
- http://static-3.ezstaking.io/juno-phoenix-genesis.tar.gz.1
- http://ezstaking.io/juno-phoenix-genesis.tar.gz.1

```sh
wget http://snapshots.io/juno-phoenix-genesis.tar.gz.1
tar -xvf juno-phoenix-genesis.tar.gz -C $HOME/.juno/config
# check chain is juno-1, genesis time is correct & initial block is 2578099
# note if using zsh that you may need to break this up, and run steps individually
# i.e. cat $HOME/juno/config/genesis.json | jq '.chain_id'
cat $HOME/.juno/config/genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id + " - Initial Height: " + .initial_height'
# check hash - returns de3db1f58f612b0706eef5bee8f83fa46b9dcd1159efe582c33f3d1907434f7a
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

# check hash - returns de3db1f58f612b0706eef5bee8f83fa46b9dcd1159efe582c33f3d1907434f7a
shasum -a 256 $HOME/.juno/config/genesis.json
```

## Check sorted shasum

```sh
jq -S -c -M '' $HOME/.juno/config/genesis.json | sha256sum
36753f4f726aec8816dc38fa2453e4e70f8f4fccf0f0458e71ee37f362d758f1  -
```
