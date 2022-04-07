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

Get from `Null`:

```sh
wget https://genesis.kingnodes.com/juno-phoenix-genesis.tar.gz
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
a12e2c6749863b05e5ad5baa7ae307fd352cae2186d9e0c4bfdbf9e39522bb0d  -
```
