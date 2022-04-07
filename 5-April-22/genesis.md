## Genesis

It's time for the phoenix genesis.

Download it via the links below, and _ensure the hash matches_.

### Download
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
1839fcf10ade35b81aad83bc303472bd0e9832efb0ab2382b382e3cc07b265e0  -
```
