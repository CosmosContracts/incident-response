## Genesis

It's time for the phoenix genesis.

Download it via the links below, and _ensure the hash matches_.

### Download

Download juno-phoenix-genesis.tar.gz (105.02 MiB) created by `the-frey`:

```sh
# either via IPFS
ipfs get bafybeicg7e6ird3trbjklxyocjhiao4w65crje5bdp5gq6ypwtknrvetkq --output juno-phoenix-genesis.tar.gz
# or spend `the-frey`'s money by using S3:
wget https://juno-phoenix-97.s3.eu-west-1.amazonaws.com/juno-phoenix-genesis.tar.gz

# check hash of downloaded file
sha256sum juno-phoenix-genesis.tar.gz | grep 1dfa7d3e4a25dedd66da41bf9fdd8481adfeae6304e230ab620c0afcf0a1c004

tar -xvf juno-phoenix-genesis.tar.gz -C $HOME/.juno/config

# check chain is juno-1, genesis time is correct & initial block is 2578099
# note if using zsh that you may need to break this up, and run steps individually
# i.e. cat $HOME/juno/config/genesis.json | jq '.chain_id'
cat $HOME/.juno/config/genesis.json | jq '"Genesis Time: " + .genesis_time + " — Chain ID: " + .chain_id + " - Initial Height: " + .initial_height'
```

## Verification

If you want to make sure that the genesis has not been corrupted (which is the role of any good validator here is the procedure to follow)

```sh
cosmovisor export --height=2578097 2> juno-97.json
cat juno-97.json | jq -r '.chain_id = "juno-1" | .genesis_time = "2022-04-07T21:00:00Z" | .initial_height = "2578099"' > genesis.json
```

Then you just have to make a diff between genesis.json and your original genesis.json file

The only one difference expected that will exist is the modification of the last proposal and the consistency of the data for the devil contract 

## Check sorted shasum

```sh
jq -S -c -M '' $HOME/.juno/config/genesis.json | sha256sum
1839fcf10ade35b81aad83bc303472bd0e9832efb0ab2382b382e3cc07b265e0  -
```
